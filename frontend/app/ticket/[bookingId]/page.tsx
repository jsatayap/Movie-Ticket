import { getBooking } from "../../../lib/api";
import PrintButton from "./PrintButton";

export default async function TicketPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const booking = await getBooking(parseInt(bookingId));

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ border: "2px dashed #333", padding: "2rem", maxWidth: "400px" }}>
        <h1>🎬 MovieTicket</h1>
        <p><strong>Booking ID:</strong> {booking.id}</p>
        <p><strong>Name:</strong> {booking.customer_name}</p>
        <p><strong>Persons:</strong> {booking.num_persons}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>
      <PrintButton />
    </div>
  );
}