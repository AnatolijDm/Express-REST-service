const Db = require('../../common/DataBase');

const getAll = async () => Db.getAllUsers();

const get = async id => {
  const user = Db.getUser(id);

  if (!user) {
    throw new Error(`The user with id: ${id} was not found!`);
  }

  return user;
};

const create = async user => {
  return Db.createUser(user);
};

const change = async (id, data) => {
  return Db.changeUser(id, data);
};

const del = async id => {
  return Db.deleteUser(id);
};

module.exports = { getAll, get, create, change, del };
