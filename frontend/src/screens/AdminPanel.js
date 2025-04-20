import React, { useEffect, useState } from 'react';

function AdminPanel({ token, onLogout }) {
  const [analytics, setAnalytics] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch('https://data-blocker.onrender.com/api/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAnalytics(data.analytics || []))
      .catch(() => setError('Could not fetch analytics'));
    fetch('https://data-blocker.onrender.com/api/admin/quiz', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setQuiz(data.quiz || []))
      .catch(() => setError('Could not fetch quiz results'));
  }, [token]);

  const handleExport = async () => {
    setDownloading(true);
    const res = await fetch('https://data-blocker.onrender.com/api/admin/export', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics.xlsx';
    a.click();
    setDownloading(false);
  };

  return (
    <div className="admin-panel" style={{ padding: 32 }}>
      <h2>Admin Panel</h2>
      <button onClick={onLogout} style={{ float: 'right' }}>Logout</button>
      <h3>Analytics</h3>
      <button onClick={handleExport} disabled={downloading}>
        {downloading ? 'Exporting...' : 'Export to Excel'}
      </button>
      <table border="1" cellPadding="4" style={{ marginTop: 16, background: '#fff' }}>
        <thead>
          <tr>
            <th>ID</th><th>User ID</th><th>Metric</th><th>Value</th><th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.user_id}</td><td>{a.metric}</td><td>{a.value}</td><td>{a.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ marginTop: 32 }}>Quiz Results</h3>
      <table border="1" cellPadding="4" style={{ background: '#fff' }}>
        <thead>
          <tr>
            <th>ID</th><th>User ID</th><th>Question</th><th>Correct</th><th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {quiz.map(q => (
            <tr key={q.id}>
              <td>{q.id}</td><td>{q.user_id}</td><td>{q.question}</td><td>{q.correct ? 'Yes' : 'No'}</td><td>{q.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AdminPanel;
