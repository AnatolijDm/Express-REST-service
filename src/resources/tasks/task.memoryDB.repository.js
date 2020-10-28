const Task = require('../tasks/task.model');

const getAll = async id => Task.findOne({ boardId: id });

const get = async (boardId, id) => {
  // throw new Error();
  const task = Task.find({ boardId }, { _id: id });

  if (!task) {
    throw new Error(`The task with id: ${id} was not found!`);
  }

  return task;
};

const create = async task => {
  return Task.create(task);
  /* const userCr =  User.create(user);
  Db.users.push(userCr);
  return userCr;*/
};

const change = async (id, data) => {
  // throw new Error();
  return Task.update({ _id: id }, data);
};

const del = async id => {
  // throw new Error();
  /* users.filter(e => e.id !== id);
  /*Db.tasks.forEach(e => {
    e.userId = null;
  });*/
  return Task.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, change, del };
