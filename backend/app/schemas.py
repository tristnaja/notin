from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, HttpUrl

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    confirmPassword: str
    username: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    email: EmailStr
    username: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str

    class Config:
        from_attributes = True

class NoteBase(BaseModel):
    title: str
    source_url: Optional[HttpUrl] = None

class NoteCreate(NoteBase):
    content: str

class NoteResponse(NoteBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

class Note(NoteBase):
    id: int
    content: str
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True