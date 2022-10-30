const express = require('express');
require('dotenv').config();
const { connectToDatabase } = require('./config/mongoose');
const app = express();
const PORT = process.env.PORT;
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Here we are at Alt School!' });
});

connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server is now live at port ${PORT}`);
});
