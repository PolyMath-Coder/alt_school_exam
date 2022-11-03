const Blog = require('../models/blog.model');
const passport = require('passport');

const createBlog = async (req, res) => {
  let data = req.body;
  data.state = 'draft';
  console.log(req.user);
  const blog = await Blog.create(data);
  const newBlog = await Blog.findByIdAndUpdate(
    blog.id,
    { author: req.user.id },
    { new: true }
  ).populate('author');
  res.status(200).json({
    status: 'success',
    msg: 'Blog successfully created...',
    newBlog,
  });
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id, state: 'published' }).populate(
    'author'
  );
  res
    .status(200)
    .json({ status: 'success', msg: 'Blog successfully retrieved', blog });
};

const getBlogs = async (req, res) => {
  const blogs = await Blog.find({ state: 'published' });
  res
    .status(201)
    .json({ status: 'success', msg: 'All blogs retrieved', blogs });
};

const getMyBlogs = async (req, res) => {
  const authorId = req.user.id;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  await Blog.find({ author: authorId });
};

const updateBlogInfo = async (req, res) => {
  const { id } = req.params;
  const updatedBody = req.body;
  const blog = await Blog.findByIdAndUpdate(id, updatedBody, { new: true });
  res
    .status(200)
    .json({ status: 'message', msg: 'Blog Details now updated', blog });
};

const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    msg: `The Blog with the id ${req.params.id} has been removed. `,
  });
};
module.exports = {
  createBlog,
  getSingleBlog,
  getBlogs,
  updateBlogInfo,
  deleteBlog,
};
