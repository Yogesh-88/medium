const { StatusCodes } = require('http-status-codes');

const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Api endpoint not found',
  });
};

module.exports = notFound;
