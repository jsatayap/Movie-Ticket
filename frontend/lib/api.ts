const API_BASE = "http://localhost:8000";

export async function getShows() {
  const res = await fetch(`${API_BASE}/shows/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch shows");
  return res.json();
}

export async function createBooking(data: {
  showtime_id: number;
  customer_name: string;
  num_persons: number;
}) {
  const res = await fetch(`${API_BASE}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function getBooking(id: number) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}

export async function getReport() {
  const res = await fetch(`${API_BASE}/reports/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch report");
  return res.json();
}