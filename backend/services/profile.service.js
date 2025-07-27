const { User } = require('../models');

const getMyProfile = async (userId) => {
  return await User.findById(userId).select('-password -createdAt -updatedAt');
};

const updateMyProfile = async (userId, updates) => {
  return await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select('-password');
};

const getUserById = async (id) => {
  return await User.findById(id).select('username avatar bio');
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getUserById,
};
