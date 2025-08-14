from fastapi import FastAPI
from app.api.cv import router as cv_router
from app.api.job_matching import router as job_matching_router
from app.api.ai_generate import router as ai_generate_router

app = FastAPI()

app.include_router(cv_router)
app.include_router(job_matching_router)
app.include_router(ai_generate_router)

@app.get("/")
def read_root():
    return {"message": "AI Service is running!"} 