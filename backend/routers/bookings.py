"""
routers/bookings.py — create and look up bookings.
 1. a showtime can never be booked past its total_seats capacity. 
 2. powers frontend's booking form (app/book/[showId]/page.tsx) and ticket page (app/ticket/[bookingId]/page.tsx).
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("/", response_model=schemas.BookingOut)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    # Look up sthe showtime being booked - if it doesn't exist, fail fast with 404
    showtime = db.query(models.Showtime).filter(models.Showtime.id == booking.showtime_id).first()
    if not showtime:
        raise HTTPException(status_code=404, detail="Showtime not found")

    # Get every existing booking for this showtime to total up seats already taken.
    # Recalculate on every request rather than storing a running total: prevent out of sync if booking is edited/deleted later.
    existing_bookings = db.query(models.Booking).filter(
        models.Booking.showtime_id == booking.showtime_id
    ).all()
    seats_taken = sum(b.num_persons for b in existing_bookings)

    # Reject booking if it exceeds hall's capacity.
    if seats_taken + booking.num_persons > showtime.total_seats:
        seats_remaining = showtime.total_seats - seats_taken
        raise HTTPException(
            status_code=400,
            detail=f"Not enough seats available. Only {seats_remaining} seats remaining."
        )

    # Create and save booking. db.refresh() reloads the object with auto-gen fields (id, created_at).
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
    # Lookup by primary key. .first() returns None if nothing matches and return 404 error.
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking