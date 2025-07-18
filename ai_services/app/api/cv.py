from fastapi import APIRouter, HTTPException
from app.schemas.cv import CVRequest, CVResponse
from app.core.nlp_utils import nlp, extract_skills, extract_experience, extract_education

router = APIRouter()

@router.post("/parse-cv", response_model=CVResponse)
def parse_cv(request: CVRequest):
    if nlp is None:
        raise HTTPException(status_code=500, detail="spaCy model not loaded")
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="CV text cannot be empty")
    try:
        doc = nlp(request.text)
        skills = extract_skills(doc)
        experience = extract_experience(doc)
        education = extract_education(doc)
        return CVResponse(skills=skills, experience=experience, education=education)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing CV: {str(e)}") 