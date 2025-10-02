// server.js - Production server entry point
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';

// Connect to MongoDB first, then start the server
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
      console.log(`📝 API endpoints available at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
