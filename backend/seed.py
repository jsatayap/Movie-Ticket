from database import SessionLocal, engine, Base
import models
from datetime import datetime, timedelta

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Avoid duplicate seeding if you run this more than once
if db.query(models.Movie).count() == 0:
    movie1 = models.Movie(title="The Odyssey", duration_min=172)
    movie2 = models.Movie(title="Spider-Man: Brand New Day", duration_min=145)
    db.add_all([movie1, movie2])
    db.commit()
    db.refresh(movie1)
    db.refresh(movie2)

    now = datetime.now()
    showtimes = [
        models.Showtime(movie_id=movie1.id, show_time=now + timedelta(hours=2), hall="Hall 1", total_seats=50),
        models.Showtime(movie_id=movie1.id, show_time=now + timedelta(hours=5), hall="Hall 1", total_seats=50),
        models.Showtime(movie_id=movie2.id, show_time=now + timedelta(hours=3), hall="Hall 2", total_seats=40),
    ]
    db.add_all(showtimes)
    db.commit()
    print("Seeded 2 movies and 3 showtimes.")
else:
    print("Movies already exist, skipping seed.")

db.close()