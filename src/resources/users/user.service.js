const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const change = (id, data) => usersRepo.change(id, data);

const del = id => usersRepo.del(id);

module.exports = { getAll, get, create, change, del };
