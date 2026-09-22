from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from src.verb_api.database import Base

class Verb(Base):
    __tablename__ = "verbs"

    id = Column(Integer, primary_key=True, index=True)
    infinitive = Column(String(100), nullable=False, unique=True, index=True)
    past_simple = Column(String(100))
    past_participle = Column(String(100))
    present_participle = Column(String(100))
    third_person_singular = Column(String(100))
    is_regular = Column(Boolean, default=True)
    spanish_translation = Column(String(200))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())