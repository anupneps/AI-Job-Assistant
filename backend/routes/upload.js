import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { uploadMiddleware, uploadCV } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload-resume
router.post('/upload-resume', requireLogin, uploadMiddleware, uploadCV);

export default router; 