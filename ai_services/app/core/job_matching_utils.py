from sentence_transformers import SentenceTransformer, util
import numpy as np
from typing import List, Dict, Any

# Load the sentence transformer model once at startup
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✅ SentenceTransformer model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading SentenceTransformer model: {e}")
    model = None

def match_jobs(cv_text: str, jobs: List[Dict[str, str]], top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Match a CV to a list of jobs using semantic similarity.
    Args:
        cv_text (str): The candidate's CV text.
        jobs (List[Dict[str, str]]): List of job objects with 'id' and 'description' keys.
        top_k (int): Number of top matches to return.
    Returns:
        List[Dict[str, Any]]: Ranked list of job matches with scores and job IDs.
    """
    if model is None:
        raise RuntimeError("SentenceTransformer model not loaded")
    if not cv_text.strip() or not jobs:
        return []

    # Extract job descriptions for embedding
    job_descriptions = [job['description'] for job in jobs]

    # Embed the CV and job descriptions
    cv_embedding = model.encode(cv_text, convert_to_tensor=True)
    job_embeddings = model.encode(job_descriptions, convert_to_tensor=True)

    # Compute cosine similarities
    similarities = util.cos_sim(cv_embedding, job_embeddings)[0].cpu().numpy()

    # Rank jobs by similarity
    ranked_indices = np.argsort(similarities)[::-1][:top_k]
    matches = []
    for idx in ranked_indices:
        matches.append({
            "job_id": jobs[idx]['id'],
            "job": job_descriptions[idx],
            "score": float(similarities[idx]),
            "matched_skills": []  # Placeholder for future skill matching
        })
    return matches 