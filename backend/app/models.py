from sqlalchemy import TEXT, Column, ForeignKey, Integer, String, DateTime, Enum, func
from sqlalchemy.orm import relationship
import enum
from datetime import datetime, timezone
from .database import Base

class AuthProvider(enum.Enum):
    LOCAL = "local"
    GOOGLE = "google"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(100))
    hashed_password = Column(String(100), nullable=True)
    auth_provider = Column(Enum(AuthProvider), default=AuthProvider.LOCAL, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    notes = relationship("Note", back_populates="owner")

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(TEXT, nullable=False)
    source_url = Column(String(255), nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    owner = relationship("User", back_populates="notes")