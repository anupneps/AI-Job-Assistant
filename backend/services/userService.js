import User from '../Models/User.js';
import bcrypt from 'bcrypt';

export async function findUserByUsername(username) {
  return User.findOne({ username });
}

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return user.save();
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export async function getUserById(id) {
  return User.findById(id).select('-password');
} 