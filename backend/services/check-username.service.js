const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const checkUsernameService = async (username) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const error = new Error('Username is already taken');
    error.status = StatusCodes.CONFLICT;
    throw error;
  }
};

module.exports = checkUsernameService;
