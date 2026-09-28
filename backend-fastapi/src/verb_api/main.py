from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from verb_api.routes import verbs, search
from verb_api.database import pool
from dotenv import load_dotenv

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verifica que el pool esté abierto al iniciar
    pool.open()
    yield
    # Cierra el pool al apagar el servidor
    pool.close()


app = FastAPI(
    title="Verb Conjugator API",
    description="API para buscar y gestionar verbos en inglés",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://illustrious-meringue-852c92.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verbs.router)
app.include_router(search.router)


@app.get("/")
def root():
    return {
        "message": "Verb Conjugator API", 
        "version": "1.0.0", 
        "docs": "/docs"
        }


@app.get("/health")
def health():
    return {"status": "healthy"}