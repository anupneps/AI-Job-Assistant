from pydantic import BaseModel
from typing import List, Dict, Any

class JobMatchRequest(BaseModel):
    cv_text: str
    job_descriptions: List[str]

class JobMatchResponse(BaseModel):
    matches: List[Dict[str, Any]] 