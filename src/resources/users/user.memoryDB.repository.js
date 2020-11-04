const User = require('../users/user.model');

const getAll = async () => {
  (await User.find({})).exec();
};
// throw new Error();

const get = async id => {
  // throw new Error();
  const user = (await User.findOne({ _id: id })).exec();

  if (!user) {
    throw new Error(`The user with id: ${id} was not found!`);
  }

  return user;
};

const create = async user => {
  return (await User.create(user)).exec();
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
