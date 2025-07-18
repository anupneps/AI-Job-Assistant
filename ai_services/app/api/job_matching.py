from fastapi import APIRouter

router = APIRouter()

@router.get("/job-matching/health")
def job_matching_health():
    return {"message": "Job Matching API is ready!"} 