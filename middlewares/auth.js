const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Autorización requerida');
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    const error = new Error('Autorización requerida');
    error.statusCode = 401;
    return next(error);
  }

  req.user = payload;
  return next();
};

module.exports = auth;