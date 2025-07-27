const {
  response: { successResponse },
} = require('../utils');
const { tagsService } = require('../services');

const getTrendingTags = async (req, res, next) => {
  try {
    const tags = await tagsService.getTrendingTags();
    return successResponse(res, tags, 'Trending tags fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrendingTags,
};
