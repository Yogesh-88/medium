const User = require('../models/user');
const { hashPassword } = require('../utils/hash');
const { StatusCodes } = require('http-status-codes');

const registerUserService = async (body) => {
  const { username, firstName, lastName, email, password, avatar, bio, role } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.status = StatusCodes.CONFLICT;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    avatar,
    bio,
    role,
  });

  await user.save();

  return {
    id: user._id,
    username: user.name,
    email: user.email,
  };
};

module.exports = registerUserService;
