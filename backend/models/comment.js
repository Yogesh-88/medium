const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
  article: {
    type: Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = model('Comment', commentSchema);
