import Link from "next/link";

const tools = [
  { icon: "📝", title: "Notes", description: "Capture ideas and keep them close.", href: "/notes", color: "from-[#fff5c9] to-[#ffeaa0]" },
  { icon: "💵", title: "Tip Calculator", description: "Work out the perfect tip in seconds.", href: "/tip-calculator", color: "from-[#d8f5df] to-[#b9eec8]" },
  { icon: "⚾", title: "Baseball Stats", description: "Coming Soon", color: "from-[#dcecff] to-[#c7ddff]" },
  { icon: "💰", title: "Retirement Calculator", description: "Coming Soon", color: "from-[#eadcff] to-[#dcc5ff]" },
] as const;

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <section className="mb-12 max-w-3xl sm:mb-16">
        <div className="mb-5 inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-black/50 ring-1 ring-black/5">Everyday essentials</div>
        <h1 className="text-5xl font-bold tracking-[-.055em] sm:text-7xl">Steve&apos;s App<br />Toolbox</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl">Simple, useful tools for the things you do every day.</p>
      </section>
      <section aria-label="Available tools" className="grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => {
          const content = (
            <>
              <div className="flex items-start justify-between">
                <span className="text-5xl drop-shadow-sm" aria-hidden>{tool.icon}</span>
                {"href" in tool ? <span className="grid h-11 w-11 place-items-center rounded-full bg-white/65 text-xl transition group-hover:translate-x-1">→</span> : <span className="rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black/50">Soon</span>}
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight">{tool.title}</h2>
                <p className="mt-2 text-sm font-medium text-black/50">{tool.description}</p>
              </div>
            </>
          );
          const classes = `group min-h-64 rounded-[2rem] bg-gradient-to-br ${tool.color} p-7 shadow-card ring-1 ring-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8`;
          return "href" in tool ? <Link key={tool.title} href={tool.href} className={classes}>{content}</Link> : <article key={tool.title} className={`${classes} opacity-80`}>{content}</article>;
        })}
      </section>
      <footer className="py-12 text-center text-sm text-black/35">Made for Steve · Built to be useful</footer>
    </main>
  );
}
