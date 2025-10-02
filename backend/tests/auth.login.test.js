const request = require('supertest');
require('dotenv').config();
require('./setup');
const app = require('../app'); // Express app

describe('Auth: Login', () => {
  const TEST_PASSWORD = 'TestPass123'; // nosonar - Test password for automated testing
  let uniqueUser;

  beforeAll(async () => {
    uniqueUser = 'loginuser' + Date.now();
    // Register the user first
    await request(app)
      .post('/auth/register')
      .send({ username: uniqueUser, password: TEST_PASSWORD });
  });

  it('should login successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: uniqueUser, password: TEST_PASSWORD });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with invalid credentials (wrong password)', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: uniqueUser, password: 'wrongpass' }); // nosonar - Test password for negative testing
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('should fail login with non-existent user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'nonexistent', password: TEST_PASSWORD }); // nosonar - Test password for negative testing
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('should fail login with missing username', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ password: TEST_PASSWORD });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Username and password required');
  });

  it('should fail login with missing password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: uniqueUser });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Username and password required');
  });

  // Note: Testing rate limiting is tricky in unit tests as it depends on timing and IP.
  // For now, skipping rate limiting test as it requires integration testing.
});
