const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 1000, // limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.'
});

module.exports = {apiLimiter};