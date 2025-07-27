const { StatusCodes } = require('http-status-codes');
const { profileService } = require('../services');
const {
  response: { successResponse, errorResponse },
} = require('../utils');

const getMyProfile = async (req, res, next) => {
  try {
    const user = await profileService.getMyProfile(req.user.id);
    return successResponse(res, user, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const user = await profileService.updateMyProfile(req.user.id, req.body);
    return successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await profileService.getUserById(req.params.id);
    if (!user) {
      return errorResponse(res, {}, 'User not found', StatusCodes.NOT_FOUND);
    }
    return successResponse(res, user, 'User fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getUserById,
};
