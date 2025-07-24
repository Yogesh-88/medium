const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 68 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: true,
});

module.exports = limiter;
