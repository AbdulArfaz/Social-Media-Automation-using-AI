import { Link } from "react-router-dom";
import { ArrowRightIcon, DotIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 bg-linear-to-b from-slate-900 via-slate-950 to-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-linear(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />⚡
          Supercharge your social reach
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
          Automate smarter. <br />
          Scale faster. <br />
          <span className="text-red-400 italic">Grow faster.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop wasting hours on manual posting. Let advanced AI craft viral
          captions, auto-schedule your content, and engage your audience 24/7.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-full transition-all shadow-xl shadow-red-600/25 hover:scale-[1.02]"
          >
            Start for free
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-8 py-4 rounded-full border border-slate-200/80 transition-all shadow-sm hover:border-slate-300"
          >
            See how it works
          </a>
        </div>

        <p className="mt-5 text-xs text-slate-400 font-medium">
          No credit card required &bull; Free forever plan available
        </p>

        <div className="mt-16 relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10 bg-white">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex-1 mx-4 max-w-xs h-6 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-[11px] text-slate-400 font-mono">
              app.scheduler.com/dashboard
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-slate-50/50 text-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { val: "12", label: "Scheduled" },
                { val: "48", label: "Published" },
                { val: "4", label: "Accounts" },
                { val: "3", label: "AI Rules" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 bg-white border border-slate-100 shadow-sm"
                >
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {s.val}
                  </div>
                  <div className="text-xs font-medium text-slate-400 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 bg-white border border-slate-100 shadow-sm space-y-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Recent Activity
              </div>
              {[
                {
                  text: "Post published to LinkedIn & Twitter",
                  time: "2m ago",
                },
                { text: "AI replied to 3 comments", time: "15m ago" },
                { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 flex-1">
                    {item.text}
                  </span>
                  <span className="text-xs text-slate-400 shrink-0 bg-slate-50 px-2 py-0.5 rounded-md">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
