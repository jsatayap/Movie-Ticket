"""
routers/shows.py — read-only endpoint for browsing showtimes.
 1. powers frontend's homepage (app/page.tsx), which lists every showtime with its movie details.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/shows", tags=["shows"])

@router.get("/", response_model=list[schemas.ShowtimeOut])
def list_shows(db: Session = Depends(get_db)):
    return db.query(models.Showtime).all()

# New: fetch a single showtime by ID — used by the booking page so it can
# display which movie/hall/time the user is booking for
@router.get("/{show_id}", response_model=schemas.ShowtimeOut)
def get_show(show_id: int, db: Session = Depends(get_db)):
    showtime = db.query(models.Showtime).filter(models.Showtime.id == show_id).first()
    if not showtime:
        raise HTTPException(status_code=404, detail="Showtime not found")
    return showtime