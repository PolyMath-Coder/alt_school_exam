const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

const connectToDatabase = () => {
  mongoose.connect(DB_URL);

  mongoose.connection.on('connected', async () => {
    console.log('Database now Connected...');
  });

  mongoose.connection.on('error', (err) => {
    console.log('An error occurred while connecting to MongoDB');
    console.log(err);
  });
};

module.exports = { connectToDatabase };
