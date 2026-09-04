import Link from "next/link";
import { getShows } from "../lib/api";

export default async function Home() {
  const shows = await getShows();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MovieTicket — Now Showing</h1>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        {shows.map((show: any) => (
          <div key={show.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h2>{show.movie.title}</h2>
            <p>Duration: {show.movie.duration_min} min</p>
            <p>Time: {new Date(show.show_time).toLocaleString()}</p>
            <p>Hall: {show.hall} — {show.total_seats} seats</p>
            <Link href={`/book/${show.id}`}>
              <button>Book Tickets</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}