const env = require('./env');

module.exports = {
  PORT: env.PORT,
  MONGO_URI: env.MONGO_URI,
  JWT_SECRET: env.JWT_SECRET,
  NODE_ENV: env.NODE_ENV,
  LOG_LEVEL: env.LOG_LEVEL,
  connectDB: require('./db'),
  logger: require('./logger'),
};
