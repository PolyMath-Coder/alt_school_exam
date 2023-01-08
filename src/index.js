const express = require('express');
require('dotenv').config();
const { json, urlencoded } = express;
const { requiresAuth } = require('express-openid-connect');
const auth0Middleware = require('./config/auth0');
const User = require('./models/user.models');
const cors = require('cors');

const { connectToDatabase } = require('./config/mongoose');
const app = express();
const PORT = process.env.PORT;
const passport = require('passport');
require('./config/auth')(passport);

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(auth0Middleware);

// app.use(urlencoded());
app.use(passport.initialize());
app.use('/api', require('./routes/routes'));
app.get('/callback', (req, res) => {});

app.get('/', requiresAuth(), async (req, res) => {
  const data = {};
  data.email = req.oidc.user.email;
  data.photo = req.oidc.user.picture;
  data.username = req.oidc.user.given_name;
  const result = await User.create(data);
  console.log(result);
  res
    .status(200)
    .json({ msg: 'Here we are at Alt School Second Semester Exams!' });
});

app.use((err, req, res, next) => {
  res
    .status(400)
    .json({ status: 'error', msg: 'An error happened somehow...' });
});

connectToDatabase();
module.exports = app.listen(PORT, () => {
  console.log(`Server is now live at port ${PORT}`);
});
