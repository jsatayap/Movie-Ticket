import Link from "next/link";
import { getShows } from "../lib/api";

export default async function Home() {
  const shows = await getShows();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Now Showing</h1>

      {shows.length === 0 ? (
        <p className="text-slate-500">No showtimes available right now. Check back soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {shows.map((show: any) => (
            // Each card is a self-contained unit — border + shadow gives it visual weight
            // so it reads as "clickable content," not just plain text.
            <div
              key={show.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-slate-800">{show.movie.title}</h2>
              <p className="text-sm text-slate-500 mt-1">{show.movie.duration_min} min</p>
              <div className="mt-3 text-sm text-slate-600 space-y-1">
                <p>🕒 {new Date(show.show_time).toLocaleString()}</p>
                <p>📍 {show.hall} — {show.total_seats} seats</p>
              </div>
              <Link href={`/book/${show.id}`}>
                <button className="mt-4 w-full bg-slate-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-slate-700 transition">
                  Book Tickets
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}