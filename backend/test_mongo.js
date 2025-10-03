const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';

// Use top-level await for cleaner code
async function testConnection() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
    await mongoose.connection.close();
    console.log('✅ Connection closed');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

testConnection();