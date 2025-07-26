const { StatusCodes } = require('http-status-codes');
const { interactionService } = require('../services');
const { successResponse } = require('../utils/response');

const addComment = async (req, res, next) => {
  try {
    if (!req.body.text || !req.body.text.trim()) {
      return next({ status: StatusCodes.BAD_REQUEST, message: 'Comment text is required' });
    }
    const comment = await interactionService.addComment(req.params.id, req.user.id, req.body.text);
    return successResponse(res, comment, 'Comment added', StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const getCommentsForArticle = async (req, res, next) => {
  try {
    const comments = await interactionService.getCommentsForArticle(req.params.id);
    return successResponse(res, comments, 'Comments fetched successfully');
  } catch (error) {
    next(error);
  }
};

const clapArticle = async (req, res, next) => {
  try {
    const result = await interactionService.clapArticle(req.params.id, req.user.id);
    return successResponse(res, result, 'Clapped successfully', StatusCodes.CREATED);
  } catch (error) {
    console.log(error, 'Somthing');
    next(error);
  }
};

module.exports = {
  addComment,
  getCommentsForArticle,
  clapArticle,
};
