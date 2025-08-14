from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class CVRequest(BaseModel):
    text: str

class CVResponse(BaseModel):
    skills: List[str]
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]] 

class SkillGapRequest(BaseModel):
    cv_text: str
    job_text: str

class SkillGapResponse(BaseModel):
    matched_skills: List[str]
    missing_skills: List[str] 

class CVOptimizationRequest(BaseModel):
    text: str

class CVOptimizationResponse(BaseModel):
    suggestions: List[str] 

