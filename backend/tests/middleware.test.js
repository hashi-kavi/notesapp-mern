// Jest test for middleware
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('Middleware Tests', () => {
  let token;
  let uniqueUser;

  beforeEach(async () => {
    uniqueUser = 'middlewareuser' + Date.now();
    // Register and login to get a valid token for each test
    await request(app)
      .post('/auth/register')
      .send({ username: uniqueUser, password: 'Middleware1' }); // nosonar - Test password for setup
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ username: uniqueUser, password: 'Middleware1' }); // nosonar - Test password for setup
    token = loginRes.body.token;
  });

  describe('authMiddleware', () => {
    it('should allow access with valid token', async () => {
      const res = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should deny access without token', async () => {
      const res = await request(app)
        .get('/api/notes');
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Missing token');
    });

    it('should deny access with invalid token', async () => {
      const res = await request(app)
        .get('/api/notes')
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.statusCode).toBe(403);
      expect(res.body.error).toMatch(/Invalid token/);
    });

    it('should deny access with malformed authorization header', async () => {
      const res = await request(app)
        .get('/api/notes')
        .set('Authorization', 'InvalidFormat');
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Missing token');
    });
  });

  // Note: Testing customLoginLimiter (rate limiting) is complex in unit tests
  // as it relies on IP tracking and timing. It would be better suited for
  // integration tests. For now, we can test that login works normally.
  describe('customLoginLimiter', () => {
    it('should allow normal login attempts', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ username: uniqueUser, password: 'Middleware1' }); // nosonar - Test password for rate limiting test
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});
