const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const Db = {
  users: [],
  boards: [],
  tasks: []
};

Db.users.push(new User(), new User(), new User());

const getAllUsers = async () => Db.users.slice(0);
const getUser = async id => Db.users.filter(e => e.id === id)[0];
const createUser = async user => {
  Db.users.push(user);
  return user;
};
const changeUser = async (id, data) => {
  const user = await getUser(id);
  user.name = data.name;
  user.password = data.password;
  user.login = data.login;
  Db.users.filter(e => e.id !== id);
  Db.users.push(user);
  return user;
};
const deleteUser = async id => {
  Db.users.filter(e => e.id !== id);
  Db.tasks.forEach(e => {
    e.userId = null;
  });
  return Db.users.slice(0);
};

const getByProps = props =>
  Db.users.find(user => {
    const matches = Object.entries(props).map(item => {
      const [prop, value] = item;
      return user[prop] === value;
    });
    return matches.every(item => item === true);
  });

Db.boards.push(new Board(), new Board(), new Board());

const getAllBoards = async () => Db.boards.slice(0);
const getBoard = async id => Db.boards.filter(e => e.id === id)[0];
const createBoard = async board => {
  Db.boards.push(board);
  return board;
};

const changeBoard = async (id, data) => {
  const board = await getBoard(id);
  board.title = data.title;
  board.columns = data.columns;
  Db.boards.filter(el => el.id !== id);
  Db.boards.push(board);
  return board;
};

const deleteBoard = async id => {
  const board = await getBoard(id);
  const tasks = await removeTasksFromBoard(board.id);
  tasks.forEach(e => {
    deleteTask(e.id, e.boardId);
  });
  const boardIndex = Db.boards.findIndex(_board => {
    return _board.id === id;
  });
  if (boardIndex >= 0) {
    Db.boards.splice(boardIndex, 1);
    return board;
  }
  return false;
};

const getAllTasks = async id => {
  const tasks = Db.tasks.filter(e => e.boardId === id);
  return tasks;
};

const getTask = async (id, boardId) =>
  Db.tasks.filter(e => e.id === id && e.boardId === boardId)[0];

const createTask = async task => {
  Db.tasks.push(task);
  return task;
};

const changeTask = async (id, boardId, data) => {
  const task = await getTask(id, boardId);
  task.title = data.title;
  task.order = data.order;
  task.description = data.description;
  task.userId = data.userId;
  task.boardId = data.boardId;
  task.columnId = data.columnId;
  Db.tasks.filter(e => e.id !== id);
  Db.tasks.push(task);
  return task;
};

const deleteTask = async (id, boardId) => {
  const task = await getTask(id, boardId);
  const taskIndex = Db.tasks.findIndex(_task => {
    return _task.id === id && _task.boardId === boardId;
  });
  if (taskIndex >= 0) {
    Db.tasks.splice(taskIndex, 1);
    return task;
  }
  return false;
};

const removeTasksFromBoard = async boardId => {
  const tasks = Db.tasks.filter(task => task.boardId === boardId);
  return tasks;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  changeUser,
  deleteUser,
  getByProps,
  getAllBoards,
  getBoard,
  createBoard,
  changeBoard,
  deleteBoard,
  getAllTasks,
  getTask,
  createTask,
  changeTask,
  deleteTask,
  removeTasksFromBoard
};
