const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимально разрешенное количество запросов
  message: 'Превышен лимит запросов. Пожалуйста, попробуйте позже.',
});

module.exports = limiter;
