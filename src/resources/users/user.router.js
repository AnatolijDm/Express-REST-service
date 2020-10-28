const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User(req.body));
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.change(req.params.id, req.body);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.del(req.params.id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  res.status(200).send(User.toResponse(user));
});

module.exports = router;
