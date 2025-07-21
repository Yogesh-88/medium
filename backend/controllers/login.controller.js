const { StatusCodes } = require('http-status-codes');
const { loginService } = require('../services');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginService(username, password);

    return res.status(StatusCodes.OK).json({
      message: 'Login Successfull',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
};
module.exports = loginController;
