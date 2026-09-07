# MovieTicket

A movie theatre booking web app. Built with Next.js (frontend), FastAPI (backend), and PostgreSQL (database).

**Flow:** Browse showtimes → Book tickets (name + number of persons) → Print ticket → View booking report.
<img width="1909" height="880" alt="movieticket1" src="https://github.com/user-attachments/assets/7001a18e-4c87-4b5c-b9d1-fabe478e3a1f" />

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router, TypeScript, Tailwind CSS)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy

---

## Prerequisites

Install these before setup:

- [Python 3.12+](https://www.python.org/downloads/) — check "Add python.exe to PATH" during install
- [Node.js LTS](https://nodejs.org/)
- [PostgreSQL 16](https://www.postgresql.org/download/windows/) — remember the password you set for the `postgres` user

---

## Setup

### 1. Clone the repo

```powershell
git clone https://github.com/jsatayap/Movie-Ticket.git
cd MovieTicket
```

### 2. Database setup

Create the database:

```powershell
psql -U postgres -c "CREATE DATABASE MovieTicket_db;"
```

### 3. Backend setup

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic python-dotenv
```

Create a `.env` file in `backend/` (copy `.env.example` and fill in your password):

```powershell
Copy-Item .env.example .env
```

Then edit `.env` so it matches your local Postgres password:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/MovieTicket_db
```

Seed some demo data (movies + showtimes):

```powershell
python seed.py
```

Start the backend:

```powershell
uvicorn main:app --reload --port 8000
```

Visit `http://localhost:8000/docs` to confirm the API is running (Swagger UI).

### 4. Frontend setup

In a **new** terminal window (keep the backend running in the first one):

```powershell
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## Project Structure

```
MovieTicket/
├── backend/
│   ├── main.py              # FastAPI app entrypoint, CORS, router setup
│   ├── models.py            # SQLAlchemy models (Movie, Showtime, Booking)
│   ├── schemas.py           # Pydantic request/response schemas + validation
│   ├── database.py          # DB connection/session setup
│   ├── seed.py               # Populates demo movies + showtimes
│   ├── routers/
│   │   ├── shows.py         # GET /shows
│   │   ├── bookings.py      # POST /bookings, GET /bookings/{id}
│   │   └── reports.py       # GET /reports
│   └── .env                 # Local DB credentials
├── frontend/
│   ├── app/
│   │   ├── page.tsx                    # Home — list of showtimes
│   │   ├── book/[showId]/page.tsx      # Booking form
│   │   ├── ticket/[bookingId]/page.tsx # Printable ticket confirmation
│   │   ├── report/page.tsx             # Booking report
│   │   ├── components/Nav.tsx          # Shared nav bar
│   │   ├── loading.tsx / error.tsx     # Loading & error states
│   │   └── layout.tsx                  # Root layout (wraps all pages with Nav)
│   └── lib/api.ts           # Fetch helpers for calling the backend
└── README.md
```

---

## API Endpoints

| Method | Endpoint               | Description                                   |
|--------|------------------------|-----------------------------------------------|
| GET    | `/shows/`              | List all showtimes with movie details         |
| POST   | `/bookings/`           | Create a booking (validates seat availability)|
| GET    | `/bookings/{id}`       | Get a single booking by ID                    |
| GET    | `/reports/`            | Booking totals + per-showtime breakdown       |

Full interactive API docs available at `http://localhost:8000/docs` while the backend is running.

---

## Features

- Browse current showtimes with movie details
- Book tickets by name + number of persons
- Server-side overbooking prevention (can't book more seats than available)
- Input validation (name required, persons must be 1–20)
- Printable ticket view with print-specific styling
- Booking report with totals and per-show breakdown
- Graceful loading and error states if the backend is unreachable

---

## Known Limitations / Not Implemented

Scoped out due to the project timeline — worth noting for future iterations:

- No seat-map selection (tracks a headcount per booking, not individual seats)
- No authentication — bookings are open, not tied to user accounts
- No payment integration
- No booking cancellation/editing

---

## Troubleshooting

**`ECONNREFUSED` / "fetch failed" in the frontend**
The backend isn't running. Make sure `uvicorn main:app --reload --port 8000` is active in a separate terminal.

**`Error loading ASGI app. Could not import module "main"`**
You're running `uvicorn` from the wrong folder. It must be run from inside `backend/`.

**`psql` not recognized**
Postgres's `bin` folder isn't on your PATH. Add `C:\Program Files\PostgreSQL\16\bin` to your system PATH and open a new terminal.
