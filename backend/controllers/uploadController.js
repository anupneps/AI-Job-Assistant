import multer from 'multer';
import * as uploadService from '../services/uploadService.js';
import * as cvParserService from '../services/cvParserService.js';

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDir = uploadService.createUserUploadDir(req.user.id);
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'resume.pdf');
  }
});

// Multer file filter for PDF only
function fileFilter(req, file, cb) {
  console.log('Multer fileFilter:', file.mimetype, file.originalname);
  try {
    uploadService.validateFileType(file);
    cb(null, true);
  } catch (error) {
    console.error('Multer fileFilter error:', error.message);
    cb(error, false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: uploadService.FILE_SIZE_LIMIT }
});

// Middleware for file upload
export const uploadMiddleware = upload.single('resume');

// Handle CV upload with parsing
export async function uploadCV(req, res) {
  console.log('uploadCV called, req.file:', req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Step 1: Save file and update user's CV path
    const user = await uploadService.updateUserCVPath(req.user.id, req.file.path);
    
    // Step 2: Extract information from CV
    const cvText = await cvParserService.extractTextFromPDF(req.file.path);
    const cvInfo = cvParserService.extractCVInfo(cvText);
    
    // Step 3: Update user profile with extracted information
    const updatedUser = await cvParserService.updateUserProfileFromCV(req.user.id, cvInfo);
    
    res.json({ 
      message: 'Resume uploaded and processed successfully.', 
      filePath: req.file.path,
      extractedInfo: cvInfo,
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        cvFilePath: updatedUser.cvFilePath,
        userProfile: updatedUser.userProfile
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed.', error: err.message });
  }
} 