import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// For local development
const backendUrl = 'http://localhost:5000';
// For production
// const backendUrl = 'https://medini-edutech-9qbb.onrender.com';
const socket = io(backendUrl, {
  path: '/socket.io/',
  transports: ['websocket', 'polling'], // Try both WebSocket and polling
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  timeout: 20000,
  secure: true,
  rejectUnauthorized: false, // Only for development with self-signed certificates
  query: {
    clientType: 'dashboard',
    version: '1.0.0',
    _t: Date.now() // Prevent caching
  },
  // Additional WebSocket options
  upgrade: true,
  forceNew: true,
  autoConnect: true,
  transports: ['websocket', 'polling'],
  extraHeaders: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  }
});

// Log all socket events
const events = ['connect', 'connect_error', 'connect_timeout', 'reconnect', 'reconnecting', 'reconnect_error', 'reconnect_failed', 'disconnect', 'error'];
events.forEach(event => {
  socket.on(event, (data) => {
    console.log(`Socket ${event}:`, data || 'No data');
  });
});

const csvBtnStyle = {background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600,cursor:'pointer',fontSize:15,boxShadow:'0 1px 4px #0001'};

function downloadCSV(data, filename) {
  if (!data || !data.length) return;
  const fields = ['fullName','email','phone','program','course','qualification','college','graduationYear','createdAt','message'];
  const header = fields.join(',');
  const rows = data.map(s => fields.map(f => `"${(s[f]||'').toString().replace(/"/g,'""')}"`).join(','));
  const csv = [header, ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

const StudentDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ IT: 0, Civil: 0, Mechanical: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProgram, setModalProgram] = useState(null);

  // Configure axios defaults with retry logic
  const api = axios.create({
    baseURL: backendUrl,
    timeout: 15000, // Increased timeout
    withCredentials: false, // Keep this false to avoid CORS preflight issues
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Requested-With': 'XMLHttpRequest'
    },
    // Add retry logic
    retry: 3,
    retryDelay: (retryCount) => {
      console.log(`Retry attempt: ${retryCount}`);
      return retryCount * 1000; // time interval between retries
    },
    // Ensure axios doesn't try to handle the response
    transformResponse: [
      function (data) {
        // Do whatever you want to transform the data
        console.log('Response data:', data);
        return data;
      }
    ]
  });
  
  // Add a request interceptor to add headers
  api.interceptors.request.use(
    (config) => {
      console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Add request interceptor to include auth token if available
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle errors globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  // Function to make API call with retry logic
  const fetchWithRetry = async (url, options = {}, retries = 3, backoff = 1000) => {
    try {
      const response = await api({
        url,
        method: 'GET',
        ...options,
        params: {
          ...options.params,
          _t: Date.now() // Always add timestamp to prevent caching
        }
      });
      return response;
    } catch (error) {
      if (retries === 0) {
        console.error(`Max retries reached for ${url}:`, error.message);
        throw error;
      }
      console.warn(`Retrying ${url} (${retries} attempts left)...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
  };

  const fetchInternships = useCallback(async () => {
    console.log('Fetching internships...');
    try {
      // Add a timestamp to prevent caching
      const timestamp = Date.now();
      
      console.log('Making parallel API requests...');
      
      // Fetch both endpoints in parallel with retry logic
      const [internshipsRes, statsRes] = await Promise.allSettled([
        fetchWithRetry('/api/internships', {
          params: { t: timestamp },
          timeout: 15000
        }).catch(error => {
          console.error('Failed to fetch internships after retries:', error.message);
          return { data: { data: [] } }; // Fallback empty data
        }),
        
        fetchWithRetry('/api/internships/stats', {
          params: { t: timestamp },
          timeout: 15000
        }).catch(error => {
          console.error('Failed to fetch stats after retries:', error.message);
          return { data: { success: false, data: [] } }; // Fallback empty stats
        })
      ]);
      
      // Extract values from settled promises
      const internshipsData = internshipsRes.status === 'fulfilled' ? 
        internshipsRes.value.data : { data: [] };
      const statsData = statsRes.status === 'fulfilled' ? 
        statsRes.value.data : { success: false, data: [] };
      
      console.log('API Responses:', {
        internships: {
          status: internshipsRes.status,
          data: internshipsData
        },
        stats: {
          status: statsRes.status,
          data: statsData
        }
      });
      
      // Process internships
      const internships = Array.isArray(internshipsData?.data) 
        ? internshipsData.data 
        : [];
      setStudents(internships);
      
      // Process stats - try server stats first, fallback to client-side calculation
      if (statsData?.success && Array.isArray(statsData.data)) {
        // Convert server stats to our format
        const serverStats = { IT: 0, Civil: 0, Mechanical: 0 };
        statsData.data.forEach(stat => {
          if (stat._id && serverStats.hasOwnProperty(stat._id)) {
            serverStats[stat._id] = stat.count;
          }
        });
        setStats(serverStats);
      } else {
        // Fallback: Calculate stats from internships data
        console.warn('Using client-side stats calculation');
        const newStats = { IT: 0, Civil: 0, Mechanical: 0 };
        internships.forEach(internship => {
          if (internship.program && newStats.hasOwnProperty(internship.program)) {
            newStats[internship.program]++;
          }
        });
        setStats(newStats);
      }
      
    } catch (error) {
      console.error('Error in fetchInternships:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
      });
      
      // Set empty state on error to prevent UI from breaking
      setStudents([]);
      setStats({ IT: 0, Civil: 0, Mechanical: 0 });
    }
  }, [backendUrl]);

  useEffect(() => {
    console.log('Setting up WebSocket connection...');
    
    const handleConnect = () => {
      console.log('Connected to WebSocket server');
      fetchInternships(); // Fetch latest data on connect
    };
    
    const handleDisconnect = (reason) => {
      console.warn('WebSocket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // The disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
    };
    
    const handleNewInternship = (newInternship) => {
      console.log('New internship registered via WebSocket:', newInternship);
      
      // Update students list
      setStudents(prev => {
        // Prevent duplicates
        const exists = prev.some(s => s._id === newInternship._id);
        return exists ? prev : [newInternship, ...prev];
      });
      
      // Update stats
      if (newInternship.program) {
        setStats(prev => ({
          ...prev,
          [newInternship.program]: (prev[newInternship.program] || 0) + 1
        }));
      }
    };
    
    const handleError = (error) => {
      console.error('WebSocket error:', error);
    };
    
    // Set up event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('internshipRegistered', handleNewInternship);
    socket.on('error', handleError);
    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      // Attempt to reconnect after a delay
      setTimeout(() => socket.connect(), 5000);
    });
    
    // Initial data fetch
    fetchInternships();
    
    // Set up interval to refresh data every 30 seconds as fallback
    const refreshInterval = setInterval(fetchInternships, 30000);
    
    // Clean up WebSocket connection and interval
    return () => {
      console.log('Cleaning up WebSocket connection...');
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('internshipRegistered', handleNewInternship);
      socket.off('error', handleError);
      socket.off('connect_error');
      clearInterval(refreshInterval);
    };
  }, [fetchInternships]);

  // Calculate total and percentages for progress bars
  const total = stats.IT + stats.Civil + stats.Mechanical;
  const percent = key => total ? Math.round((stats[key] / total) * 100) : 0;

  // Card config
  const cards = [
    {
      key: 'IT',
      color: '#2563eb',
      label: 'IT',
      desc: 'Technology & Coding',
      icon: '💻',
    },
    {
      key: 'Civil',
      color: '#38bdf8',
      label: 'Civil',
      desc: 'Infrastructure & Design',
      icon: '🏗️',
    },
    {
      key: 'Mechanical',
      color: '#f59e42',
      label: 'Mechanical',
      desc: 'Machines & Manufacturing',
      icon: '⚙️',
    },
  ];

  // Modal logic
  // Ref for modal
  const modalRef = React.useRef(null);
  const openModal = program => {
    setModalProgram(program);
    setModalOpen(true);
    // Scroll to modal after open (next tick)
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const closeModal = () => setModalOpen(false);
  // Defensive: handle both 'program' and 'Program' fields, and ignore case
  const filteredStudents = students.filter(s => {
    const prog = (s.program || s.Program || '').toLowerCase();
    return prog === (modalProgram || '').toLowerCase();
  });

  return (
    <div style={{ maxWidth: 1100, margin: '2.5rem auto', background: '#f8fafc', borderRadius: 22, boxShadow: '0 8px 32px #0001', padding: 42 }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <h2 style={{ fontSize: '2.5rem', color: '#2563eb', fontWeight: 800, margin: 0, letterSpacing: 1 }}>Program Registration Dashboard</h2>
        <button onClick={() => { localStorage.removeItem('dashboard_token'); window.location.reload(); }} style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,cursor:'pointer',fontSize:17,boxShadow:'0 2px 8px #0002'}}>Logout</button>
      </div>

      {/* Program Cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 40 }}>
        {cards.map(card => (
          <div
            key={card.key}
            style={{ background: card.color, color: '#fff', borderRadius: 20, padding: '32px 36px', minWidth: 210, textAlign: 'center', boxShadow: `0 2px 16px ${card.color}33`, flex: 1, position: 'relative', cursor: 'pointer', outline: modalProgram === card.key ? '3px solid #fff' : '' }}
            onClick={() => openModal(card.key)}
            title={`View all ${card.label} students`}
          >
            <div style={{ position: 'absolute', top: 22, right: 30, fontSize: 32, opacity: 0.23 }}>{card.icon}</div>
            <div style={{ fontSize: 38, fontWeight: 800, marginBottom: 8 }}>{stats[card.key]}</div>
            <div style={{ fontWeight: 600, fontSize: 22 }}>{card.label}</div>
            <div style={{ fontSize: 15, opacity: 0.85, marginTop: 8 }}>{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Modal for student details */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeModal}>
          <div ref={modalRef} style={{ background: '#fff', borderRadius: 16, minWidth: 420, maxWidth: 420, width: '90vw', boxShadow: '0 8px 32px #0003', padding: 36, position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} style={{ position: 'absolute', top: 18, right: 20, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>&times;</button>
            <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#334155', textAlign: 'center' }}>{modalProgram} Students</h3>
            <button onClick={() => downloadCSV(filteredStudents, `${modalProgram ? modalProgram.toLowerCase() : 'students'}_students.csv`)} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600,cursor:'pointer',fontSize:15,marginBottom:18,boxShadow:'0 1px 4px #0001'}}>Download CSV</button>
            {filteredStudents.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', marginTop: 24, fontSize: 18 }}>
                <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f464.png" alt="No students" style={{ width: 54, marginBottom: 12, opacity: 0.7 }} />
                <div>No students registered for {modalProgram} yet.</div>
              </div>
            ) : (
              <div style={{ maxHeight: 370, overflowY: 'auto', marginBottom: 10 }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {filteredStudents.map(s => (
                    <li key={s._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ fontWeight: 600 }}>{s.fullName || s.name || s.Name || ''}</span>
                      <button
                        style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                        onClick={() => setSelectedStudent(s)}
                      >View</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedStudent(null)}>
          <div style={{ background: '#fff', borderRadius: 16, minWidth: 350, maxWidth: 420, width: '90vw', boxShadow: '0 8px 32px #0003', padding: 36, position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', top: 18, right: 20, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>&times;</button>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 18, color: '#334155', textAlign: 'center' }}>Student Details</h3>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>Name:</b> {selectedStudent.fullName || selectedStudent.name || selectedStudent.Name || ''}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>Email:</b> {selectedStudent.email || selectedStudent.Email || ''}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>Phone:</b> {selectedStudent.phone || selectedStudent.Phone || ''}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>Qualification:</b> {selectedStudent.qualification || selectedStudent.Qualification || ''}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>College:</b> {selectedStudent.college || selectedStudent.College || ''}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>Graduation Year:</b> {selectedStudent.graduationYear || selectedStudent.GraduationYear || ''}</div>
            <div style={{ fontSize: 16, marginBottom: 10 }}><b>Registered At:</b> {selectedStudent.createdAt ? new Date(selectedStudent.createdAt).toLocaleString() : (selectedStudent.CreatedAt ? new Date(selectedStudent.CreatedAt).toLocaleString() : '')}</div>
            {selectedStudent.message && <div style={{ fontSize: 16, marginBottom: 10 }}><b>Message:</b> {selectedStudent.message}</div>}
          </div>
        </div>
      )}



      {/* Progress Bars */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px #e0e7ef', marginBottom: 40 }}>
        <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 22, color: '#334155' }}>Program Distribution</h3>
        {cards.map(card => (
          <div key={card.key} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
              <span style={{ color: card.color }}>{card.label}</span>
              <span style={{ color: '#64748b' }}>{percent(card.key)}%</span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: 8, height: 18, overflow: 'hidden' }}>
              <div style={{ width: percent(card.key) + '%', background: card.color, height: '100%', borderRadius: 8, transition: 'width 0.5s' }}></div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default StudentDashboard;
