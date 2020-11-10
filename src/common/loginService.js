const usersRepo = require('../resources/users/user.memoryDB.repository');
const { checkHashedPassword } = require('./hashHelper');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const { FORBIDDEN, getStatusText } = require('http-status-codes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden error';
    this.status = FORBIDDEN;
    this.text = getStatusText(this.status);
  }
}

const signToken = async (userLogin, password) => {
  const users = await usersRepo.getByProps({ login: userLogin });
  const user = users[0];

  if (!user) {
    throw new ForbiddenError('Wrong login or password');
  }

  const { password: hashedPassword } = user;
  const comparisonRes = await checkHashedPassword(password, hashedPassword);
  if (comparisonRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
    return token;
  }

  throw new ForbiddenError('Wrong login or password');
};

module.exports = {
  signToken
};
