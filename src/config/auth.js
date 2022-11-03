const passport = require('passport');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/user.models');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const {ExtractJwt, Strategy} = require('passport-jwt')
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const JWT_STRING = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: JWT_STRING,
        // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('my_token'),
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
      },
      async (req, token, done) => {
        try {
          // console.log(token);

          req.mytoken = token.user;
          return done(null, req.mytoken);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, username } = req.body;
          const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password,
          });

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    'login',
    new localStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          const validate = await user.isValidPassword(password);
          if (!validate) {
            return done(null, false, { message: 'User not found' });
          }
          return done(null, user, { message: 'Login Successful' });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
