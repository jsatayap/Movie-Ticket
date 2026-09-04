from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/shows", tags=["shows"])

@router.get("/", response_model=list[schemas.ShowtimeOut])
def list_shows(db: Session = Depends(get_db)):
    return db.query(models.Showtime).all()