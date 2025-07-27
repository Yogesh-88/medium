const app = require('./app');
const connectDB = require('./config/db');
const { PORT } = require('./config');
const { gracefulShutdown } = require('./utils');

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });

    gracefulShutdown(server);
  } catch (error) {
    console.log('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
