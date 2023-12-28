const jwt = require('jsonwebtoken');
const Unauthorized = require('./errors/errAuth');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const {
  ERROR_AUTH_REQUIRED,
} = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Unauthorized(ERROR_AUTH_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new Unauthorized(err));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = {
  auth,
};
