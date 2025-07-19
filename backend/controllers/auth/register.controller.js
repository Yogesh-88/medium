const { StatusCodes } = require('http-status-codes');
const { registerUserService } = require('../../services/auth');

const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(StatusCodes.CREATED).json({
      user,
    });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = registerUser;
