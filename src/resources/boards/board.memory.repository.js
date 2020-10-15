const Db = require('../../common/DataBase');

const getAll = async () => {
  const boards = await Db.getAllBoards();
  if (!boards.length) {
    throw new Error('The boards with was not found!');
  }
  return boards;
};

const get = async id => {
  const board = await Db.getBoard(id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found!`);
  }

  return board;
};

const create = async board => {
  return Db.createBoard(board);
};

const change = async (id, data) => {
  return Db.changeBoard(id, data);
};

const del = async id => {
  const board = await Db.deleteBoard(id);
  await Db.removeTasksFromBoard(board.id);
  if (!board) {
    throw new Error(`The board with id: ${id} was not found`);
  }
  return board;
};

module.exports = { getAll, get, create, change, del };
