from pydantic import BaseModel
from datetime import datetime

class MovieOut(BaseModel):
    id: int
    title: str
    duration_min: int
    class Config:
        from_attributes = True

class ShowtimeOut(BaseModel):
    id: int
    show_time: datetime
    hall: str
    total_seats: int
    movie: MovieOut
    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    showtime_id: int
    customer_name: str
    num_persons: int

class BookingOut(BaseModel):
    id: int
    showtime_id: int
    customer_name: str
    num_persons: int
    status: str
    class Config:
        from_attributes = True

class ShowReportItem(BaseModel):
    movie_title: str
    show_time: datetime
    hall: str
    total_seats: int
    seats_booked: int
    num_bookings: int

class ReportOut(BaseModel):
    total_bookings: int
    total_persons: int
    shows: list[ShowReportItem]