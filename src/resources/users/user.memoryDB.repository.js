const User = require('../users/user.model');

const getAll = async () => User.find({});
// throw new Error();

const get = async id => {
  // throw new Error();
  const user = User.findOne({ _id: id });

  if (!user) {
    throw new Error(`The user with id: ${id} was not found!`);
  }

  return user;
};

const create = async user => {
  return User.create(user);
  /* const userCr =  User.create(user);
  Db.users.push(userCr);
  return userCr;*/
};

const change = async (id, data) => {
  // throw new Error();
  return User.update({ _id: id }, data);
};

const del = async id => {
  // throw new Error();
  /* users.filter(e => e.id !== id);
  /*Db.tasks.forEach(e => {
    e.userId = null;
  });*/
  return User.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, change, del };
