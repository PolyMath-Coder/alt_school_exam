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
      .post('/api/auth/login')
      .set('content-type', 'application/json')
      .send({
        username: 'johnny',
        password: 'password',
      });

    token = loginResponse.body.token;
  });
});
