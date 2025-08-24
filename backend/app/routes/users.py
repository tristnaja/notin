from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from .. import dependencies
from .. import database, models, schemas, auth
import re

router = APIRouter(prefix="/auth", tags=["Auth"])

# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# def get_current_user(request: Request, db=Depends(get_db)) -> models.User:
#     token = request.cookies.get("access_token")
#     if not token:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Not authenticated",
#         )
#     try:
#         payload = auth.decode_access_token(token)
#         email = payload.get("sub")
#         if not email:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Invalid token",
#             )
#         user = db.query(models.User).filter(models.User.email == email).first()
#         if not user:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="User not found",
#             )
#         return user
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid token",
#         )

@router.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    elif user.password != user.confirmPassword:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
    elif (
        len(user.password) < 8
        or not re.search(r"[A-Z]", user.password)
        or not re.search(r"[a-z]", user.password)
        or not re.search(r"\d", user.password)
        or not re.search(r"[@$!%*?&.]", user.password)
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character (@$!%*?&.)"
        )

    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password, username=user.username)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(dependencies.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials.")
    token = auth.create_access_token(data={"sub": db_user.email})
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="access_token", 
        value=token, 
        httponly=True, 
        secure=False,  #change to true when in production
        samesite="Lax"
        )
    return response

@router.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie("access_token")
    return response

@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user=Depends(dependencies.get_current_user)):
    return {"username": current_user.username, "email": current_user.email}