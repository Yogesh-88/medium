const morgan = require('morgan');

const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

module.exports = morganMiddleware;
