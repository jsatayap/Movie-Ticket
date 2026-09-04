from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("/", response_model=schemas.BookingOut)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    showtime = db.query(models.Showtime).filter(models.Showtime.id == booking.showtime_id).first()
    if not showtime:
        raise HTTPException(status_code=404, detail="Showtime not found")

    new_booking = models.Booking(
        showtime_id=booking.showtime_id,
        customer_name=booking.customer_name,
        num_persons=booking.num_persons,
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@router.get("/{booking_id}", response_model=schemas.BookingOut)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking