const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');

// Use original app
const app = require('../../app');

let token, response;

Given('I am logged in as {string}', async function (username) {
  console.log('Setting up user:', username);
  
  // Register user first
  const registerRes = await request(app)
    .post('/auth/register')  // Removed /api prefix
    .send({ 
      username, 
      password: 'bddpass'
      // Note: Your register endpoint doesn't accept email
    });
  console.log('Register response:', registerRes.status, registerRes.body);
    
  // Login to get token
  const loginRes = await request(app)
    .post('/auth/login')  // Removed /api prefix
    .send({ username, password: 'bddpass' });
  console.log('Login response:', loginRes.status, loginRes.body);
  
  token = loginRes.body.token;
  console.log('Login successful, token received');
});

When('I add a note with text {string}', async function (noteText) {
  console.log('Adding note:', noteText);
  response = await request(app)
    .post('/notes')  // Removed /api prefix
    .set('Authorization', `Bearer ${token}`)
    .send({ 
      text: noteText  // Your endpoint uses 'text' not 'content'
    });
  console.log('Note added, response:', response.status, response.body);
});

Then('the note should be saved and visible in my notes list', async function () {
  console.log('Checking notes list...');
  const res = await request(app)
    .get('/notes')  // Removed /api prefix
    .set('Authorization', `Bearer ${token}`);
  
  console.log('Notes retrieved:', res.body.length, 'notes found');
  console.log('Looking for note with text:', response.body.text);
  
  if (!res.body.some(n => n.text === response.body.text)) { 
    throw new Error('Note not found in notes list. Notes: ' + JSON.stringify(res.body));        
  }
  console.log('Note verified in list');
});
