"use client";

import Link from "next/link";
import { LayoutDashboard, Star, TrendingUp, Newspaper, Settings } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function Sidebar() {
  const { t } = useAppContext();

  const SIDEBAR_ITEMS = [
    { id: "dashboard", icon: LayoutDashboard, href: "/", active: true },
    { id: "watchlist", icon: Star, href: "#", active: false },
    { id: "analysis", icon: TrendingUp, href: "#", active: false },
    { id: "news", icon: Newspaper, href: "#", active: false },
    { id: "settings", icon: Settings, href: "#", active: false },
  ];

  return (
    <aside className="w-16 lg:w-64 flex-shrink-0 bg-black lg:bg-[#08080c] border-r border-border-primary sticky top-0 h-screen overflow-y-auto transition-all duration-300 z-50 flex flex-col">
      <div className="p-4 flex items-center justify-center lg:justify-start gap-4 mb-2">
        <div className="hidden lg:block">
          <h2 className="text-xl font-bold text-white tracking-tight">IBK <span className="text-teal-400">Trade</span></h2>
        </div>
      </div>
      <nav className="px-3 flex-1 space-y-1.5">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-xl transition-all duration-200 group
                ${
                  item.active
                    ? "bg-teal-500/15 text-teal-400"
                    : "text-text-muted hover:bg-bg-card hover:text-text-primary"
                }
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${item.active ? "text-teal-400" : "group-hover:text-text-primary"}`} />
              <span className={`hidden lg:block font-medium text-sm ${item.active ? "text-teal-400" : ""}`}>
                {t(item.id)}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
