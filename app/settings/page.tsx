"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  ShieldCheck,
  UserRound,
  Palette,
  Save,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [displayName, setDisplayName] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activityNotifications, setActivityNotifications] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const name = localStorage.getItem("settings-display-name");
      const email = localStorage.getItem("settings-email-notifications");
      const activity = localStorage.getItem(
        "settings-activity-notifications"
      );

      if (name !== null) setDisplayName(name);
      if (email !== null) setEmailNotifications(email === "true");
      if (activity !== null) setActivityNotifications(activity === "true");
    } catch {
      setMessage("Saved preferences could not be loaded.");
    } finally {
      setLoaded(true);
    }
  }, []);

  function saveSettings() {
    if (!loaded) return;

    try {
      localStorage.setItem("settings-display-name", displayName);
      localStorage.setItem(
        "settings-email-notifications",
        String(emailNotifications)
      );
      localStorage.setItem(
        "settings-activity-notifications",
        String(activityNotifications)
      );

      setMessage("Settings saved in this browser.");
    } catch {
      setMessage("Could not save settings. Please check browser storage.");
    }
  }

  const card =
    "rounded-2xl border border-gray-200 bg-white p-6";
  const input =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500";
  const themeButton =
    "flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-4 font-medium transition";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            AI Agent Control Platform
          </p>
          <h1 className="mt-2 text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile, notifications, security and appearance.
          </p>
        </header>

        <div className="space-y-5">
          <section className={card}>
            <div className="mb-5 flex items-center gap-3">
              <UserRound className="text-blue-600" />
              <div>
                <h2 className="font-semibold">Profile</h2>
                <p className="text-sm text-gray-500">Display preferences</p>
              </div>
            </div>

            <label htmlFor="displayName" className="text-sm font-medium">
              Display name
            </label>
            <input
              id="displayName"
              className={input}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              maxLength={80}
            />
          </section>

          <section className={card}>
            <div className="mb-4 flex items-center gap-3">
              <Bell className="text-blue-600" />
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-sm text-gray-500">
                  Notification preferences
                </p>
              </div>
            </div>

            <label className="flex items-center justify-between gap-4 border-b border-gray-100 py-4">
              <span>Email notifications</span>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-5 w-5 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between gap-4 py-4">
              <span>Agent activity notifications</span>
              <input
                type="checkbox"
                checked={activityNotifications}
                onChange={(e) => setActivityNotifications(e.target.checked)}
                className="h-5 w-5 accent-blue-600"
              />
            </label>
          </section>

          <section className={card}>
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="text-blue-600" />
              <div>
                <h2 className="font-semibold">Security</h2>
                <p className="text-sm text-gray-500">
                  Account security and access controls
                </p>
              </div>
            </div>

            <p className="mb-4 text-gray-600">
              Password reset, active sessions and multi-factor authentication
              can be connected in a later step.
            </p>

            <Link
              href="/login"
              className="inline-block rounded-xl border border-gray-200 px-4 py-3 hover:bg-gray-50"
            >
              Go to Login
            </Link>
          </section>

          <section className={card}>
            <div className="mb-5 flex items-center gap-3">
              <Palette className="text-blue-600" />
              <div>
                <h2 className="font-semibold">Appearance</h2>
                <p className="text-sm text-gray-500">Interface theme</p>
              </div>
            </div>

            <p className="mb-4 text-sm text-gray-600">
              Current theme:{" "}
              <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setTheme("light");
                  setMessage("");
                }}
                aria-pressed={theme === "light"}
                className={`${themeButton} ${
                  theme === "light"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Sun size={19} />
                Light Mode
                {theme === "light" && <Check size={17} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTheme("dark");
                  setMessage("");
                }}
                aria-pressed={theme === "dark"}
                className={`${themeButton} ${
                  theme === "dark"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Moon size={19} />
                Dark Mode
                {theme === "dark" && <Check size={17} />}
              </button>
            </div>
          </section>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={saveSettings}
              disabled={!loaded}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={18} />
              Save Settings
            </button>

            {message && (
              <p role="status" className="text-sm text-gray-600">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}