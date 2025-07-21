from pydantic import BaseModel
from typing import List, Dict, Any

class JobMatchRequest(BaseModel):
    cv_text: str
    jobs: List[Dict[str, str]]  # List of job objects with 'id' and 'description'

class JobMatchResult(BaseModel):
    job_id: str
    job: str
    score: float
    matched_skills: List[str] = []

class JobMatchResponse(BaseModel):
    matches: List[JobMatchResult] 