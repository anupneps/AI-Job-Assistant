from pydantic import BaseModel
from typing import List, Dict, Any

class CVRequest(BaseModel):
    text: str

class CVResponse(BaseModel):
    skills: List[str]
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]] 