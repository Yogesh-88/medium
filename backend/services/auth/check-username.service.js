const User = require('../../models/user');

const checkUsernameService = async (username) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const error = new Error('Username is already taken');
    error.status = 409;
    throw error;
  }
};

module.exports = checkUsernameService;
