import { getBooking } from "../../../lib/api";
import PrintButton from "./PrintButton";

export default async function TicketPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const booking = await getBooking(parseInt(bookingId));

  return (
    <div className="max-w-md mx-auto px-6 py-10 print:py-0 print:px-0">
      <div className="bg-white border-2 border-dashed border-slate-400 rounded-xl p-6 shadow-sm print:shadow-none print:rounded-none">
        <h1 className="text-xl font-bold text-slate-800 mb-1">🎬 MovieTicket</h1>

        {/* booking.showtime is the nested object we added to BookingOut on the backend —
            gives us the movie title, hall, and show time without a second fetch */}
        <p className="text-lg font-semibold text-slate-700 mb-4">{booking.showtime.movie.title}</p>

        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-medium">🕒 Show Time:</span> {new Date(booking.showtime.show_time).toLocaleString()}</p>
          <p><span className="font-medium">📍 Hall:</span> {booking.showtime.hall}</p>
          <hr className="my-3 border-slate-200" />
          <p><span className="font-medium">Booking ID:</span> {booking.id}</p>
          <p><span className="font-medium">Name:</span> {booking.customer_name}</p>
          <p><span className="font-medium">Persons:</span> {booking.num_persons}</p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium print:bg-transparent print:border print:border-green-600">
              {booking.status}
            </span>
          </p>
        </div>
      </div>
      <PrintButton />
    </div>
  );
}