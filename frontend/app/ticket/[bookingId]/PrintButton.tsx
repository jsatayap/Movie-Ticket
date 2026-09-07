"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()}
    className="mt-4 w-full bg-slate-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-slate-700 transition print:hidden"
    >
      Print Ticket
    </button>
  );
}