const { Router } = require('express');
const {
  createBlog,
  getSingleBlog,
  getauthorBlogs,
  getBlogs,
  updateBlogInfo,
  deleteBlog,
} = require('../controllers/blog.controller');
const router = Router();
const passport = require('passport');
const { userAuthentication, bloggerAuthorization } = require('../config/jwt');

router.post('/create', userAuthentication, createBlog);
router.get(
  '/author/blogs',
  userAuthentication,
  bloggerAuthorization,
  getauthorBlogs
);
router.get('/:id', getSingleBlog);
router.get('/all', getBlogs);
router.put(
  '/update/:id',
  userAuthentication,
  bloggerAuthorization,
  updateBlogInfo
);
router.delete(
  '/delete/:id',
  userAuthentication,
  bloggerAuthorization,
  deleteBlog
);

module.exports = router;
