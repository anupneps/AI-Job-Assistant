import User from '../Models/User.js';
import bcrypt from 'bcrypt';

export async function findUserByUsername(username) {
  return User.findOne({ username });
}

export async function findUserByEmail(email) {
  return User.findOne({ email });
}

export async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, userProfile: { email } });
  return user.save();
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export async function getUserById(id) {
  return User.findById(id).select('-password');
} 

export async function getAllUsers() {
  return await User.find().select('-password');
}