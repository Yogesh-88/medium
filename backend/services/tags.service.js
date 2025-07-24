const Article = require('../models/article');

const getTrendingTags = async () => {
  const result = await Article.aggregate([
    [
      {
        $unwind: {
          path: '$tags',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          tag: '$_id',
          _id: 0,
        },
      },
    ],
  ]);

  return result.map((item) => item.tag);
};

module.exports = { getTrendingTags };
