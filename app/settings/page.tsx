"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  ShieldCheck,
  UserRound,
  Palette,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activityNotifications, setActivityNotifications] = useState(true);
  const [message, setMessage] = useState("");

  function handleSave() {
    // These settings are currently local UI state only.
    // No profile or preferences are saved to a database yet.
    setMessage("Settings preview updated. Database saving is not connected yet.");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-lg font-bold tracking-tight">
            AI Agent Control Platform
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <div>
          <p className="text-sm font-semibold text-blue-600">YOUR WORKSPACE</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-3 text-slate-600">
            Manage your profile and notification preferences.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <UserRound size={22} />
              </div>
              <div>
                <h2 className="font-semibold">Profile</h2>
                <p className="text-sm text-slate-500">
                  Basic account information
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-xl space-y-2">
              <label htmlFor="displayName" className="block text-sm font-medium">
                Display name
              </label>
              <input
                id="displayName"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="text-xs text-slate-500">
                Profile saving will be connected after authentication setup.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Bell size={22} />
              </div>
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-sm text-slate-500">
                  Choose the alerts you want to receive
                </p>
              </div>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block text-sm font-medium">Email notifications</span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Receive important account updates
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(event) => setEmailNotifications(event.target.checked)}
                  className="h-5 w-5 accent-blue-600"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
                <span>
                  <span className="block text-sm font-medium">Agent activity alerts</span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Receive alerts about agent activity
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={activityNotifications}
                  onChange={(event) => setActivityNotifications(event.target.checked)}
                  className="h-5 w-5 accent-blue-600"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="font-semibold">Security</h2>
                <p className="text-sm text-slate-500">
                  Account security and access controls
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Password reset, active sessions and multi-factor authentication
              will be connected to your account in a later step.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Go to login
            </Link>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Palette size={22} />
              </div>
              <div>
                <h2 className="font-semibold">Appearance</h2>
                <p className="text-sm text-slate-500">
                  Interface theme
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Current theme: Light
            </p>
          </section>

          <div>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Save size={17} />
              Save settings
            </button>

            {message && (
              <p role="status" className="mt-3 text-sm text-slate-600">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}