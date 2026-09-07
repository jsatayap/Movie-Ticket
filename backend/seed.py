from database import SessionLocal, engine, Base
import models
from datetime import datetime, timedelta

# Make sure tables exist before trying to insert into them.
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Avoid duplicate seeding if you run this more than once
if db.query(models.Movie).count() == 0:
    movies_data = [
        {"title": "The Odyssey", "duration_min": 172, "poster_url": "https://www.themoviedb.org/t/p/w1280/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg"},
        {"title": "Spider-Man: Brand New Day", "duration_min": 145, "poster_url": "https://www.themoviedb.org/t/p/w1280/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg"},
        {"title": "Obsession", "duration_min": 109, "poster_url": "https://www.themoviedb.org/t/p/w1280/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg"},
        {"title": "Harry Potter", "duration_min": 152, "poster_url": "https://www.themoviedb.org/t/p/w1280/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"},
        {"title": "Mutiny", "duration_min": 95, "poster_url": "https://www.themoviedb.org/t/p/w1280/pu2VxGlpGwffOx292w18b1tv96j.jpg"}
    ]

    movies = [models.Movie(**m) for m in movies_data]
    db.add_all(movies)
    db.commit()

    # Refresh each movie so we get their auto-generated IDs back from Postgres
    for m in movies:
        db.refresh(m)

    now = datetime.now()

    # Spread showtimes across "today" and "tomorrow" with a few halls.
    # Format: (movie index, hours from now, hall name, seat count)
    showtime_data = [
        (0, 2, "Hall 1", 50),    # The Odyssey - later today
        (0, 26, "Hall 1", 50),   # The Odyssey - tomorrow
        (1, 4, "Hall 2", 40),    # Spider-man - later today
        (1, 28, "Hall 2", 40),   # Spider-man - tomorrow
        (2, 6, "Hall 3", 60),    # Obsession - tonight
        (2, 30, "Hall 1", 50),   # Obsession - tomorrow
        (3, 3, "Hall 2", 35),    # Harry Potter - later today
        (4, 8, "Hall 3", 60),    # Mutiny - tonight
        (4, 32, "Hall 3", 60),   # Mutiny - tomorrow
    ]

    showtimes = [
        models.Showtime(
            movie_id=movies[movie_idx].id,
            show_time=now + timedelta(hours=hours_from_now),
            hall=hall,
            total_seats=seats,
        )
        for movie_idx, hours_from_now, hall, seats in showtime_data
    ]
    db.add_all(showtimes)
    db.commit()
    print(f"Seeded {len(movies)} movies and {len(showtimes)} showtimes.")
else:
    print("Movies already exist, skipping seed.")

db.close()