const morgan = require('morgan');
const { logger } = require('../config');

morgan.token('timestamp', () => new Date().toISOString());
morgan.token('body', (req) => JSON.stringify(req.body));

const customFormat =
  ':timestamp :method :url :status :res[content-length] bytes - :response-time ms - User-Agent: :user-agent  -Body:body';

const morganMiddleware = morgan(customFormat, {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

module.exports = morganMiddleware;
