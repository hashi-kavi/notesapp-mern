// server.js - Production server entry point
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';

// Use top-level await for cleaner code
try {
  await mongoose.connect(mongoUri);
  console.log('✅ MongoDB connected successfully');
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints available at http://localhost:${PORT}`);
  });

  // Handle server startup errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
    } else {
      console.error('❌ Server startup error:', error);
    }
    process.exit(1);
  });

  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      mongoose.connection.close();
      process.exit(0);
    });
  });

} catch (err) {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}