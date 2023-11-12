const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const UnAuthorizedError = require('../errors/unAuthorized');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAuthorizedError('Необходима авторизация');
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnAuthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
