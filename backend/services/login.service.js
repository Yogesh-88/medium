const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const loginService = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error('User not found');
    error.status = StatusCodes.NOT_FOUND;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid Credentials');
    error.status = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = loginService;
