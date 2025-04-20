import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Terms from './screens/Terms';
import Quiz from './screens/Quiz';
import Padlock from './screens/Padlock';
import AdminPanel from './screens/AdminPanel';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('is_admin') === 'true');
  const navigate = useNavigate();

  const handleLogin = (token, is_admin) => {
    setToken(token);
    setIsAdmin(is_admin);
    localStorage.setItem('token', token);
    localStorage.setItem('is_admin', is_admin);
    if (is_admin) navigate('/admin');
    else navigate('/terms');
  };

  const handleLogout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />
      <Route path="/terms" element={<Terms token={token} onLogout={handleLogout} />} />
      <Route path="/quiz" element={<Quiz token={token} onLogout={handleLogout} />} />
      <Route path="/padlock" element={<Padlock token={token} onLogout={handleLogout} />} />
      <Route path="/admin" element={<AdminPanel token={token} onLogout={handleLogout} />} />
      <Route path="*" element={<Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;
