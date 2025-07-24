const { StatusCodes } = require('http-status-codes');
const { profileService } = require('../services');

const getMyProfile = async (req, res) => {
  try {
    const user = await profileService.getMyProfile(req.user.id);
    res.status(StatusCodes.OK).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const user = await profileService.updateMyProfile(req.user.id, req.body);
    res.status(StatusCodes.OK).json({
      message: 'Profie updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await profileService.getUserById(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }
    res.status(StatusCodes.OK).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getUserById,
};
