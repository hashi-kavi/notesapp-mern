const mongoose = require('mongoose');
let mongoServer;
let isConnected = false;

const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
const mongoUri = isCI
  ? 'mongodb://localhost:27017/testdb' // Use CI MongoDB service
  : 'mongodb://localhost:27017/notesapp-test'; // Use local MongoDB

beforeAll(async () => {
  if (!isConnected) {
    // Remove the duplicate conditional - both cases use the same connection options
    await mongoose.connect(mongoUri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    isConnected = true;
  }
}, 15000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer && typeof mongoServer.stop === 'function') {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  // Clear all collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});