const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.change(req.params.id, req.body);

  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const users = await usersService.del(req.params.id);

  res.json(users.map(User.toResponse));
});

module.exports = router;
