# AI Services Microservice

This microservice is a core component of the AI-Job-Assistant portfolio project, designed to provide advanced Natural Language Processing (NLP) and AI-powered features for job application automation. Built with FastAPI and Python, it exposes endpoints for CV parsing, skill extraction, job matching, and more, leveraging open-source models like spaCy and Sentence Transformers for cost-effective, scalable AI. 

> **Note:** This project is being developed collaboratively with the help of Cursor AI Copilot, showcasing modern AI-assisted software engineering practices.

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
- `/parse-cv` : Parse CV text and extract structured information (skills, experience, education)
- `/job-matching/health` : Health check for job matching service
- `/job-matching` : Match CV to job descriptions using semantic similarity

More endpoints will be added as you build AI features! 