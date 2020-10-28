const usersRepo = require('./user.memoryDB.repository');

const getAll = async () => await usersRepo.getAll();
const get = async id => await usersRepo.get(id);
const change = async (id, user) => await usersRepo.change(id, user);
const del = async id => await usersRepo.del(id);
const create = async user => await usersRepo.create(user);

module.exports = {
  getAll,
  get,
  change,
  del,
  create
};
