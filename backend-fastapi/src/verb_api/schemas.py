from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class VerbBase(BaseModel):
    infinitive: str = Field(..., min_length=1, max_length=100)
    past_simple: Optional[str] = Field(None, max_length=100)
    past_participle: Optional[str] = Field(None, max_length=100)
    present_participle: Optional[str] = Field(None, max_length=100)
    third_person_singular: Optional[str] = Field(None, max_length=100)
    is_regular: bool = True
    spanish_translation: Optional[str] = Field(None, max_length=200)

class VerbCreate(VerbBase):
    pass

class VerbUpdate(BaseModel):
    infinitive: Optional[str] = Field(None, min_length=1, max_length=100)
    past_simple: Optional[str] = Field(None, max_length=100)
    past_participle: Optional[str] = Field(None, max_length=100)
    present_participle: Optional[str] = Field(None, max_length=100)
    third_person_singular: Optional[str] = Field(None, max_length=100)
    is_regular: Optional[bool] = None
    spanish_translation: Optional[str] = Field(None, max_length=200)

class VerbResponse(VerbBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class SearchResult(BaseModel):
    id: int
    infinitive: str
    past_simple: Optional[str]
    past_participle: Optional[str]
    present_participle: Optional[str]
    third_person_singular: Optional[str]
    spanish_translation: Optional[str]
    is_regular: bool
    relevance_score: int