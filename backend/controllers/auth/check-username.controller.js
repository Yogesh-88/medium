const { StatusCodes } = require('http-status-codes');
const { checkUsernameService } = require('../../services/auth');

const checkUsernameController = async (req, res) => {
  const username = req.body?.username;
  if (!username) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Username is required in the request body',
    });
  }
  try {
    await checkUsernameService(username);
    return res.status(StatusCodes.OK).json({
      message: 'Username is available',
    });
  } catch (error) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
};

module.exports = checkUsernameController;
