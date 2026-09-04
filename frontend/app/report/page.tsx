import { getReport } from "../../lib/api";

export default async function ReportPage() {
  const report = await getReport();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MovieTicket — Report</h1>
      <p><strong>Total Bookings:</strong> {report.total_bookings}</p>
      <p><strong>Total Persons:</strong> {report.total_persons}</p>

      <table style={{ marginTop: "1.5rem", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Movie</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Show Time</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Hall</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Seats Booked</th>
            <th style={{ textAlign: "left", padding: "0.5rem" }}>Bookings</th>
          </tr>
        </thead>
        <tbody>
          {report.shows.map((s: any, i: number) => (
            <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "0.5rem" }}>{s.movie_title}</td>
              <td style={{ padding: "0.5rem" }}>{new Date(s.show_time).toLocaleString()}</td>
              <td style={{ padding: "0.5rem" }}>{s.hall}</td>
              <td style={{ padding: "0.5rem" }}>{s.seats_booked} / {s.total_seats}</td>
              <td style={{ padding: "0.5rem" }}>{s.num_bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}