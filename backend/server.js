const app = require('./app');
const connectDB = require('./config/db');
const { PORT, NODE_ENV } = require('./config');
const { gracefulShutdown } = require('./utils');
const logger = require('./config/logger');

async function startServer() {
  try {
    logger.info('Starting server initialization');

    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info('Server started successfully', {
        port: PORT,
        environment: NODE_ENV,
      });
    });

    gracefulShutdown(server);
  } catch (error) {
    logger.error('Failed to start server', {
      error: error.message,
      stack: error.stack,
    });

    logger.end(() => {
      process.exit(1);
    });
  }
}

startServer();
