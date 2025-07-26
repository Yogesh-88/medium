const Comment = require('../models/comment');
const Clap = require('../models/clap');

const addComment = async (articleId, userId, text) => {
  const comment = new Comment({
    article: articleId,
    user: userId,
    content: text,
  });
  return await comment.save();
};

const getCommentsForArticle = async (articleId) => {
  return await Comment.find({ article: articleId }).sort({ createdAt: -1 });
};

const clapArticle = async (articleId, userId) => {
  const existing = await Clap.findOne({ article: articleId, user: userId });

  if (!existing) {
    const clap = new Clap({
      article: articleId,
      user: userId,
    });
    await clap.save();
  }

  const count = await Clap.countDocuments({ article: articleId });
  return {
    totalClaps: count,
  };
};

module.exports = {
  addComment,
  getCommentsForArticle,
  clapArticle,
};
