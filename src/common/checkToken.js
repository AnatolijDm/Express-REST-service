const jtw = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');
    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      res.status(401).send('Unauthorized user');
    } else {
      try {
        const resp = jtw.verify(token, JWT_SECRET_KEY);
        console.log(resp);
      } catch {
        res.status(401).send('Unauthorized user');
      }
      return next();
    }
  }
  res.status(401).send('Unauthorized user');
};
