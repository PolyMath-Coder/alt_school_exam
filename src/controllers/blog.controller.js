const Blog = require('../models/blog.model');
const passport = require('passport');
const moment = require('moment');

const createBlog = async (req, res) => {
  let data = req.body;
  data.state = 'draft';
  data.created_at = moment().toDate();
  const blog = await Blog.create(data);
  const authorBlog = JSON.parse(JSON.stringify(blog));
  const newBlog = await Blog.findByIdAndUpdate(
    authorBlog.id,
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
  const { read_count } = await Blog.findOne({ _id: id });
  const newReadCount = read_count + 1;
  const blog = await Blog.findOneAndUpdate(
    { _id: id, state: 'published' },
    { read_count: newReadCount },
    { new: true }
  ).populate('author');
  res
    .status(200)
    .json({ status: 'success', msg: 'Blog successfully retrieved', blog });
};

const getBlogs = async (req, res) => {
  const page = req.query.page * 1 || 1;
  const per_page = req.query.per_page * 1 || 20;
  const skip = (page - 1) * per_page;
  const {
    order,
    order_by_timestamp,
    order_by_read_count,
    order_by_reading_time,
  } = req.query;
  let blogs;

  const sortQuery = {};

  const sortAttributesForTimestamp = order_by_timestamp.split(',');
  const sortAttributesForReadcount = order_by_read_count.split(',');
  const sortAttributesForReadingTime = order_by_reading_time.split(',');
  for (const attribute of sortAttributesForTimestamp) {
    if (order === 'asc' && order_by_timestamp) {
      sortQuery[attribute] = 1;
    }
    if (order === 'desc' && order_by_timestamp) {
      sortQuery[attribute] = -1;
    }
  }
  for (const attribute of sortAttributesForReadcount) {
    if (order === 'asc' && order_by_read_count) {
      sortQuery[attribute] = -1;
    }
    if (order === 'desc' && order_by_read_count) {
      sortQuery[attribute] = -1;
    }
  }
  for (const attribute of sortAttributesForReadingTime) {
    if (order === 'asc' && order_by_reading_time) {
      sortQuery[attribute] = -1;
    }
    if (order === 'desc' && order_by_reading_time) {
      sortQuery[attribute] = -1;
    }
  }
  blogs = await Blog.find({ state: 'published' })
    .sort(sortQuery)
    .skip(skip)
    .limit(per_page);

  if (req.query.search_by_author) {
    blogs = await Blog.find({
      state: 'published',
      $text: { $search: req.query.author },
    })
      .skip(skip)
      .limit(per_page)
      .exec();
  } else if (req.query.search_by_title) {
    blogs = await Blog.find({
      state: 'published',
      $text: { $search: req.query.title },
    })
      .skip(skip)
      .limit(per_page)
      .exec();
  } else if (req.query.search_by_tags) {
    blogs = await Blog.find({
      state: 'published',
      $text: { $search: req.query.tags },
    })
      .skip(skip)
      .limit(per_page)
      .exec();
  } else {
    blogs = await Blog.find({ state: 'published' })
      .skip(skip)
      .limit(per_page)
      .exec();
  }
  res
    .status(201)
    .json({ status: 'success', msg: 'All blogs retrieved', blogs });
};

const getauthorBlogs = async (req, res) => {
  let blogs;
  const authorId = req.user.id;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  if (req.query.state) {
    blogs = await Blog.find({ author: authorId, state: req.query.state })
      .skip(skip)
      .limit(limit)
      .exec();
  }
  blogs = await Blog.find({ author: authorId })
    .skip(skip)
    .limit(limit)
    .exec();
  res.status(200).json({
    status: 'success',
    message: 'Here is/are the blog(s) you have authored...',
    data: blogs,
  });
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
  getauthorBlogs,
  deleteBlog,
};
