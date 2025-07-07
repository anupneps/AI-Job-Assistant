import express from 'express';
import * as authController from '../controllers/authController.js';
import passport from 'passport';
import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', requireLogin, authController.getProfile);

// Google OAuth endpoints
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', authController.googleCallback);

export default router; 