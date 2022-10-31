const { Router } = require('express');

const { loginUser, registerUser } = require('../controllers/auth.controllers');
const passport = require('passport');
const router = Router();
router.post(
  '/register',
  //   passport.authenticate('signup', { session: false }),
  passport.authenticate('signup', { session: false }),
  registerUser
);

router.post('/signin', loginUser);
module.exports = router;
