const mongoose = require('mongoose');
const mongoDBaccess = require('./config');
const User = require('../resources/users/user.model');

const users = [new User()];

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
    users.forEach(user => user.save());
    cb();
  });
};

module.exports = { connectToDBmongo };
