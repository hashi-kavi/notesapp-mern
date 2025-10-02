const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/notes',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const requests = 20;
let completed = 0;
const startTime = Date.now();

console.log('Starting load test with 20 concurrent requests...');
console.log('Testing endpoint: http://localhost:5000/api/notes');

for (let i = 0; i < requests; i++) {
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      completed++;
      if (completed === requests) {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        console.log('=== LOAD TEST COMPLETED ===');
        console.log('Total requests: ' + requests);
        console.log('Total time: ' + totalTime + 'ms');
        console.log('Requests per second: ' + (requests / (totalTime / 1000)).toFixed(2));
        console.log('Average response time: ' + (totalTime / requests).toFixed(2) + 'ms');
      }
    });
  });

  req.on('error', (err) => {
    console.log('Request error: ' + err.message);
    completed++;
  });

  req.write(JSON.stringify({
    title: 'Load Test Note ' + i,
    content: 'This is a test note created during load testing'
  }));
  req.end();
}
