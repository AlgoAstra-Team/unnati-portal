from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Unnati Portal API (Samadhaan-Setu)",
    description="Backend API engine for grassroots problem ingestion, AI triage, and NEP/CSR lifecycle management.",
    version="1.0.0"
)

# CORS configuration for Next.js client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "unnati-portal-api",
        "version": "1.0.0"
    }

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to Unnati Portal (Samadhaan-Setu) API"}
