const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cvFilePath: {
    type: String,
    default: null,
  },
  userProfile: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    skills: [{ type: String }],
    experience: [
      {
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      }
    ],
    education: [
      {
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
        description: String,
      }
    ],
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    // Add more fields as needed
  },
});

module.exports = mongoose.model('User', userSchema); 