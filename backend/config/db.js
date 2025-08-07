const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');
const logger = require('./logger');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB Connected');
  } catch (error) {
    logger.error('MongoDB connection error', {
      error: error.message,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
