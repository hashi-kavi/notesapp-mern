const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');

// Use original app
const app = require('../../app');

let response;

Given('I am a registered user with username {string} and password {string}', async function (username, password) {      
  console.log('Registering user:', username);
  try {
    const res = await request(app)
      .post('/auth/register')  // Removed /api prefix
      .send({ 
        username, 
        password, 
        email: `${username}@test.com` 
      });
    console.log('Register response:', res.status, res.body);
  } catch (error) {
    console.log('Register error (continuing anyway):', error.message);
  }
});

When('I log in with username {string} and password {string}', async function (username, password) {
  console.log('Logging in user:', username);
  response = await request(app)
    .post('/auth/login')  // Removed /api prefix
    .send({ username, password });
  console.log('Login response:', response.status, response.body);
});

Then('I should receive a valid authentication token', function () {
  console.log('Checking for token...');
  if (!response.body.token) { 
    throw new Error('No token received. Response: ' + JSON.stringify(response.body));
  }
  console.log('Token received successfully');
});
