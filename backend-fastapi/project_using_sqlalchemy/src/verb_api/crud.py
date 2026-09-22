from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Optional
from src.verb_api import models, schemas

def get_verb(db: Session, verb_id: int):
    return db.query(models.Verb).filter(models.Verb.id == verb_id).first()

def get_verb_by_infinitive(db: Session, infinitive: str):
    return db.query(models.Verb).filter(models.Verb.infinitive == infinitive).first()

def get_verbs(db: Session, skip: int = 0, limit: int = 100, search: Optional[str] = None):
    query = db.query(models.Verb)
    if search:
        query = query.filter(
            models.Verb.infinitive.ilike(f"%{search}%") |
            models.Verb.past_simple.ilike(f"%{search}%") |
            models.Verb.past_participle.ilike(f"%{search}%") |
            models.Verb.present_participle.ilike(f"%{search}%") |
            models.Verb.third_person_singular.ilike(f"%{search}%") |
            models.Verb.spanish_translation.ilike(f"%{search}%")
        )
    return query.offset(skip).limit(limit).all()

def create_verb(db: Session, verb: schemas.VerbCreate):
    db_verb = models.Verb(**verb.model_dump())
    db.add(db_verb)
    db.commit()
    db.refresh(db_verb)
    return db_verb

def update_verb(db: Session, verb_id: int, verb_update: schemas.VerbUpdate):
    db_verb = get_verb(db, verb_id)
    if not db_verb:
        return None
    update_data = verb_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_verb, field, value)
    db.commit()
    db.refresh(db_verb)
    return db_verb

def delete_verb(db: Session, verb_id: int):
    db_verb = get_verb(db, verb_id)
    if not db_verb:
        return False
    db.delete(db_verb)
    db.commit()
    return True

def search_verbs(db: Session, search_term: str):
    sql = text("SELECT * FROM search_verbs(:search_term)")
    result = db.execute(sql, {"search_term": search_term})
    return [
        {
            "id": row[0],
            "infinitive": row[1],
            "past_simple": row[2],
            "past_participle": row[3],
            "present_participle": row[4],
            "third_person_singular": row[5],
            "spanish_translation": row[6],
            "is_regular": row[7],
            "relevance_score": row[8]
        }
        for row in result
    ]

def count_verbs(db: Session, search: Optional[str] = None):
    query = db.query(models.Verb)
    if search:
        query = query.filter(
            models.Verb.infinitive.ilike(f"%{search}%") |
            models.Verb.past_simple.ilike(f"%{search}%") |
            models.Verb.past_participle.ilike(f"%{search}%") |
            models.Verb.present_participle.ilike(f"%{search}%") |
            models.Verb.third_person_singular.ilike(f"%{search}%") |
            models.Verb.spanish_translation.ilike(f"%{search}%")
        )
    return query.count()