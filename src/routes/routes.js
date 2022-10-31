const { Router } = require('express');

const router = Router();

const passport = require('passport');

router.use('/auth', require('./auth.routes'));

module.exports = router;
