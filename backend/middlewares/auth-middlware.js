const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { JWT_SECRET } = require('../config');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid token',
    });
  }
};

module.exports = authMiddleware;
