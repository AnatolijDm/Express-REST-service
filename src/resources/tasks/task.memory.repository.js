const Db = require('../../common/DataBase');

const getAll = async id => {
  const tasks = await Db.getAllTasks(id);
  if (!tasks.length) {
    throw new Error(`The task with id: ${id} was not found`);
  }
  return tasks;
};

const get = async (id, boardId) => {
  const task = await Db.getTask(id, boardId);
  if (!task) {
    throw new Error(`The task with id: ${id} was not found!`);
  }

  return task;
};

const create = async task => {
  return Db.createTask(task);
};

const change = async (id, boardId, data) => {
  return Db.changeTask(id, boardId, data);
};

const del = async (id, boardId) => {
  const task = Db.deleteTask(id, boardId);
  if (!task) {
    throw new Error(`The task with id: ${id} was not found`);
  }
  return task;
};

module.exports = { getAll, get, create, change, del };
