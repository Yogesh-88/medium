const morgan = require('morgan');
const { NODE_ENV } = require('../config');
const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {
  flags: 'a',
});

const format = NODE_ENV === 'production' ? 'combined' : 'dev';

const morganMiddleware = morgan(format, {
  stream: logStream,
});

module.exports = morganMiddleware;
