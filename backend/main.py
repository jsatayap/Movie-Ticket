"""
main.py - FastAPI application entrypoint
This is the file 'uvicorn main:app' points at. 
 1. creates all database tables on startup
 2. instantiates the FastAPI app
 3. configure cors so next.js frontend is owned to call this api
 4. registers each feaure's routers so their endpoints become part of the app

 main must be run from inside the 'backend/' folder.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from routers import shows, bookings, reports

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MovieTicket API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shows.router)
app.include_router(bookings.router)
app.include_router(reports.router)

@app.get("/")
def health_check():
    return {"status": "MovieTicket API running"}