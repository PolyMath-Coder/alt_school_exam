const User = require('../models/user.models');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_STRING = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const userInfo = req.user;
  const body = { id: req.user._id, email: req.user.email };
  const token = jwt.sign({ user: body }, JWT_STRING, { expiresIn: '1h' });
  res.status(200).json({
    msg: 'Endeavour successful! You have just registered...',
    data: { userInfo, token },
  });
};

const loginUser = (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const err = new Error('This user does not exist!');
        return next(err);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { id: user._id, email: user.email };
        // const token = jwt.sign({ user: body }, JWT_STRING, { expiresIn: '1h' });
        return res.json({
          status: 'success',
          msg: 'Login Successful',
          data: user,
        });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

// const seedUsers = async () => {
//   try {
//     await User.insertMany([
//       { name: 'ayomide', password: 'lovely', user_type: 'user' },
//       { name: 'ayomikun', password: 'love', user_type: 'user' },
//       { name: 'ayobami', password: 'lovingly', user_type: 'admin' },
//       { name: 'ayokunumi', password: 'loveful', user_type: 'user' },
//       { name: 'ayodimeji', password: 'loving', user_type: 'user' },
//     ]);
//   } catch (err) {
//     throw new Error('Oops! An error occurred...');
//   }
// };

module.exports = { registerUser, loginUser };
