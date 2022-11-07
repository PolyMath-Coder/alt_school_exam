const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
  },
});
userSchema.pre('save', async function(next) {
  let user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
