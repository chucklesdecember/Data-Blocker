// Entry point for backend server
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ExcelJS from 'exceljs';

const app = express();
const PORT = 4000;
const JWT_SECRET = 'supersecretkey';

app.use(cors({
  origin: 'https://data-blocker-git-main-cns-projects-f487bd3e.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(express.json());

// SQLite setup
const db = new sqlite3.Database('./data-blocker.db');

// Create tables if not exist
// users: id, username, password_hash, is_admin
// analytics: id, user_id, metric, value, timestamp
// quiz_results: id, user_id, question, correct, timestamp

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    is_admin INTEGER DEFAULT 0
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    metric TEXT,
    value TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    question TEXT,
    correct INTEGER,
    selected TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Registration endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const isAdmin = (username === 'cnovember' && password === '[(Equinox123!)]') ? 1 : 0;
  const hash = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, ?)', [username, hash, isAdmin], function(err) {
    if (err) return res.status(400).json({ error: 'Username taken' });
    const token = jwt.sign({ id: this.lastID, username, is_admin: isAdmin }, JWT_SECRET);
    res.json({ token, is_admin: !!isAdmin });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password); // Add this line


  // Special admin login hardcoded
  if (username === 'cnovember' && password === '[(Equinox123!)]') {
    const token = jwt.sign({ username, is_admin: true }, JWT_SECRET);
    return res.json({ token, is_admin: true });
  }
  // Plebian user lookup
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username, is_admin: !!user.is_admin }, JWT_SECRET);
    res.json({ token, is_admin: !!user.is_admin });
  });
});

// Middleware for protected routes
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Analytics logging
app.post('/api/analytics', auth, (req, res) => {
  const { metric, value } = req.body;
  db.run('INSERT INTO analytics (user_id, metric, value) VALUES (?, ?, ?)', [req.user.id, metric, value], (err) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true });
  });
});

// Quiz results
app.post('/api/quiz', auth, (req, res) => {
  const { results } = req.body; // [{question, correct}]
  const stmt = db.prepare('INSERT INTO quiz_results (user_id, question, correct, selected) VALUES (?, ?, ?, ?)');
  results.forEach(r => stmt.run(req.user.id, r.question, r.correct ? 1 : 0, r.selected));
  stmt.finalize();
  res.json({ success: true });
});

// Admin analytics fetch
app.get('/api/admin/analytics', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });
  db.all('SELECT * FROM analytics', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ analytics: rows });
  });
});

// Admin quiz results fetch
app.get('/api/admin/quiz', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });
  db.all('SELECT * FROM quiz_results', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ quiz: rows });
  });
});

// Export analytics and quiz results to Excel (two sheets in one file)
app.get('/api/admin/export', auth, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });

  db.all('SELECT * FROM analytics', [], async (err, analytics) => {
    if (err) return res.status(500).json({ error: 'DB error' });

    db.all('SELECT * FROM quiz_results', [], async (err2, quizResults) => {
      if (err2) return res.status(500).json({ error: 'DB error' });

      const workbook = new ExcelJS.Workbook();

      // Analytics sheet
      const analyticsSheet = workbook.addWorksheet('Analytics');
      analyticsSheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'User ID', key: 'user_id' },
        { header: 'Metric', key: 'metric' },
        { header: 'Value', key: 'value' },
        { header: 'Timestamp', key: 'timestamp' }
      ];
      analytics.forEach(row => analyticsSheet.addRow(row));

      // Quiz Results sheet
      const quizSheet = workbook.addWorksheet('Quiz Results');
      quizSheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'User ID', key: 'user_id' },
        { header: 'Question', key: 'question' },
        { header: 'Selected Answer', key: 'selected' },
        { header: 'Correct', key: 'correct' },
        { header: 'Timestamp', key: 'timestamp' }
      ];
      quizResults.forEach(row => {
        quizSheet.addRow({
          id: row.id,
          user_id: row.user_id,
          question: row.question,
          selected: row.selected,
          correct: row.correct ? 'Yes' : 'No',
          timestamp: row.timestamp
        });
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=analytics_and_quiz.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
