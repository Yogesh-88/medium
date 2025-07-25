const env = require('./env');

module.exports = {
  PORT: env.PORT,
  MONGO_URI: env.MONGO_URI,
  JWT_SECRET: env.JWT_SECRET,
};
