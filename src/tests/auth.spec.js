const request = require('supertest');
const { connectToDatabase } = require('../config/mongoose');
const User = require('../models/user.models');

describe('Auth: Signup', () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it('should signup a user', async () => {
    const response = await request(app)
      .post('/api/register')
      .set('content-type', 'application/json')
      .send({
        username: 'tobi',
        password: 'Password123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@mail.com',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('userInfo');
    expect(response.body.userInfo).toHaveProperty('username', 'johnny');
    expect(response.body.userInfo).toHaveProperty('first_name', 'John');
    expect(response.body.userInfo).toHaveProperty('last_name', 'Doe');
    expect(response.body.userInfo).toHaveProperty('email', 'johndoe@mail.com');
  });

  it('should login a user', async () => {
    // create user in out db
    const user = await User.create({
      username: 'johnny',
      password: 'password',
    });

    // login user
    const response = await request(app)
      .post('/api/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'johnny',
        password: 'password',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
