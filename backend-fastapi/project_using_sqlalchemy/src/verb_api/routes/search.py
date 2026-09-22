from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from src.verb_api import crud, schemas
from src.verb_api.database import get_db

router = APIRouter(prefix="/api/search", tags=["search"])

@router.get("/", response_model=List[schemas.SearchResult])
def search_verbs(q: str = Query(..., min_length=2, max_length=100), db: Session = Depends(get_db)):
    return crud.search_verbs(db, q)

@router.get("/suggestions", response_model=List[str])
def get_suggestions(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    results = crud.search_verbs(db, q)
    suggestions = [r["infinitive"] for r in results[:limit]]
    return suggestions