const usersRepo = require('./DataBase');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const { checkHashedPassword } = require('./hashHelper');

const signToken = (lgn, password) => {
  const user = usersRepo.getByProps(lgn);
  const { password: hashedPassword } = user;
  const comparisonRes = checkHashedPassword(password, hashedPassword);
  if (comparisonRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
    return token;
  }
  return null;
};

module.exports = {
  signToken
};
