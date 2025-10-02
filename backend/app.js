// Minimal Express app for MERN assignment - SECURE VERSION
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Note = require('./models/Note');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = 'supersecretkey';
const PORT = process.env.PORT || 5000;

// ----- Custom Rate Limiting for Security -----
const loginAttempts = new Map();

const customLoginLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 2 * 60 * 1000;
  const maxAttempts = 10; // Increased for tests
  
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, []);
  }
  
  const attempts = loginAttempts.get(ip);
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return res.status(429).json({
      error: 'Too many login attempts from this IP. Please try again in 2 minutes.'
    });
  }
  
  recentAttempts.push(now);
  loginAttempts.set(ip, recentAttempts);
  next(); // ✅ MUST HAVE THIS!
};

// ----- Middleware for JWT auth -----
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  console.log('🛡️ AUTH DEBUG:');
  console.log('  Authorization Header:', authHeader);
  console.log('  Token:', token ? 'Present' : 'Missing');
  
  if (!token) {
    console.log('  ❌ No token provided');
    return res.status(401).json({ error: 'Missing token' });
  }
  
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log('  ✅ Token verified successfully');
    console.log('  User payload:', user);
    req.user = user;
    next();
  } catch (err) {
    console.log('  ❌ Token verification failed:', err.message);
    return res.status(403).json({ error: 'Invalid token: ' + err.message });
  }
}

// ----- Auth endpoints -----
app.post('/auth/register', async (req, res) => {
  let { username, password } = req.body;
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  if (!username || !password || !/^[a-zA-Z0-9]+$/.test(username) || !passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: 'Invalid username or password. Username must be alphanumeric. Password must be at least 8 characters with uppercase, lowercase, and numbers.' 
    });
  }

  username = username.trim();
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id.toString(), username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ userId: user._id, token });
  } catch (err) {
    console.error('Error in /auth/register:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ ONLY ONE LOGIN ROUTE
app.post('/auth/login', customLoginLimiter, async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  username = username.trim();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id.toString(), username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Error in /auth/login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ----- Notes endpoints -----
app.post('/notes', authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Note text required' });
  }

  try {
    const note = new Note({ text, user: req.user.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/notes', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/notes/:id', authMiddleware, async (req, res) => {
  const noteId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.user.toString() !== req.user.userId) {
      return res.status(404).json({ error: 'Note not found' });
    }
    await Note.findByIdAndDelete(noteId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Only start server and connect to MongoDB if this file is run directly
// Only start server and connect to MongoDB if this file is run directly
// Use a named async function instead
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API endpoints available at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
} else {
  console.log('📝 App imported for testing - MongoDB connection handled by test setup');
}
// Export cleanup function for tests
const cleanupIntervals = () => {
  loginAttempts.clear();
};

// Export app for testing
module.exports = app;
module.exports.cleanupIntervals = cleanupIntervals;