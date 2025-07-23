const { StatusCodes } = require('http-status-codes');
const { articleService } = require('../services');

const getAllArticles = async (req, res) => {
  const articles = await articleService.getAllArticles();
  res.status(StatusCodes.OK).json({
    articles,
  });
};

const getArticleById = async (req, res) => {
  const article = await articleService.getArticleById(req.params.id);
  if (!article) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Article not found',
    });
  }
  res.status(StatusCodes.OK).json({
    article,
  });
};

const createArticle = async (req, res) => {
  const article = await articleService.createArticle(req.body, req.user);
  res.status(StatusCodes.CREATED).json({
    article,
  });
};

const updateArticle = async (req, res) => {
  const updated = await articleService.updateArticle(req.params.id, req.body, req.user);
  if (!updated) {
    return res.status(StatusCodes.FORBIDDEN).json({
      messssage: 'Not allowed',
    });
  }
  res.status(StatusCodes.OK).json({
    updated,
  });
};

const deleteArticle = async (req, res) => {
  const deleted = await articleService.deleteArticle(req.params.id, req.user);
  if (!deleted) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Not allowed',
    });
  }
  res.status(StatusCodes.OK).json({ message: 'Article deleted' });
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
