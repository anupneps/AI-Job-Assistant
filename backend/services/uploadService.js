import fs from 'fs';
import path from 'path';
import User from '../Models/User.js';

// Delete old CV file if it exists
export async function deleteOldCV(userId, oldFilePath) {
  if (oldFilePath && fs.existsSync(oldFilePath)) {
    try {
      fs.unlinkSync(oldFilePath);
    } catch (error) {
      console.error('Error deleting old CV file:', error);
    }
  }
}

// Update user's CV file path in database
export async function updateUserCVPath(userId, newFilePath) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Delete old file if path is different
  if (user.cvFilePath && user.cvFilePath !== newFilePath) {
    await deleteOldCV(userId, user.cvFilePath);
  }
  
  user.cvFilePath = newFilePath;
  await user.save();
  return user;
}

// Create user upload directory
export function createUserUploadDir(userId) {
  const userDir = path.join('uploads', userId);
  fs.mkdirSync(userDir, { recursive: true });
  return userDir;
}

// Validate file type (PDF only)
export function validateFileType(file) {
  if (file.mimetype !== 'application/pdf') {
    throw new Error('Only PDF files are allowed!');
  }
  return true;
}

// Get file size limit (5MB)
export const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB 