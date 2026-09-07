import Link from "next/link";

// A simple shared nav bar. Living in its own file means every page gets
// the same header "for free" via layout.tsx.
export default function Nav() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between print:hidden">
      <Link href="/" className="text-xl font-bold tracking-tight">
        🎬 MovieTicket
      </Link>
      <div className="flex gap-6 text-sm">
        <Link href="/" className="hover:text-slate-300 transition">
          Now Showing
        </Link>
        <Link href="/report" className="hover:text-slate-300 transition">
          Report
        </Link>
      </div>
    </nav>
  );
}