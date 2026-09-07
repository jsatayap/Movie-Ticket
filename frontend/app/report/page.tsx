import { getReport } from "../../lib/api";

export default async function ReportPage() {
  const report = await getReport();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Report</h1>

      {/* Two summary stat cards up top before the detailed table */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Bookings</p>
          <p className="text-2xl font-bold text-slate-800">{report.total_bookings}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Persons</p>
          <p className="text-2xl font-bold text-slate-800">{report.total_persons}</p>
        </div>
      </div>

      {report.shows.length === 0 ? (
        <p className="text-slate-500">No shows to report on yet.</p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-600">
                <th className="px-4 py-3 font-medium">Movie</th>
                <th className="px-4 py-3 font-medium">Show Time</th>
                <th className="px-4 py-3 font-medium">Hall</th>
                <th className="px-4 py-3 font-medium">Seats Booked</th>
                <th className="px-4 py-3 font-medium">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {report.shows.map((s: any, i: number) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-slate-800">{s.movie_title}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(s.show_time).toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{s.hall}</td>
                  <td className="px-4 py-3 text-slate-600">{s.seats_booked} / {s.total_seats}</td>
                  <td className="px-4 py-3 text-slate-600">{s.num_bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}