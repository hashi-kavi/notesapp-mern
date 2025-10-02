const request = require('supertest');
const app = require('../app');

describe('Notes API', () => {
  let token;
  let uniqueUser;

  beforeAll(async () => {
    uniqueUser = 'apiuser' + Math.floor(Math.random() * 1000000);
    // Register and login only once
    await request(app)
      .post('/auth/register')
      .send({ username: uniqueUser, password: 'Apipass1' }); // nosonar - Test password for setup
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ username: uniqueUser, password: 'Apipass1' }); // nosonar - Test password for setup
    token = loginRes.body.token;
  });

  it('should add a note', async () => {
    const res = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Test Note' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('text', 'Test Note');
    expect(res.body).toHaveProperty('_id');
  });

  it('should get notes', async () => {
    // First create a note to retrieve
    await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Another Note' });
    const res = await request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should delete a note', async () => {
    // Create a note first, then delete it
    const createRes = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Note to Delete' });
    expect(createRes.statusCode).toBe(201);
    const noteId = createRes.body._id;

    const res = await request(app)
      .delete(`/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should fail to add note without text', async () => {
    const res = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Note text required');
  });

  it('should fail to add note without auth', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ text: 'Unauthorized Note' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Missing token');
  });

  it('should fail to get notes without auth', async () => {
    const res = await request(app)
      .get('/notes');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Missing token');
  });

  it('should fail to delete note without auth', async () => {
    const res = await request(app)
      .delete('/notes/someid');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Missing token');
  });

  it('should fail to delete note with invalid ID', async () => {
    const res = await request(app)
      .delete('/notes/invalidid')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid note ID');
  });

  it('should fail to delete non-existent note', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format but doesn't exist
    const res = await request(app)
      .delete(`/notes/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Note not found');
  });
});
