const { connectionService } = require('../services');
const { successResponse } = require('../utils/response');

const followUser = async (req, res, next) => {
  try {
    await connectionService.follow(req.user.id, req.params.id);
    return successResponse(res, {}, 'Followed user successfully');
  } catch (error) {
    next(error);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    await connectionService.unfollow(req.user.id, req.params.id);
    return successResponse(res, {}, 'Unfollowed user successfully');
  } catch (error) {
    next(error);
  }
};

const getFollowers = async (req, res, next) => {
  try {
    const data = await connectionService.getFollowers(req.params.id);
    return successResponse(res, data, 'Followers list fetched');
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const data = await connectionService.getFollowing(req.params.id);
    return successResponse(res, data, 'Following list fetched');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
