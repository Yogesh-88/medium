const { Article } = require('../models');

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
  if (!article) return 'not found';

  if (article.author.toString() !== user._id.toString()) return 'forbidden';

  Object.assign(article, data);
  return await article.save();
};

const deleteArticle = async (id, user) => {
  const article = await Article.findById(id);
  if (!article) return 'not_found';

  if (article.author.toString() !== user._id.toString()) return 'forbidden';

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
