const { StatusCodes } = require('http-status-codes');

const successResponse = (res, data = {}, message = 'Success', status = StatusCodes.OK) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (
  res,
  error = {},
  message = 'Something went wrong',
  status = StatusCodes.INTERNAL_SERVER_ERROR
) => {
  return res.status(status).json({
    success: false,
    message,
    error: error.message || error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
