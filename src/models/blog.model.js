const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
    author: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    state: {
      type: String,
      enum: ['draft', 'published'],
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;