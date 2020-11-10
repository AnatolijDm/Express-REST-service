const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized error';
    this.status = UNAUTHORIZED;
    this.text = getStatusText(this.status);
  }
}

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedError('Unauthorized user!');
    } else {
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    }
  }
  throw new UnauthorizedError('Unauthorized user!');
};
