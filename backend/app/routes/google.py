import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.requests import Request
from fastapi.responses import RedirectResponse, JSONResponse
from .. import models, auth
from ..dependencies import get_db
from ..google_auth import oauth

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

router = APIRouter(prefix="/auth/google", tags=["Google Auth"])

@router.get("/login")
async def login_via_google(request: Request):
    """Redirects the user to Google for authentication."""
    redirect_uri = request.url_for("google_auth_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/callback", name="google_auth_callback")
async def google_auth_callback(request: Request, db: Session = Depends(get_db)):
    """Callback endpoint for Google OAuth."""
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to authorize with Google")
    
    user_info = token.get('userinfo')
    if not user_info:
        raise HTTPException(status_code=400, detail="Failed to retrieve user info from Google")
    
    email = user_info.get('email')
    username = user_info.get('name')

    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        new_user = models.User(email=email, username=username, auth_provider=models.AuthProvider.GOOGLE)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        db_user = new_user
    
    access_token = auth.create_access_token(data={"sub": db_user.email})

    response = RedirectResponse(url=f"{FRONTEND_URL}/home")
    response.set_cookie(
        key="access_token", 
        value=access_token,
        httponly=True,
        secure=True,  # Change to True in production
        samesite="none"
    )
    return response
