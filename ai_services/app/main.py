from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import spacy
from typing import List, Dict, Any

# Load spaCy model (do this once when the app starts)
try:
    nlp = spacy.load("en_core_web_sm")
    print("✅ spaCy model loaded successfully!")
except OSError:
    print("❌ spaCy model not found. Please run: python -m spacy download en_core_web_sm")
    nlp = None

app = FastAPI()

# Request/Response models
class CVRequest(BaseModel):
    text: str

class CVResponse(BaseModel):
    skills: List[str]
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]]

@app.get("/")
def read_root():
    return {"message": "AI Service is running!"}

@app.post("/parse-cv", response_model=CVResponse)
def parse_cv(request: CVRequest):
    """
    Parse CV text and extract skills, experience, and education
    """
    if nlp is None:
        raise HTTPException(status_code=500, detail="spaCy model not loaded")
    
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="CV text cannot be empty")
    
    try:
        # Process the CV text with spaCy
        doc = nlp(request.text)
        
        # Extract information
        skills = extract_skills(doc)
        experience = extract_experience(doc)
        education = extract_education(doc)
        
        return CVResponse(
            skills=skills,
            experience=experience,
            education=education
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing CV: {str(e)}")

def extract_skills(doc) -> List[str]:
    """Extract skills from CV text"""
    skills = []
    
    # Common technical skills to look for
    technical_skills = [
        "python", "javascript", "java", "react", "node.js", "sql", "mongodb",
        "aws", "docker", "kubernetes", "git", "html", "css", "typescript",
        "angular", "vue", "django", "flask", "express", "postgresql", "mysql"
    ]
    
    # Look for skills in the text
    text_lower = doc.text.lower()
    for skill in technical_skills:
        if skill in text_lower:
            skills.append(skill.title())
    
    return list(set(skills))  # Remove duplicates

def extract_experience(doc) -> List[Dict[str, Any]]:
    """Extract work experience from CV text"""
    experience = []
    
    # Look for organizations (companies)
    for ent in doc.ents:
        if ent.label_ == "ORG":
            # Simple extraction - in a real app, you'd use more sophisticated parsing
            experience.append({
                "company": ent.text,
                "position": "Extracted from CV",  # Placeholder
                "duration": "To be extracted"     # Placeholder
            })
    
    return experience[:5]  # Limit to 5 most recent

def extract_education(doc) -> List[Dict[str, Any]]:
    """Extract education from CV text"""
    education = []
    
    # Look for organizations that might be universities
    for ent in doc.ents:
        if ent.label_ == "ORG":
            # Simple check for education keywords
            text_lower = ent.text.lower()
            if any(word in text_lower for word in ["university", "college", "institute", "school"]):
                education.append({
                    "institution": ent.text,
                    "degree": "Extracted from CV",  # Placeholder
                    "year": "To be extracted"       # Placeholder
                })
    
    return education[:3]  # Limit to 3 most recent 