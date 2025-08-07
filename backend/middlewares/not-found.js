const { StatusCodes } = require('http-status-codes');

const notFound = (_req, res, _next) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Api endpoint not found',
  });
};

module.exports = notFound;
