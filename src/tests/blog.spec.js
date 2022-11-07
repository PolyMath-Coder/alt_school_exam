const request = require('supertest');
const User = require('../models/user.models');
const Blog = require('../models/blog.model');
const moment = require('moment');
const { connectToDatabase } = require('../config/mongoose');

describe('Blog route', () => {
  let conn;
  let token;
  beforeAll(async () => {
    conn = await connect();

    await User.create({ username: 'johnny', password: 'password' });

    const loginResponse = await request(app)
      .post('/api/auth/signin')
      .set('content-type', 'application/json')
      .send({
        username: 'johnny',
        password: 'password',
      });

    token = loginResponse.body.token;
  });
  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });
  it('should create a blog', async () => {
    // create blog in our db
    await Blog.create({
      title: 'The fault in our stars',
      description: 'A top-rated prose series...',
      created_at: moment().toDate(),
      body: 'Once upon a time',
      author: [
        {
          email: 'janedoe@gmail.com',
          first_name: 'Jane',
          last_name: 'Doe',
          username: 'jannie',
        },
      ],
    });

    const response = await request(app)
      .get('/orders')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('newBlog');
    expect(response.body).toHaveProperty('status', true);
  });
});
