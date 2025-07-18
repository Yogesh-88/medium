const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional().allow(''),
  bio: Joi.string().max(200).optional().allow(''),
  role: Joi.string().valid('reader', 'author', 'admin').optional(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Password do not match',
    'any.required': 'Confirm password is required',
  }),
});

function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      errros: errorMessages,
    });
  }

  next();
}

module.exports = validateRegister;
