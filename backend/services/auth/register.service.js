const User = require('../../models/user');
const { hashPassword } = require('../../utils/hash');
const registerUserService = async (body) => {
  const { name, email, password, avatar, bio, role } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.status = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    avatar,
    bio,
    role,
  });

  await user.save();

  return {
    id: user._id,
    username: user.name,
    email: user.email,
  };
};

module.exports = registerUserService;
