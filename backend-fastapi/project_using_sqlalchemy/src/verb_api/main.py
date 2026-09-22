from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.verb_api.routes import verbs, search
from src.verb_api.database import engine, Base
import os
from dotenv import load_dotenv

load_dotenv()

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Verb Conjugator API",
    description="API para buscar y gestionar verbos en inglés",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(verbs.router)
app.include_router(search.router)

@app.get("/")
def root():
    return {
        "message": "Verb Conjugator API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}