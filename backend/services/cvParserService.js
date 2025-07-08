import pdf from 'pdf-parse/lib/pdf-parse.js';
import fs from 'fs';

// Extract text content from PDF
export async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

// Extract key information from CV text
export function extractCVInfo(text) {
  const info = {
    name: '',
    email: '',
    phone: '',
    skills: [],
    experience: [],
    education: []
  };

  // Extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  if (emails) {
    info.email = emails[0];
  }

  // Extract phone number
  const phoneRegex = /(\+?[\d\s\-\(\)]{10,})/g;
  const phones = text.match(phoneRegex);
  if (phones) {
    info.phone = phones[0].replace(/\s+/g, ' ').trim();
  }

  // Extract skills (common programming languages, tools, etc.)
  const skillKeywords = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'MongoDB', 'SQL',
    'TypeScript', 'Angular', 'Vue.js', 'Express.js', 'Docker', 'AWS',
    'Git', 'HTML', 'CSS', 'PHP', 'C++', 'C#', '.NET', 'Ruby', 'Go',
    'Swift', 'Kotlin', 'Flutter', 'React Native', 'GraphQL', 'REST API'
  ];
  
  info.skills = skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );

  // Extract name (first line that looks like a name)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  for (let line of lines) {
    line = line.trim();
    // Skip lines that are clearly not names
    if (line.length > 50 || line.includes('@') || line.includes('http')) {
      continue;
    }
    // Check if line looks like a name (2-3 words, no special chars)
    if (/^[A-Za-z\s]{2,30}$/.test(line) && line.split(' ').length <= 3) {
      info.name = line;
      break;
    }
  }

  return info;
}

// Update user profile with extracted CV information
export async function updateUserProfileFromCV(userId, cvInfo) {
  const User = (await import('../Models/User.js')).default;
  
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Update userProfile with extracted information
  user.userProfile = {
    ...user.userProfile,
    name: cvInfo.name || user.userProfile.name,
    email: cvInfo.email || user.userProfile.email,
    phone: cvInfo.phone || user.userProfile.phone,
    skills: [...new Set([...user.userProfile.skills, ...cvInfo.skills])] // Merge and deduplicate
  };

  await user.save();
  return user;
}