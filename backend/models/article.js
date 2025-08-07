const { Schema, model, Types } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [300, 'Subtitle is too long'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  tags: {
    type: [String],
    default: [],
    index: true,
  },
  //summary
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Excerpt is too long'],
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  allowComments: {
    type: Boolean,
    default: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
});

const Article = model('Article', articleSchema);
module.exports = Article;
