const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().min(4).max(50).trim().required(),
  password: Joi.string().min(6).required(),
});

function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      errros: errorMessages,
    });
  }

  next();
}

module.exports = validateLogin;
