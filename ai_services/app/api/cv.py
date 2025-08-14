from fastapi import APIRouter, HTTPException, Body
from app.schemas.cv import CVRequest, CVResponse, SkillGapRequest, SkillGapResponse, CVOptimizationRequest, CVOptimizationResponse
from app.core.nlp_utils import nlp, extract_skills, extract_experience, extract_education
from app.core.generation_utils import TextGenerator
from typing import Optional
from pydantic import BaseModel
from app.schemas.ai_generate import AIGenerateRequest, AIGenerateResponse

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

@router.post("/skill-gap", response_model=SkillGapResponse)
def skill_gap_analysis(request: SkillGapRequest):
    if nlp is None:
        raise HTTPException(status_code=500, detail="spaCy model not loaded")
    if not request.cv_text.strip() or not request.job_text.strip():
        raise HTTPException(status_code=400, detail="CV and job text cannot be empty")
    try:
        cv_doc = nlp(request.cv_text)
        job_doc = nlp(request.job_text)
        cv_skills = set(extract_skills(cv_doc))
        job_skills = set(extract_skills(job_doc))
        matched_skills = list(cv_skills & job_skills)
        missing_skills = list(job_skills - cv_skills)
        return SkillGapResponse(matched_skills=matched_skills, missing_skills=missing_skills)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing skill gap: {str(e)}") 