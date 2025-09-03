import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
from . import models, database
from .routes import users, google, notes

load_dotenv()

origins = [
    "http://localhost:3000"
]

FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL and FRONTEND_URL not in origins:
    origins.append(FRONTEND_URL)

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")

app.include_router(users.router)
app.include_router(google.router)
app.include_router(notes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET"),
)

@app.get("/")
def root():
    return {"message": "Welcome to the NOTIN API!"}