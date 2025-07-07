const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', requireLogin, authController.getProfile);

// Google OAuth endpoints
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', authController.googleCallback);

module.exports = router; 