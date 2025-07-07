import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '7d';

// Helper to sign a JWT for a user
function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username, authType: user.authType }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Register a new user (local auth)
export async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    // Check if username already exists
    const existingUser = await userService.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    // Create user and return JWT
    const user = await userService.createUser(username, password);
    const token = signToken(user);
    console.log("Token :",token); // For debugging
    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}

// Login a user (local auth)
export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  try {
    // Find user and check password
    const user = await userService.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await userService.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Return JWT
    const token = signToken(user);
    console.log("Token :",token); // For debugging
    res.json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}

// Logout (stateless with JWT; client should delete token)
export function logout(req, res) {
  res.json({ message: 'Logged out successfully.' });
}

// Get the current user's profile (protected route)
export async function getProfile(req, res) {
  try {
    // req.user is set by requireLogin middleware
    const user = await userService.getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}

// Google OAuth callback handler
// Handles Google login, finds/creates user, and returns JWT
export async function googleCallback(req, res, next) {
  const passport = await import('passport');
  passport.default.authenticate('google', async (err, profile, info) => {
    if (err || !profile) {
      return res.status(401).json({ message: 'Google authentication failed.' });
    }
    try {
      // Find or create user by Google ID
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          username: profile.emails[0].value,
          googleId: profile.id,
          authType: 'google',
          userProfile: {
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });
        await user.save();
      }
      // Return JWT
      const token = signToken(user);
      // For API: return token as JSON. For web: redirect with token as query param.
      res.json({ message: 'Google login successful.', token });
    } catch (err) {
      res.status(500).json({ message: 'Server error.' });
    }
  })(req, res, next);
}

