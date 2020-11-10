const { User } = require('./user.model');
const mongoose = require('mongoose');
const taskService = require('../tasks/task.service');
const { hashPassword } = require('../../common/hashHelper');
const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

class NotValidError extends Error {
  constructor(message) {
    super(message);
    this.name = 'validation error';
    this.status = BAD_REQUEST;
    this.text = getStatusText(this.status);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Not found error';
    this.status = NOT_FOUND;
    this.text = getStatusText(this.status);
  }
}

const checkID = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotValidError(`ID ${id} is not correct`);
  }
  return id;
};

const getAll = async () => User.find({});

const save = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  return User.create(newUser);
};

const getById = async id => {
  await checkID(id);
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const getByProps = async props => await User.find(props);

const saveAdminUser = async user => {
  const { name, login } = user;
  const users = await getByProps({ name, login });
  if (users.length < 1) await save(user);
};

const update = async (id, user) => {
  await checkID(id);
  await User.validate(user, ['name', 'login', 'password']);
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  await User.updateOne({ _id: id }, newUser);
  return getById(id);
};

const remove = async id => {
  await checkID(id);
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  const handledTasks = await taskService.del(id);
  const deletedUser = await User.deleteOne({ _id: id });
  return { handledTasks, deletedUser };
};
module.exports = {
  getAll,
  save,
  getById,
  getByProps,
  remove,
  update,
  saveAdminUser,
  NotValidError,
  NotFoundError
};
