const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notesapp';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
