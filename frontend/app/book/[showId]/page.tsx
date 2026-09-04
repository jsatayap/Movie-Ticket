"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "../../../lib/api";

export default function BookPage({ params }: { params: Promise<{ showId: string }> }) {
  const { showId } = use(params);
  const router = useRouter();
  const [name, setName] = useState("");
  const [persons, setPersons] = useState(1);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const booking = await createBooking({
        showtime_id: parseInt(showId),
        customer_name: name,
        num_persons: persons,
      });
      router.push(`/ticket/${booking.id}`);
    } catch (err) {
      setError("Booking failed. Please try again.");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Book Tickets</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "300px" }}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Number of Persons
          <input
            type="number"
            min={1}
            value={persons}
            onChange={(e) => setPersons(parseInt(e.target.value))}
            required
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}