const { default: mongoose } = require('mongoose');
const { Article, Follow } = require('../models');

const getAllArticles = async () => {
  return await Article.find().populate('author', 'username');
};

const getArticleById = async (id) => {
  return await Article.findById(id).populate('author', 'username');
};

const createArticle = async (data, user) => {
  return await Article.create({
    ...data,
    author: user.id,
  });
};

const updateArticle = async (id, data, user) => {
  const article = await Article.findById(id);
  if (!article) return 'not found';

  if (article.author.toString() !== user._id.toString()) return 'forbidden';

  Object.assign(article, data);
  return await article.save();
};

const deleteArticle = async (id, user) => {
  const article = await Article.findById(id);
  if (!article) return 'not_found';

  if (article.author.toString() !== user._id.toString()) return 'forbidden';

  await article.deleteOne();
  return true;
};

const getFeed = async (userId, page, limit) => {
  const skip = (page - 1) * limit;

  const articles = Follow.aggregate([
    {
      $match: {
        follower: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'articles',
        localField: 'following',
        foreignField: 'author',
        as: 'articles',
      },
    },
    {
      $unwind: {
        path: '$articles',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceRoot: {
        newRoot: '$articles',
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {
      $unwind: {
        path: '$author',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        title: 1,
        subtitle: 1,
        createdAt: 1,
        tags: 1,
        content: 1,
        author: {
          _id: '$author._id',
          username: '$author.username',
          avatar: '$author.avatar',
        },
      },
    },
  ]);
  return articles;
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getFeed,
};
