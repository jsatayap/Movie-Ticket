"""
schemas.py - pydantic schemas for request validation and response shaping
 1. defines what JSON shape the API accepts and returns
 2. separate from models.py so API can stay stable even if DB schema changes internally
 3. naming convention: "...Out" = response schema, "...Create" = request schema
"""
from pydantic import BaseModel, Field
from datetime import datetime

class MovieOut(BaseModel):
    id: int
    title: str
    duration_min: int
    poster_url: str | None = None
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
    customer_name: str = Field(min_length=1) # blocks blank names
    num_persons: int = Field(gt=0) # blocks zero/negative

class BookingOut(BaseModel):
    id: int
    showtime_id: int
    customer_name: str
    num_persons: int
    status: str
    showtime: ShowtimeOut 
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