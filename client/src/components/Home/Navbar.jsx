import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="p-2 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 group-hover:border-indigo-500/60 transition-all">
            <img src="/logo.svg" alt="logo" className="size-6 filter invert" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
            SocialSync
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How it works
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all"
            >
              <span>Dashboard</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-950 border-b border-slate-800 px-6 py-6 flex flex-col gap-4 shadow-2xl">
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </a>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold"
                >
                  <span>Dashboard</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/20"
                  >
                    <span>Get Started</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
