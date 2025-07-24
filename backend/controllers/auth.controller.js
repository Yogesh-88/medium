const { StatusCodes } = require('http-status-codes');
const { authService } = require('../services');
const { successResponse, errorResponse } = require('../utils/response');

const checkUsername = async (req, res, next) => {
  const username = req.body?.username.toLowerCase();
  if (!username) {
    return errorResponse(
      res,
      {},
      'Username is required in the request body',
      StatusCodes.BAD_REQUEST
    );
  }
  try {
    await authService.checkUsername(username);
    return successResponse(res, {}, 'Username is available');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return successResponse(res, { user: result.user, token: result.token }, 'Login success');
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    return successResponse(res, { user }, 'Registration success', StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUsername,
  login,
  register,
};
