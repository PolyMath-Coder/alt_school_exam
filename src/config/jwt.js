const jwt = require('jsonwebtoken');
const Blog = require('../models/blog.model');
const JWT_STRING = process.env.JWT_SECRET;

const userAuthentication = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    res.status(403).json({
      status: 'access denied',
      msg: 'Oops! You might have to either sign up or login to gain access',
    });
    return;
  }
  const bearer = bearerHeader.split(' ');
  const [tops, token] = bearer;
  jwt.verify(token, JWT_STRING, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        status: 'access denied',
        msg: 'Oops! Your token might be expired...',
      });
      return;
    } else {
      req.user = decodedToken.user;
      return next();
    }
  });
};
const bloggerAuthorization = async (req, res, next) => {
  const { author } = await Blog.findById(req.params.id);

  if (req.user.id != author) {
    return res.status(403).json({
      status: 'success',
      message:
        'Only Bloggers/ Blog Owners are permitted to perform this activity on their blogs',
    });
  }

  return next();
};

module.exports = { userAuthentication, bloggerAuthorization };
