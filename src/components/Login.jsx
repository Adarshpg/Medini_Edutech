import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (email === 'admin@medini.com' && password === 'admin123') {
        localStorage.setItem('dashboard_token', 'dummy_token');
        onLogin();
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 500);
  };


  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 36, borderRadius: 12, boxShadow: '0 8px 32px #0002', minWidth: 320 }}>
        <h2 style={{ marginBottom: 22, color: '#2563eb', textAlign: 'center' }}>Dashboard Login</h2>
        <div style={{ marginBottom: 18 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #d1d5db', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #d1d5db', marginTop: 4 }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 700, border: 'none', fontSize: 16, cursor: 'pointer' }}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;
