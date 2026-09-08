"""
routers/reports.py — aggregate booking stats.
 1. powers frontend's report page (app/report/page.tsx)
 2. overall totals plus a per-showtime breakdown of how full each screening is.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
import models
import schemas

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/", response_model=schemas.ReportOut)
def generate_report(db: Session = Depends(get_db)):
    showtimes = db.query(models.Showtime).all()

    shows_report = []
    total_bookings = 0
    total_persons = 0

    for st in showtimes:
        bookings = db.query(models.Booking).filter(models.Booking.showtime_id == st.id).all()
        seats_booked = sum(b.num_persons for b in bookings)
        total_bookings += len(bookings)
        total_persons += seats_booked

        shows_report.append(schemas.ShowReportItem(
            movie_title=st.movie.title,
            show_time=st.show_time,
            hall=st.hall,
            total_seats=st.total_seats,
            seats_booked=seats_booked,
            num_bookings=len(bookings),
        ))

    return schemas.ReportOut(
        total_bookings=total_bookings,
        total_persons=total_persons,
        shows=shows_report,
    )