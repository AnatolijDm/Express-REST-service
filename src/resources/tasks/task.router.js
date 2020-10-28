const router = require('express').Router({ mergeParams: true });
const { NO_CONTENT } = require('http-status-codes');
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);

    res.send(tasks.map(Task.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const task = await taskService.get(boardId, taskId);

    res.send(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const task = await taskService.create(boardId, req.body);

    res.send(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await taskService.change(boardId, taskId, req.body);

    res.send(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    await taskService.del(boardId, taskId);

    res.status(NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
