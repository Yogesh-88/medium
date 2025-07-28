const mongoose = require('mongoose');
const logger = require('../config/logger');

const gracefulShutdown = (server) => {
  const shutdown = async (signal) => {
    logger.info(`${signal} received, starting graceful shutdown`);

    server.close(async () => {
      logger.info('HTTP server closed');

      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed');

        logger.end(() => {
          process.exit(0);
        });
      } catch (error) {
        logger.error('Error closing MongoDB', { error: error.message });
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

module.exports = gracefulShutdown;
