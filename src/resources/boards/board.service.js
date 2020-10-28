const boardRepo = require('./board.memoryDB.repository');

const getAll = async () => await boardRepo.getAll();
const get = async id => await boardRepo.get(id);
const change = async (id, board) => await boardRepo.change(id, board);
const del = async id => await boardRepo.del(id);
const create = async board => await boardRepo.create(board);

module.exports = {
  getAll,
  get,
  change,
  del,
  create
};
