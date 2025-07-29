const winston = require('winston');
const path = require('path');
const fs = require('fs');
const { LOG_LEVEL, NODE_ENV } = require('./env');

const logDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, printf, errors, colorize, metadata } = winston.format;

//for production logFormat should be json
const logFormat = printf(({ level, message, timestamp, stack, metadata }) => {
  return `${timestamp} ${level}: ${stack || message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
});

const { File, Console } = winston.transports;

const transports = [
  new File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
  new File({ filename: path.join(logDir, 'combined.log') }),
];

if (NODE_ENV === 'development') {
  transports.push(
    new Console({
      format: combine(colorize(), logFormat),
    })
  );
}

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    errors({ stack: true }),
    logFormat
  ),
  transports,
});

module.exports = logger;
