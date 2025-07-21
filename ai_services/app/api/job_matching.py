from fastapi import APIRouter, HTTPException
from app.schemas.job_matching import JobMatchRequest, JobMatchResponse, JobMatchResult
from app.core.job_matching_utils import match_jobs

router = APIRouter()

@router.get("/job-matching/health")
def job_matching_health():
    return {"message": "Job Matching API is ready!"}

@router.post("/job-matching", response_model=JobMatchResponse)
def match_jobs_endpoint(request: JobMatchRequest):
    """
    Match a CV to a list of jobs using semantic similarity.
    """
    if not request.cv_text.strip():
        raise HTTPException(status_code=400, detail="CV text cannot be empty")
    
    if not request.jobs:
        raise HTTPException(status_code=400, detail="Job list cannot be empty")
    
    try:
        matches_dict = match_jobs(request.cv_text, request.jobs)
        # Convert dictionaries to JobMatchResult objects
        matches = [JobMatchResult(**match) for match in matches_dict]
        return JobMatchResponse(matches=matches)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error matching jobs: {str(e)}") 