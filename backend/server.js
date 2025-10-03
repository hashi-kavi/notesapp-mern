// server.js - Production server entry point
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';

// Use top-level await for cleaner code
async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
      console.log(`📝 API endpoints available at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();
