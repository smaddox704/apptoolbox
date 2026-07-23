import Link from "next/link";

export default function AppHeader({ label }: { label: string }) {
  return (
    <header className="mb-10 flex items-center justify-between">
      <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white/80 px-5 text-sm font-semibold shadow-sm ring-1 ring-black/5 transition hover:bg-white active:scale-95">
        <span aria-hidden>←</span> Toolbox
      </Link>
      <span className="text-sm font-semibold text-black/45">{label}</span>
    </header>
  );
}
