const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const change = (id, data) => boardsRepo.change(id, data);

const del = id => boardsRepo.del(id);

module.exports = { getAll, get, create, change, del };
