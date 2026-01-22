from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable communication between React (Port 5173) and Python (Port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TeacherDiagnostic(BaseModel):
    name: str
    grade_level: str
    subject: str
    assessment_score: int

@app.post("/analyze-needs")
async def analyze_needs(data: TeacherDiagnostic):
    # Theme 2 Logic: Personalize based on score
    is_low = data.assessment_score < 60
    
    roadmap = [
        {
            "phase": "Phase 1: Concept & Theory",
            "task": f"Foundational Pedagogy for {data.subject}" if is_low else "Advanced Cognitive Engagement",
            "why": "Score indicates a need to refresh core theories." if is_low else "Ready for advanced theory application.",
            "link": "https://www.youtube.com/results?search_query=teaching+pedagogy+basics"
        },
        {
            "phase": "Phase 2: Active Implementation",
            "task": "Interactive Classroom Strategies",
            "why": "Bridging theory and delivery through student engagement.",
            "link": "https://www.youtube.com/results?search_query=interactive+teaching+strategies"
        },
        {
            "phase": "Phase 3: Assessment & Impact",
            "task": "Data-Driven Feedback Loops",
            "why": "To ensure learning equity, you must measure student growth effectively.",
            "link": "https://diksha.gov.in/"
        }
    ]

    return {
        "teacher": data.name,
        "xai_insight": f"AI Diagnostic for {data.name}: We detected a performance-pedagogy gap. Based on your score of {data.assessment_score}%, the system has prioritized foundational instructional support tailored for {data.grade_level} learners.",
        "roadmap": roadmap
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)