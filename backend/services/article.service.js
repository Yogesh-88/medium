const Article = require('../models/article');

const getAllArticles = async () => {
  return await Article.find().populate('author', 'username');
};

const getArticleById = async (id) => {
  return await Article.findById(id).populate('author', 'username');
};

const createArticle = async (data, user) => {
  return await Article.create({
    ...data,
    author: user.id,
  });
};

const updateArticle = async (id, data, user) => {
  const article = await Article.findById(id);
  if (!article || article.author.toString() !== user._id.toString()) return null;

  Object.assign(article, data);
  return await article.save();
};

const deleteArticle = async (id, user) => {
  const article = await Article.findById(id);
  if (!article || article.author.toString() !== user._id.toString()) return null;

  await article.deleteOne();
  return true;
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
