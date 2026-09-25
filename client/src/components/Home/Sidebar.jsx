import React from "react";
import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UsersIcon,
  Wand2Icon,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from 'sonner'
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
          await api.post('/api/users/logout')

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to Log out'
      toast.error(errorMessage)      
    } finally{
          logout()
          toast.success('Logged out successfully')
          navigate('/login')
    }
  }
      
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Accounts", icon: UsersIcon, path: "/accounts" },
    { name: "Scheduler", icon: CalendarDaysIcon, path: "/schedule" },
    { name: "AI Composer", icon: Wand2Icon, path: "/ai-composer" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-950/95 backdrop-blur-xl border-r border-purple-600/40 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      
      <div className="p-6 pb-4 border-b border-purple-600/30">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <img
            src="/logo.svg"
            alt="logo"
            className="size-6 filter brightness-0 invert"
          />
          SocialSync
        </div>
      </div>

      <div className="px-6 pt-6 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-200/80">
          Menu
        </span>
      </div>

     
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-purple-600/40 text-white border border-purple-400/50 shadow-inner"
                  : "text-slate-100 hover:text-white hover:bg-purple-900/40"
              }`}
            >
              <Icon
                className={`size-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-purple-300"}`}
              />
              <span>{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-300 shadow-sm shadow-purple-300" />
              )}
            </NavLink>
          );
        })}
      </nav>

     
      <div className="p-4 border-t border-purple-500/20 m-3 rounded-2xl bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-tr from-purple-500 to-indigo-400 flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">
              {user?.name}
            </div>
            <div className="text-[11px] text-slate-300 truncate">
              {user?.email}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-purple-800/60 hover:bg-purple-700 text-white text-xs font-medium transition border border-purple-500/40 active:scale-95"
        >
          <LogOutIcon className="size-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
