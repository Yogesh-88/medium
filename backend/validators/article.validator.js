const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const articleSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().trim().lowercase().required(),
  subtitle: Joi.string().trim(),
  content: Joi.string().required(),
  excerpt: Joi.string().trim(),
  author: Joi.string().hex(),
  viewCount: Joi.number().min(0),
  commentCount: Joi.number().min(0),
  allowComments: Joi.boolean(),
  isPremium: Joi.boolean(),
});

const validateArticle = (req, res, next) => {
  const { error } = articleSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorMessages,
    });
  }
  next();
};
module.exports = validateArticle;
