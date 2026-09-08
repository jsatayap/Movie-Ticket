"""
database.py - database connection and session setup
 1. reads the DATABASE_URL from backend/.env, creates the SQLAlchemy engine
 2. 'Base': declarative base every model in models.py inherits from
 3. 'SessionLocal': session factory used to create new DB sessions
 4. 'get_db()': FastAPI dependency, yields session per-request and quarantees close
"""

import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

env_path = Path(__file__).parent / ".env"
print(f"Looking for .env at: {env_path}")
print(f"File exists: {env_path.exists()}")

load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"DATABASE_URL loaded as: {DATABASE_URL}")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found — check backend/.env exists and has the correct content")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()