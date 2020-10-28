const Board = require('../boards/board.model');

const getAll = async () => Board.find({});
// throw new Error();

const get = async id => {
  // throw new Error();
  const board = Board.findOne({ _id: id });

  if (!board) {
    throw new Error(`The board with id: ${id} was not found!`);
  }

  return board;
};

const create = async board => Board.create(board);

const change = async (id, data) => {
  // throw new Error();
  return Board.update({ _id: id }, data);
};

const del = async id => Board.deleteOne({ _id: id });

module.exports = { getAll, get, create, change, del };
