const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks);
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id, boardId } = req.params;
    const task = await tasksService.get(id, boardId);
    res.json(task);
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(
    new Task({
      title: req.body.title,
      description: req.body.description,
      order: req.body.order,
      userId: req.body.userId,
      boardId,
      columnId: req.body.columnId
    })
  );

  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const { id, boardId } = req.params;
  const data = req.body;
  const task = await tasksService.change(id, boardId, data);

  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id, boardId } = req.params;
    await tasksService.del(id, boardId);
    res.status(204).send('TASK SUCCESSFULLY DELETED!!!');
  } catch (error) {
    res.status(404).send('Not Found');
  }
});

module.exports = router;
