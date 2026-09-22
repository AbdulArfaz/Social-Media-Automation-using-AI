import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/accounts": "Social Accounts",
  "/schedule": "Post Scheduler",
  "/ai-composer": "AI Composer",
};

const Layout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "SocialAI";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-950 via-teal-950 to-emerald-950 text-slate-100 overflow-hidden font-sans">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-purple-700/30 bg-purple-950/40 backdrop-blur-md shadow-sm z-30">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-xl bg-purple-800/50 text-purple-200 hover:bg-purple-800 transition active:scale-95 border border-purple-700/50"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                {title}
              </h1>
              <p className="text-xs md:text-sm text-purple-300 hidden sm:block">
                Manage and Automate your social presence
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 xl:p-12">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
