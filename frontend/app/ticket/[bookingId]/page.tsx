import { getBooking } from "../../../lib/api";
import PrintButton from "./PrintButton";

export default async function TicketPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const booking = await getBooking(parseInt(bookingId));

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      {/* print:hidden isn't used here since we want the ticket itself to print —
          the dashed border mimics a real ticket stub visually */}
      <div className="bg-white border-2 border-dashed border-slate-400 rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800 mb-4">🎬 Movie Ticket</h1>
        <div className="space-y-2 text-sm text-slate-700">
          <p><span className="font-medium">Booking ID:</span> {booking.id}</p>
          <p><span className="font-medium">Name:</span> {booking.customer_name}</p>
          <p><span className="font-medium">Persons:</span> {booking.num_persons}</p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {booking.status}
            </span>
          </p>
        </div>
      </div>
      <PrintButton />
    </div>
  );
}