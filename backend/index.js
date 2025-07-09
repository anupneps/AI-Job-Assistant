import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './Models/User.js';
import connectDB from './Data/mongo.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // if you use cookies or need credentials
}));

// Passport config
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
},
  function(accessToken, refreshToken, profile, done) {
    // Pass the Google profile to the callback
    return done(null, profile);
  }
));

app.use(passport.initialize());

// Skip body parsers for multipart/form-data (file uploads)
app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    console.log('multipart/form-data');
    return next();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

connectDB();

app.use('/api', authRoutes);
app.use('/api', uploadRoutes);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  if (err) {
    res.status(400).json({ message: err.message || 'Bad Request' });
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 