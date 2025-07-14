# AI Services Microservice

This is a FastAPI-based Python microservice for running AI/NLP tasks (e.g., CV parsing, job matching) for the JobLens AI project.

## How to Run

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the service:
   ```bash
   uvicorn app.main:app --reload
   ```

The service will be available at http://localhost:8000

## Endpoints
- `/` : Health check (returns a simple message)

More endpoints will be added as you build AI features! 