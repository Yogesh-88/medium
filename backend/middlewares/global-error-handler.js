const { StatusCodes } = require('http-status-codes');

const globalErrorHandler = (err, _req, res, _next) => {
  let status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    status = StatusCodes.BAD_REQUEST;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    status = StatusCodes.BAD_REQUEST;
    message = 'Invalid ID format';
  } else if (err.code === 11000) {
    status = StatusCodes.CONFLICT;
    message = 'Duplicate entry';
  } else if (err.name === 'JsonWebTokenError') {
    status = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    status = StatusCodes.UNAUTHORIZED;
    message = 'Token expired';
  }

  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = globalErrorHandler;
