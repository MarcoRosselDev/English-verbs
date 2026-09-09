from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from src.verb_api import crud, schemas
from src.verb_api.database import get_db

router = APIRouter(prefix="/api/verbs", tags=["verbs"])

@router.get("/", response_model=List[schemas.VerbResponse])
def get_verbs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return crud.get_verbs(db, skip=skip, limit=limit, search=search)

@router.get("/count", response_model=int)
def count_verbs(search: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.count_verbs(db, search=search)

@router.get("/{verb_id}", response_model=schemas.VerbResponse)
def get_verb(verb_id: int, db: Session = Depends(get_db)):
    verb = crud.get_verb(db, verb_id)
    if not verb:
        raise HTTPException(status_code=404, detail="Verb not found")
    return verb

@router.post("/", response_model=schemas.VerbResponse, status_code=201)
def create_verb(verb: schemas.VerbCreate, db: Session = Depends(get_db)):
    existing = crud.get_verb_by_infinitive(db, verb.infinitive)
    if existing:
        raise HTTPException(status_code=400, detail="Verb already exists")
    return crud.create_verb(db, verb)

@router.put("/{verb_id}", response_model=schemas.VerbResponse)
def update_verb(verb_id: int, verb_update: schemas.VerbUpdate, db: Session = Depends(get_db)):
    verb = crud.update_verb(db, verb_id, verb_update)
    if not verb:
        raise HTTPException(status_code=404, detail="Verb not found")
    return verb

@router.delete("/{verb_id}", status_code=204)
def delete_verb(verb_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_verb(db, verb_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Verb not found")
    return None