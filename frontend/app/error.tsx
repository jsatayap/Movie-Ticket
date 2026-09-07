"use client";

// Next.js passes `error` (what went wrong) and `reset` (a function to retry)
// automatically as props — you don't call this component yourself.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-700 font-medium mb-2">Something went wrong.</p>
        <p className="text-red-600 text-sm mb-4">
          Couldn't load this page — the backend server might not be running.
        </p>
        {/* reset() re-attempts the failed render without a full page reload */}
        <button
          onClick={() => reset()}
          className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}