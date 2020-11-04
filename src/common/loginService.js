const usersRepo = require('./DataBase');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const signToken = (lgn, psw) => {
  const user = usersRepo.getByProps(lgn, psw);
  const { id, login } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = {
  signToken
};
