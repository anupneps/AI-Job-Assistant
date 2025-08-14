from fastapi import APIRouter, HTTPException, Body
from app.schemas.ai_generate import AIGenerateRequest, AIGenerateResponse
from app.core.generation_utils import TextGenerator

router = APIRouter()

@router.post("/ai-generate", response_model=AIGenerateResponse)
def ai_generate(request: AIGenerateRequest = Body(...)):
    # Build prompt based on task
    if request.task == 'cv_optimization':
        prompt = (
            "You are an expert career coach. Here is a job description:\n"
            f"{request.job_text}\n"
            "And here is a candidate's CV:\n"
            f"{request.cv_text}\n"
        )
        if request.user_message:
            prompt += f"\nUser instruction: {request.user_message}\n"
        prompt += "\nSuggest specific improvements to the CV so it better matches the job description."
    elif request.task == 'cover_letter':
        prompt = (
            "You are an expert career coach. Here is a job description:\n"
            f"{request.job_text}\n"
            "And here is a candidate's CV:\n"
            f"{request.cv_text}\n"
        )
        if request.user_message:
            prompt += f"\nUser instruction: {request.user_message}\n"
        prompt += "\nWrite a personalized cover letter draft for this job application."
    elif request.task == 'interview_prep':
        prompt = (
            "You are an expert interview coach. Here is a job description:\n"
            f"{request.job_text}\n"
            "And here is a candidate's CV:\n"
            f"{request.cv_text}\n"
        )
        if request.user_message:
            prompt += f"\nUser instruction: {request.user_message}\n"
        prompt += "\nGenerate a list of likely interview questions for this job, and provide suggested answers based on the candidate's CV."
    elif request.task == 'skill_enhancement':
        prompt = (
            "You are a career development advisor. Here is a job description:\n"
            f"{request.job_text}\n"
            "And here is a candidate's CV:\n"
            f"{request.cv_text}\n"
        )
        if request.user_message:
            prompt += f"\nUser instruction: {request.user_message}\n"
        prompt += "\nList the most important skills the candidate should learn or improve to be a better fit for this job, and suggest resources for each skill."
    else:
        raise HTTPException(status_code=400, detail="Invalid task type.")

    try:
        generator = TextGenerator(model_name=request.model, openai_api_key=request.openai_api_key)
        result = generator.generate(prompt)
        return AIGenerateResponse(result=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating text: {str(e)}") 