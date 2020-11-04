const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const get = (id, boardId) => tasksRepo.get(id, boardId);

const create = task => tasksRepo.create(task);

const change = (id, boardId, data) => tasksRepo.change(id, boardId, data);

const del = (id, boardId) => tasksRepo.del(id, boardId);

module.exports = { getAll, get, create, change, del };
