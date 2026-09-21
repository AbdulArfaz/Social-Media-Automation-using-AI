import { Link } from "react-router-dom";

const footerLinks = {
  Product: ["Features", "How it works", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-zinc-950 via-slate-950 to-slate-950 border-t border-zinc-800/80 relative overflow-hidden text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className="inline-flex items-center gap-2.5 mb-5 group"
            >
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="w-5 h-5 brightness-0 invert"
                />
              </div>
              <span className="font-medium font-serif text-2xl text-white tracking-tight">
                Scheduler
              </span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              The AI-powered social media scheduler that helps creators and
              teams grow faster with less effort.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-5 text-red-400">
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#_"
                      className="text-sm text-zinc-400 hover:text-red-400 transition-colors duration-200 inline-block hover:translate-x-0.5 transform"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800/80">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Scheduler. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#_"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <a
              href="#_"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Terms of Service
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <a
              href="/login"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
