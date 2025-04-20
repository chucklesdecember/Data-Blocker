import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://data-blocker.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, is_admin: isAdmin }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onLogin(data.token, data.is_admin);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdminClick = () => {
    setIsAdmin(true);
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      </div>
      <h1 className="app-title">Data Blocker</h1>
      
      <div className="auth-tabs">
        <button className="auth-tab active">Login</button>
        <button className="auth-tab" onClick={() => navigate('/register')}>Register</button>
      </div>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>

      <div className="divider">
        <span>or</span>
      </div>

      {!isAdmin && (
        <button onClick={handleAdminClick} className="admin-button">
          Admin Login
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;
