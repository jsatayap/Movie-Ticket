"""
models.py - SQLAlchemy models database schema
 1. defines the three tables:
  a. movie: film that can be shown
  b. showtime: one screening of a movie, specific hall, specific time
  c. booking: reservation of n seats against one showtime
 2. tables created via 'base.metadata.create_all()' in main.py/seed.py
 3. no migration; manual update to change a column
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, ARRAY
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    duration_min = Column(Integer, nullable=False)
    poster_url = Column(String, nullable=True)
    showtimes = relationship("Showtime", back_populates="movie")


class Showtime(Base):
    __tablename__ = "showtimes"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)
    show_time = Column(DateTime, nullable=False)
    hall = Column(String, nullable=False)
    total_seats = Column(Integer, nullable=False, default=50)

    movie = relationship("Movie", back_populates="showtimes")
    bookings = relationship("Booking", back_populates="showtime")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    showtime_id = Column(Integer, ForeignKey("showtimes.id"), nullable=False)
    customer_name = Column(String, nullable=False)
    num_persons = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default="confirmed")

    showtime = relationship("Showtime", back_populates="bookings")