const mongoose = require('mongoose');

const gracefulShutdown = (server) => {
  const shutdown = async () => {
    console.log('Shutting down gracefully');

    server.close(async () => {
      console.log('HTTP server closed');

      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
      } catch (error) {
        console.log('Erorr closing MongoDB', error);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

module.exports = gracefulShutdown;
