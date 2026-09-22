from fastapi import APIRouter, Depends, Query
from psycopg import Connection
from typing import List
from verb_api import crud, schemas
from verb_api.database import get_db

router = APIRouter(prefix="/api/search", tags=["search"])


@router.get("/", response_model=List[schemas.SearchResult])
def search_verbs(
    q: str = Query(..., min_length=2),
    db: Connection = Depends(get_db),
):
    return crud.search_verbs(db, q)


@router.get("/suggestions", response_model=List[str])
def get_suggestions(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=50),
    db: Connection = Depends(get_db),
):
    results = crud.search_verbs(db, q)
    return [r["infinitive"] for r in results[:limit]]