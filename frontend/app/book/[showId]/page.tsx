"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBooking, getShow } from "../../../lib/api";

export default function BookPage({ params }: { params: Promise<{ showId: string }> }) {
  const { showId } = use(params);
  const router = useRouter();
  const [name, setName] = useState("");
  const [persons, setPersons] = useState(1);
  const [error, setError] = useState("");
  const [show, setShow] = useState<any>(null);

  // Fetch the showtime details once, when the page first loads
  useEffect(() => {
    getShow(parseInt(showId))
      .then(setShow)
      .catch(() => setError("Could not load showtime details."));
  }, [showId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const booking = await createBooking({
        showtime_id: parseInt(showId),
        customer_name: name,
        num_persons: persons,
      });
      // On success, redirect straight to ticket page for this new booking.
      router.push(`/ticket/${booking.id}`);
    } catch (err: any) {
      // err.message will be the specific backend error, if createBooking() throws properly
      // otherwise, falls back to generic message.
      setError(err.message || "Booking failed. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Book Tickets</h1>

      {/* Show details card — only renders once `show` has loaded */}
      {show && (
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 mb-6 text-sm text-slate-700 space-y-1">
          <p className="font-semibold text-slate-800">{show.movie.title}</p>
          <p>🕒 {new Date(show.show_time).toLocaleString()}</p>
          <p>📍 {show.hall}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of Persons</label>
          <input
            type="number"
            min={1}
            value={persons}
            onChange={(e) => setPersons(parseInt(e.target.value))}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-slate-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-slate-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}