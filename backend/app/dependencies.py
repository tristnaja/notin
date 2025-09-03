from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from . import database, auth, models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_db():
    """Gets a database session."""
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    """Gets the current user from the access token."""
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.decode_access_token(token)
        email = payload.get("sub")
        if email is None:
            raise credential_exception

        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            raise credential_exception

        return user

    except JWTError:
        raise credential_exception
