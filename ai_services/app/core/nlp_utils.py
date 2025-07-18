import spacy
from typing import List, Dict, Any

# Load spaCy model (do this once when the app starts)
try:
    nlp = spacy.load("en_core_web_sm")
    print("✅ spaCy model loaded successfully!")
except OSError:
    print("❌ spaCy model not found. Please run: python -m spacy download en_core_web_sm")
    nlp = None

def extract_skills(doc) -> List[str]:
    """Extract skills from CV text"""
    skills = []
    technical_skills = [
        "python", "javascript", "java", "react", "node.js", "sql", "mongodb",
        "aws", "docker", "kubernetes", "git", "html", "css", "typescript",
        "angular", "vue", "django", "flask", "express", "postgresql", "mysql"
    ]
    text_lower = doc.text.lower()
    for skill in technical_skills:
        if skill in text_lower:
            skills.append(skill.title())
    return list(set(skills))

def extract_experience(doc) -> List[Dict[str, Any]]:
    """Extract work experience from CV text"""
    experience = []
    for ent in doc.ents:
        if ent.label_ == "ORG":
            experience.append({
                "company": ent.text,
                "position": "Extracted from CV",  # Placeholder
                "duration": "To be extracted"     # Placeholder
            })
    return experience[:5]

def extract_education(doc) -> List[Dict[str, Any]]:
    """Extract education from CV text"""
    education = []
    for ent in doc.ents:
        if ent.label_ == "ORG":
            text_lower = ent.text.lower()
            if any(word in text_lower for word in ["university", "college", "institute", "school"]):
                education.append({
                    "institution": ent.text,
                    "degree": "Extracted from CV",  # Placeholder
                    "year": "To be extracted"       # Placeholder
                })
    return education[:3] 