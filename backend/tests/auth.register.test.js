const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();
require('./setup');
const app = require('../app'); // Express app

describe('Auth: Register', () => {
  const TEST_PASSWORD = 'TestPass123'; // nosonar - Test password for automated testing

  beforeAll(async () => {
    // Clear User collection before tests to avoid duplicates
    await User.deleteMany({});
  }, 10000);

  it('should register a new user', async () => {
    const uniqueUser = 'testuser' + Date.now();
    const res = await request(app)
      .post('/auth/register')
      .send({ username: uniqueUser, password: TEST_PASSWORD });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('userId');
  });

  it('should fail registration with invalid username (non-alphanumeric)', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'test@user', password: TEST_PASSWORD });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid username or password/);
  });

  it('should fail registration with weak password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser' + Date.now(), password: process.env.TEST_WEAK_PASSWORD });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid username or password/);
  });

  it('should fail registration with missing username', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ password: TEST_PASSWORD });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid username or password/);
  });

  it('should fail registration with missing password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser' + Date.now() });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid username or password/);
  });

  it('should fail registration with duplicate username', async () => {
    const uniqueUser = 'dupuser' + Date.now();
    // First registration
    await request(app)
      .post('/auth/register')
      .send({ username: uniqueUser, password: TEST_PASSWORD });
    // Second registration with same username
    const res = await request(app)
      .post('/auth/register')
      .send({ username: uniqueUser, password: 'Testpass2' }); // nosonar - Test password for negative testing
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Username already exists');
  });
});
