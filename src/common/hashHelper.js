const bcrypt = require('bcrypt');
const { DEF_SALT } = require('./const');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(DEF_SALT);
  console.log(salt);
  const hash = await bcrypt.hash(password, DEF_SALT);
  console.log(hash);
  return hash;
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};
