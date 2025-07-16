import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io(API_BASE_URL);

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

  useEffect(() => {
    // Fetch internship stats
    axios.get(`${API_BASE_URL}/api/internships`)
      .then(res => setStudents(res.data && Array.isArray(res.data.data) ? res.data.data : []))
      .catch(() => setStudents([]));

    // First, let's see what data we have for students
    axios.get(`${API_BASE_URL}/api/internships`)
      .then(res => {
        console.log('All students data:', res.data);
        const allStudents = Array.isArray(res.data?.data) ? res.data.data : [];
        // Count students per program manually
        const manualCounts = {
          IT: allStudents.filter(s => (s.program || '').toLowerCase() === 'it').length,
          Civil: allStudents.filter(s => (s.program || '').toLowerCase() === 'civil').length,
          Mechanical: allStudents.filter(s => (s.program || '').toLowerCase() === 'mechanical').length
        };
        console.log('Manually calculated counts:', manualCounts);
        setStats(manualCounts);
      })
      .catch(err => {
        console.error('Error fetching all students:', err);
        setStats({ IT: 0, Civil: 0, Mechanical: 0 });
      });

    // Keep the original stats API call but with better error handling
    axios.get(`${API_BASE_URL}/api/internships/stats`)
      .then(res => {
        console.log('Stats API Response:', res.data);
        if (!res.data) {
          console.warn('Empty response from stats API');
          return;
        }
        
        const statObj = { IT: 0, Civil: 0, Mechanical: 0 };
        const statsData = Array.isArray(res.data) ? res.data : [];
        
        console.log('Processing stats data:', statsData);
        
        statsData.forEach(item => {
          if (!item || !item._id) return;
          
          // Try different variations of the program name
          const program = (item._id || '').toString().toLowerCase().trim();
          console.log(`Processing program: ${program} with count: ${item.count}`);
          
          if (program === 'it' || program === 'information technology') {
            statObj.IT = parseInt(item.count) || 0;
          } else if (program === 'civil') {
            statObj.Civil = parseInt(item.count) || 0;
          } else if (program === 'mechanical') {
            statObj.Mechanical = parseInt(item.count) || 0;
          }
        });
        
        console.log('Final stats from API:', statObj);
        setStats(statObj);
      })
      .catch(err => {
        console.error('Error in stats API:', err);
        // Don't reset stats here as we might have manual counts
      });

    // Listen for real-time internship registrations
    socket.on('internshipRegistered', newStudent => {
      setStudents(prev => [newStudent, ...prev]);
      // Optionally, update stats live
      if (newStudent.program && ['IT', 'Civil', 'Mechanical'].includes(newStudent.program)) {
        setStats(prev => ({ ...prev, [newStudent.program]: (prev[newStudent.program] || 0) + 1 }));
      }
    });

    return () => socket.disconnect();
  }, []);

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
            <div style={{ fontSize: 38, fontWeight: 800, marginBottom: 8 }}>{stats[card.key] || 0}</div>
            <div style={{ fontWeight: 600, fontSize: 22 }}>{card.label}</div>
            <div style={{ fontSize: 15, opacity: 0.85, marginTop: 8 }}>{card.desc}</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 12, background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 12, display: 'inline-block' }}>
              {stats[card.key] || 0} {stats[card.key] === 1 ? 'Member' : 'Members'} Registered
            </div>
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
