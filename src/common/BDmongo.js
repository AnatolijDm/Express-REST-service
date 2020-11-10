const mongoose = require('mongoose');
const mongoDBaccess = require('./config');
const userRepo = require('../resources/users/user.memoryDB.repository');
const { DEFAULT_USER_ADMIN } = require('./const');

const connectToDBmongo = cb => {
  mongoose.connect(mongoDBaccess.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('you are connected!');
    db.dropDatabase();
    userRepo.saveAdminUser(DEFAULT_USER_ADMIN);
    cb();
  });
};

module.exports = { connectToDBmongo };
