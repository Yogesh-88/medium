const { User } = require('../models');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { hashPassword, generateToken } = require('../utils');

const login = async (username, password) => {
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

  const token = generateToken({ id: user._id });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};

const checkUsername = async (username) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    const error = new Error('Username is already taken');
    error.status = StatusCodes.CONFLICT;
    throw error;
  }
};

const register = async (body) => {
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

  const token = generateToken({ id: user._id });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};

module.exports = {
  register,
  login,
  checkUsername,
};
