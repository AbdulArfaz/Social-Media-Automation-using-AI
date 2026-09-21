import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-linear-to-b from-slate-950 via-zinc-950 to-slate-950 relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden p-14 sm:p-20 text-center bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl shadow-black/20">
          <div className="absolute inset-0 opacity-30 mask-[radial-linear(#fff,transparent_80%)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern
                  id="dot-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>
          </div>

          <div className="absolute -top-px left-20 right-20 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />

          <div className="relative inline-flex mb-6 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide uppercase shadow-sm">
            Ready to grow?
          </div>

          <h2 className="relative font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-medium text-white tracking-tight mb-6">
            Automate your social <br />
            <span className="text-red-400 italic font-normal">media today</span>
          </h2>

          <p className="relative mt-6 text-zinc-300 max-w-lg mx-auto leading-relaxed text-base sm:text-lg font-normal">
            Join thousands of creators and marketers who trust Scheduler to grow
            their audience on autopilot.
          </p>

          <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 shadow-md shadow-red-600/20 hover:shadow-red-600/40"
            >
              Get Started Free
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 font-medium transition-all duration-300 shadow-sm"
            >
              View Pricing
            </a>
          </div>

          <p className="relative mt-6 text-xs text-zinc-500 font-normal">
            No credit card required &bull; Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
