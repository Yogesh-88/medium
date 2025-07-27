const { StatusCodes } = require('http-status-codes');
const { articleService } = require('../services');
const {
  response: { successResponse, errorResponse },
} = require('../utils');

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await articleService.getAllArticles();
    return successResponse(res, articles, 'Articles fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return errorResponse(res, {}, 'Article not found', StatusCodes.NOT_FOUND);
    }
    return successResponse(res, article, 'Article fetched successfully');
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req.body, req.user);
    return successResponse(res, article, 'Article created successfully', StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const result = await articleService.updateArticle(req.params.id, req.body, req.user);
    if (result == 'not_found')
      return errorResponse(res, {}, 'Article not found', StatusCodes.NOT_FOUND);

    if (result == 'forbidden')
      return errorResponse(res, {}, 'Not authorized to update this article', StatusCodes.FORBIDDEN);

    return successResponse(res, updated, 'Article updated');
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const result = await articleService.deleteArticle(req.params.id, req.user);
    if (result == 'not_found')
      return errorResponse(res, {}, 'Article not found', StatusCodes.NOT_FOUND);

    if (result == 'forbidden')
      return errorResponse(res, {}, 'Not authorized to delete this article', StatusCodes.FORBIDDEN);

    return successResponse(res, {}, 'Article deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
