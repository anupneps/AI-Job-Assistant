const User = require('../Models/User');
const bcrypt = require('bcrypt');

async function findUserByUsername(username) {
  return User.findOne({ username });
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return user.save();
}

async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

async function getUserById(id) {
  return User.findById(id).select('-password');
}

module.exports = {
  findUserByUsername,
  createUser,
  comparePassword,
  getUserById,
}; 