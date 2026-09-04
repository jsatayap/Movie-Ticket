from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from routers import shows, bookings

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

@app.get("/")
def health_check():
    return {"status": "MovieTicket API running"}