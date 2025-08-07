const { StatusCodes } = require('http-status-codes');
const { Follow } = require('../models');

const follow = async (followerId, followingId) => {
  if (followerId === followingId) {
    const error = new Error();
    error.status = StatusCodes.BAD_REQUEST;
    error.message = "You can't follow yourself";
    throw error;
  }

  const alreadyFollowing = await Follow.findOne({
    follower: followerId,
    following: followingId,
  });

  if (alreadyFollowing) return;

  await Follow.create({ follower: followerId, following: followingId });
};

const unfollow = async (followerId, followingId) => {
  await Follow.deleteOne({ follower: followerId, following: followingId });
};

const getFollowers = async (userId) => {
  const followers = await Follow.find({ following: userId })
    .populate('follower', 'username avatar')
    .lean();
  return followers.map((f) => f.follower);
};

const getFollowing = async (userId) => {
  const following = await Follow.find({ follower: userId })
    .populate('following', 'username avatar')
    .lean();
  return following.map((f) => f.following);
};

module.exports = {
  follow,
  unfollow,
  getFollowers,
  getFollowing,
};
