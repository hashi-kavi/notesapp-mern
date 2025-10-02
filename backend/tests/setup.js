require('dotenv').config({ path: './.env.test' });
const mongoose = require('mongoose');
const app = require('../app');

// Use a DIFFERENT database for tests to avoid conflicts
const TEST_DB_URI = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/notesapp-test';

beforeAll(async () => {
  // Close any existing connection first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // Connect to test database with increased timeout
  await mongoose.connect(TEST_DB_URI, {
    serverSelectionTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 10000,
  });
  console.log('✅ Connected to TEST database:', TEST_DB_URI);
}, 15000); // Increase Jest timeout for this hook

afterAll(async () => {
  // Clean up intervals from app
  if (app.cleanupIntervals) {
    app.cleanupIntervals();
  }
  
  // Clean up and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  console.log('✅ Test database closed');
});

afterEach(async () => {
  // Clear all collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});