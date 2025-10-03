const express = require('express');
const app = express();
const PORT = 5000;

// Add error handling
process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('UNHANDLED REJECTION:', reason);
});

console.log('STARTING SERVER...');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log('✅ SERVER RUNNING on port ' + PORT);
  console.log('🚀 Test at: http://localhost:' + PORT);
});

console.log('Server setup complete - waiting for requests...');
