import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from . import models, database
from .routes import users, google, notes

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(google.router)
app.include_router(notes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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