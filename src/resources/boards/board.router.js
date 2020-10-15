const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (error) {
    res.status(404).send(error.massage);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );

  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.change(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.del(req.params.id);
    res.status(204).send('Board deleted!!');
  } catch (error) {
    res.status(404).send(error.massage);
  }
});

module.exports = router;
