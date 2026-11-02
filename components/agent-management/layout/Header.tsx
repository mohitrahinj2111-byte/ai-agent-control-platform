"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Bell,
  Search,
  LogOut,
  Settings,
  Users,
  Home,
  Network,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/client";

function getAccountInitial(email: string) {
  return email.trim().charAt(0).toUpperCase() || "?";
}

function getAccountColor(email: string) {
  const colors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-amber-600",
    "bg-cyan-700",
    "bg-indigo-600",
  ];

  let hash = 0;

  for (let i = 0; i < email.length; i++) {
    hash = (hash * 31 + email.charCodeAt(i)) | 0;
  }

  return colors[Math.abs(hash) % colors.length];
}

export default function Header() {
  const [email, setEmail] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const accountAreaRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (!active) return;

        setEmail(!error && data.user ? data.user.email ?? null : null);
      } catch {
        if (active) setEmail(null);
      } finally {
        if (active) setAuthReady(true);
      }
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;

      setEmail(session?.user.email ?? null);

      if (!session?.user) {
        setAccountMenuOpen(false);
      }

      setAuthReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target as Node;

      if (
        accountAreaRef.current &&
        !accountAreaRef.current.contains(target)
      ) {
        setAccountMenuOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      window.alert("Logout failed. Please try again.");
      return;
    }

    setAccountMenuOpen(false);
    window.location.assign("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-background/95 text-foreground backdrop-blur-xl">
      <div className="flex min-h-20 flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

        {/* Left: Branding */}
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Network size={22} />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-tight sm:text-base">
              AI Agent Control Platform
            </span>

            <span className="hidden text-xs text-[var(--muted)] sm:block">
              Control your AI workforce
            </span>
          </span>
        </Link>

        {/* Right: Search, Settings, Notifications, Account */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}
          <div className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 lg:flex">
            <Search size={16} className="text-[var(--muted)]" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search agents..."
              className="w-36 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-[var(--muted)] xl:w-44"
            />
          </div>

          {/* Settings */}
          <Link
            href="/settings"
            aria-label="Settings"
            title="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-blue-600"
          >
            <Settings size={19} />
          </Link>

          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-blue-600"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-[var(--border)] bg-background p-4 text-foreground shadow-2xl">
                <h3 className="text-sm font-semibold">Notifications</h3>
                <p className="mt-3 text-xs text-[var(--muted)]">
                  No new notifications.
                </p>
              </div>
            )}
          </div>

          {/* Account */}
          <div ref={accountAreaRef} className="relative">
            {authReady && email ? (
              <>
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                  className="flex max-w-[min(18rem,48vw)] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1.5 pr-2 transition hover:border-blue-500/40 sm:gap-3 sm:pr-3"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${getAccountColor(email)}`}
                  >
                    {getAccountInitial(email)}
                  </span>

                  <span className="hidden max-w-36 truncate text-sm font-semibold text-foreground sm:block">
                    {email}
                  </span>

                  <ChevronDown
                    size={15}
                    className={`shrink-0 text-[var(--muted)] transition-transform ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-[var(--border)] bg-background p-2 text-foreground shadow-2xl"
                  >
                    <div className="flex items-center gap-3 border-b border-[var(--border)] px-3 py-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${getAccountColor(email)}`}
                      >
                        {getAccountInitial(email)}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {email}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          Your account
                        </p>
                      </div>
                    </div>

                    <Link
                      role="menuitem"
                      href="/"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[var(--surface)]"
                    >
                      <Home size={17} />
                      Home
                    </Link>

                    <Link
                      role="menuitem"
                      href="/agent-management"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[var(--surface)]"
                    >
                      <Users size={17} />
                      Agent Management
                    </Link>

                    <Link
                      role="menuitem"
                      href="/settings"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[var(--surface)]"
                    >
                      <Settings size={17} />
                      Settings
                    </Link>

                    <div className="my-1 border-t border-[var(--border)]" />

                    <button
                      role="menuitem"
                      type="button"
                      onClick={() => void handleLogout()}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-500 transition hover:bg-red-500/10"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : authReady ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-lg border border-blue-600 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-500/10 sm:px-4 sm:text-sm"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4 sm:text-sm"
                >
                  Sign Up
                  <ArrowRight size={14} className="ml-1 inline" />
                </Link>
              </div>
            ) : (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-[var(--surface)]" />
            )}
          </div>
        </div>

        {/* Mobile page label */}
        <div className="w-full border-t border-[var(--border)] pt-2 md:hidden">
          <p className="text-sm font-semibold text-blue-600">
            Agent Management
          </p>
          <p className="text-xs text-[var(--muted)]">
            Manage and monitor your AI workforce
          </p>
        </div>
      </div>
    </header>
  );
}