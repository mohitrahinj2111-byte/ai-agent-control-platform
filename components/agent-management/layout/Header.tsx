"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Command,
} from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#0B111D]/95 px-5 backdrop-blur-xl md:px-8">

      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Open navigation"
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Agent Management
          </h2>

          <p className="hidden text-xs text-gray-500 sm:block">
            Manage and monitor your AI workforce
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-500" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search agents..."
            className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 lg:w-48"
          />

          <span className="rounded border border-white/10 px-1.5 py-0.5 text-xs text-gray-500">
            /
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() =>
              setNotificationsOpen(!notificationsOpen)
            }
            className="relative rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-64 rounded-xl border border-white/10 bg-[#101927] p-4 shadow-2xl">
              <h3 className="text-sm font-semibold text-white">
                Notifications
              </h3>

              <p className="mt-3 text-xs text-gray-500">
                No new notifications.
              </p>
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-white/5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-bold text-cyan-400">
            U
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">
              User
            </p>

            <p className="text-xs text-gray-500">
              Workspace
            </p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-gray-500 sm:block"
          />
        </button>

      </div>
    </header>
  );
}