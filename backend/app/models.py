from sqlalchemy import Column, Integer, String, DateTime, Enum
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
