const { StatusCodes } = require('http-status-codes');
const { authService } = require('../services');
const {
  response: { successResponse, errorResponse },
} = require('../utils');
const { logger } = require('../config');

const checkUsername = async (req, res, next) => {
  const username = req.query?.username.toLowerCase();

  if (!username) {
    logger.warn('Username check failed: missing username in query');

    return errorResponse(
      res,
      {},
      'Username is required in the request query',
      StatusCodes.BAD_REQUEST
    );
  }
  try {
    logger.info('Checking username availability');
    await authService.checkUsername(username);
    logger.info('Username is available', { username });
    return successResponse(res, {}, 'Username is available');
  } catch (error) {
    logger.error('Error while checking username', { username, error });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    logger.info('Login attempt', { username });

    const result = await authService.login(username, password);
    logger.info('Login successful', { userId: result.user.id });

    return successResponse(res, { user: result.user, token: result.token }, 'Login success');
  } catch (error) {
    logger.error('Login failed', { username, error });
    next(error);
  }
};

const register = async (req, res, next) => {
  logger.info('Registration attempt', { username: req.body?.username });

  try {
    const user = await authService.register(req.body);
    logger.info('Registration successfull', { userId: user._id });
    return successResponse(res, { user }, 'Registration success', StatusCodes.CREATED);
  } catch (error) {
    logger.error('Registration faile', { error });
    next(error);
  }
};

module.exports = {
  checkUsername,
  login,
  register,
};
