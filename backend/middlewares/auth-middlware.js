const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { JWT_SECRET } = require('../config');
const {
  response: { errorResponse },
} = require('../utils');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'No token provided', StatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
