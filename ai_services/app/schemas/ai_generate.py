from pydantic import BaseModel
from typing import Optional

class AIGenerateRequest(BaseModel):
    task: str  # 'cv_optimization' or 'cover_letter'
    cv_text: str
    job_text: Optional[str] = None
    user_message: Optional[str] = None
    model: str = 'gpt-2'  # or 'openai'
    openai_api_key: Optional[str] = None

class AIGenerateResponse(BaseModel):
    result: str 