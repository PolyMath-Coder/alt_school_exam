const { Router } = require('express');

const router = Router();
const passport = require('passport');

router.use('/auth', require('./auth.routes'));
router.use('/blog', require('./blog.routes'));

module.exports = router;
