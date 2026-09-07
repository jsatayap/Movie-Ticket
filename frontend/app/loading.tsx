// Next.js automatically renders this while page.tsx's async data fetch is pending.
// No manual "isLoading" state needed — this only works for Server Components.
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <p className="text-slate-400 text-sm">Loading showtimes...</p>
    </div>
  );
}