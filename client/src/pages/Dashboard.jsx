import React, { useEffect, useState } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  Share2Icon,
  TrendingUpIcon,
  ActivityIcon,
  SendIcon,
} from "lucide-react";
import {
  dummyPostsData,
  dummyAccountsData,
  dummyActivityData,
} from "../assets/assets";

const Dashboard = () => {
  const [stats, setStats] = useState({
    scheduled: 0,
    published: 0,
    connectedAccounts: 0,
  });
  const [activities, setActivities] = useState([]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const posts = dummyPostsData || [];
        const accounts = dummyAccountsData || [];
        const activitiesData = dummyActivityData || [];
        setStats({
          scheduled: posts.filter((p) => p.status === "scheduled").length,
          published: posts.filter((p) => p.status === "published").length,
          connectedAccounts: accounts.filter((a) => a.status === "connected")
            .length,
        });
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: "Scheduled Posts",
      value: stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today",
    },
    {
      label: "Published Posts",
      value: stats.published,
      icon: CheckCircleIcon,
      trend: "All Time",
    },
    {
      label: "Connected Accounts",
      value: stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active",
    },
  ];

  return (
    <div className="min-h-screenbg-linear-to-br from-slate-950 via-teal-950 to-emerald-950 text-slate-100 p-4 sm:p-6 md:p-8 space-y-8 font-sans antialiased">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {getGreeting()} 👋
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          Your social command center is live and running.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform origin-left">
                {card.value}
              </span>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                <TrendingUpIcon className="w-3.5 h-3.5" />
                <span>{card.trend}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-400 mt-3">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Recent Activity
          </h2>
          <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
            {activities.length} events
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 bg-slate-800/60 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <ActivityIcon className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-white">
              No Activity yet
            </p>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Connect accounts and schedule posts to see events here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/60 hover:border-slate-700 transition-all duration-200"
              >
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <SendIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                      Published
                    </span>
                    <span className="text-xs text-white-700">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 truncate">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
