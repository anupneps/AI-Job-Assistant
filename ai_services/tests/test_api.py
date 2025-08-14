from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_parse_cv_valid():
    response = client.post("/parse-cv", json={"text": "Python developer with SQL experience."})
    assert response.status_code == 200
    data = response.json()
    assert "skills" in data
    assert "experience" in data
    assert "education" in data

def test_parse_cv_empty():
    response = client.post("/parse-cv", json={"text": ""})
    assert response.status_code == 400

def test_job_matching_valid():
    jobs = [
        {"id": "1", "description": "Python developer needed."},
        {"id": "2", "description": "JavaScript engineer wanted."}
    ]
    response = client.post("/job-matching", json={"cv_text": "Experienced Python developer.", "jobs": jobs})
    assert response.status_code == 200
    data = response.json()
    assert "matches" in data
    assert isinstance(data["matches"], list)

def test_job_matching_empty_cv():
    jobs = [{"id": "1", "description": "Python developer needed."}]
    response = client.post("/job-matching", json={"cv_text": "", "jobs": jobs})
    assert response.status_code == 400

def test_skill_gap_valid():
    response = client.post("/skill-gap", json={"cv_text": "Python, SQL", "job_text": "Looking for Python and Java skills."})
    assert response.status_code == 200
    data = response.json()
    assert "matched_skills" in data
    assert "missing_skills" in data

def test_ai_generate_cv_optimization():
    response = client.post("/ai-generate", json={
        "task": "cv_optimization",
        "cv_text": "Python developer.",
        "job_text": "Looking for a Python developer.",
        "model": "gpt-2"
    })
    assert response.status_code == 200
    data = response.json()
    assert "result" in data

def test_ai_generate_invalid_task():
    response = client.post("/ai-generate", json={
        "task": "invalid_task",
        "cv_text": "Python developer.",
        "job_text": "Looking for a Python developer.",
        "model": "gpt-2"
    })
    assert response.status_code == 400 