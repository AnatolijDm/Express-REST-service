const router = require('express').Router();
const loginService = require('./loginService');

router.post('/', (req, res) => {
  const { login, password } = req.body;
  const token = loginService.signToken(login, password);

  if (!token) {
    res.status(403).send('wrong login/password');
  } else {
    res.status(200).json(token);
  }
});

module.exports = router;
