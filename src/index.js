const express = require('express');
require('dotenv').config();
const { json, urlencoded } = express;

const { connectToDatabase } = require('./config/mongoose');
const app = express();
const PORT = process.env.PORT;
const passport = require('passport');
require('./config/auth')(passport);

app.use(express.json());

// app.use(urlencoded());
app.use(passport.initialize());
app.use('/api', require('./routes/routes'));
app.get('/', (req, res) => {
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
