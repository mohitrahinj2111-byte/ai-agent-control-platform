"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  Clock3,
  GitBranch,
  Link2,
  LockKeyhole,
  Shield,
  Users,
  Workflow,
  Zap,
  UserRound,
  Settings,
  LogOut,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { createClient } from "@/lib/client";

const features = [
  {
    icon: Link2,
    title: "Connect & Discover",
    text: "Connect agents from different vendors, platforms and runtimes in one place.",
  },
  {
    icon: Shield,
    title: "Permissions & Security",
    text: "Manage access, apply security policies and control what agents can do.",
  },
  {
    icon: Workflow,
    title: "Coordinate & Approve",
    text: "Coordinate agent workflows and require human approval for sensitive actions.",
  },
  {
    icon: Activity,
    title: "Monitor & Govern",
    text: "Track activity, monitor performance and prepare for cost and compliance reporting.",
  },
];

const agents = [
  { name: "Customer Support Agent", vendor: "OpenAI", status: "Running" },
  { name: "Research Agent", vendor: "Anthropic", status: "Running" },
  { name: "Data Analyst Agent", vendor: "Google", status: "Running" },
  { name: "Marketing Agent", vendor: "Microsoft", status: "Pending" },
];

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (!error && data.user) {
        setEmail(data.user.email ?? null);
        const metadataName =
          data.user.user_metadata?.display_name ??
          data.user.user_metadata?.full_name ??
          "";

        setDisplayName(
          typeof metadataName === "string" ? metadataName : ""
        );
      } else {
        setEmail(null);
        setDisplayName("");
      }

      setAuthReady(true);
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;

      setEmail(session?.user.email ?? null);

      const metadataName =
        session?.user.user_metadata?.display_name ??
        session?.user.user_metadata?.full_name ??
        "";

      setDisplayName(
        typeof metadataName === "string" ? metadataName : ""
      );
    });

    return () => {
      active = false;
      subscription.unsubscribe();
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
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              A
            </span>
            <span className="text-lg font-bold tracking-tight sm:text-xl">
              AI Agent Control Platform
            </span>
          </Link>

          <nav className="order-3 flex w-full items-center justify-center gap-5 overflow-x-auto text-sm opacity-80 sm:order-2 sm:w-auto sm:gap-8">
            <Link href="/" className="whitespace-nowrap border-b-2 border-blue-600 py-2 font-semibold text-blue-500">
              Home
            </Link>
            <Link href="/control-panel" className="whitespace-nowrap hover:text-blue-500">
              Control Panel
            </Link>
            <Link href="#about" className="whitespace-nowrap hover:text-blue-500">
              About Us
            </Link>
            <Link href="#contact" className="whitespace-nowrap hover:text-blue-500">
              Contact
            </Link>
            <Link href="/settings" className="whitespace-nowrap hover:text-blue-500">
              Settings
            </Link>
          </nav>

          <div className="relative order-2 flex items-center gap-2 sm:order-3">
            {authReady && email ? (
              <>
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  aria-expanded={accountMenuOpen}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-semibold hover:bg-[var(--surface)]"
                >
                  <UserRound size={17} />
                  Account
                  <ChevronDown size={15} />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-[var(--border)] bg-background p-2 shadow-xl">
                    <div className="border-b border-[var(--border)] px-3 py-3">
                      <p className="truncate text-sm font-semibold">
                        {displayName || "Your account"}
                      </p>
                      <p className="mt-1 truncate text-xs opacity-65">
                        {email}
                      </p>
                    </div>

                    <Link
                      href="/settings"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-[var(--surface)]"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>

                    <Link
                      href="/login?mode=add"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-[var(--surface)]"
                    >
                      <UserPlus size={16} />
                      Add account
                    </Link>

                    <Link
                      href="/login?mode=switch"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-[var(--surface)]"
                    >
                      <Users size={16} />
                      Switch account
                    </Link>

                    <button
                      type="button"
                      onClick={() => void handleLogout()}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : authReady ? (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-500/10"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="h-10 w-28 animate-pulse rounded-lg bg-[var(--surface)]" />
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute right-0 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-500">
              <Zap size={15} />
              AI Agent Control Plane
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Control your company&apos;s{" "}
              <span className="text-blue-500">AI workforce.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 opacity-70">
              Connect, discover, control, secure, monitor and govern AI agents
              across different vendors, platforms and runtimes from one central
              control plane.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/control-panel"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Open Control Panel <ArrowRight size={18} />
              </Link>
              <Link
                href="#platform"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-4 font-semibold transition hover:opacity-80"
              >
                Explore Platform
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm opacity-75">
              {["Multi-vendor support", "Enterprise-focused", "Security-first"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                      <Check size={13} />
                    </span>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl shadow-blue-900/10 sm:p-5">
            <div className="flex items-center gap-1.5 border-b border-[var(--border)] pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-semibold opacity-70">
                AI Agent Control Platform
              </span>
            </div>

            <div className="grid gap-4 py-4 sm:grid-cols-[130px_1fr]">
              <aside className="hidden space-y-2 border-r border-[var(--border)] pr-3 sm:block">
                {[
                  ["Dashboard", Activity],
                  ["Agents", Bot],
                  ["Integrations", GitBranch],
                  ["Permissions", LockKeyhole],
                  ["Workflows", Workflow],
                  ["Monitoring", Activity],
                ].map(([label, Icon], index) => {
                  const ItemIcon = Icon as typeof Activity;
                  return (
                    <div
                      key={label as string}
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs ${
                        index === 0
                          ? "bg-blue-500/10 font-semibold text-blue-500"
                          : "opacity-65"
                      }`}
                    >
                      <ItemIcon size={14} />
                      {label as string}
                    </div>
                  );
                })}
              </aside>

              <div className="min-w-0">
                <h2 className="mb-3 font-bold">Overview</h2>

                <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                  {[
                    { label: "Total Agents", value: "—", icon: Bot },
                    { label: "Active", value: "—", icon: Zap },
                    { label: "Pending Approval", value: "—", icon: Clock3 },
                    { label: "Cost Tracking", value: "Ready to configure", icon: CircleDollarSign },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-[var(--border)] bg-background p-3"
                    >
                      <metric.icon size={17} className="mb-2 text-blue-500" />
                      <div className="text-sm font-bold">{metric.value}</div>
                      <div className="mt-1 text-[10px] leading-4 opacity-60">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-[var(--border)] bg-background p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold">Agent overview</h3>
                    <Link href="/control-panel" className="text-xs font-semibold text-blue-500">
                      Open panel
                    </Link>
                  </div>

                  {agents.map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center gap-2 border-t border-[var(--border)] py-3 first:border-0"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                        <Bot size={17} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-semibold">
                          {agent.name}
                        </div>
                        <div className="text-[10px] opacity-60">
                          {agent.vendor}
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          agent.status === "Running"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </div>
                  ))}
                  <p className="mt-2 text-[10px] leading-4 opacity-50">
                    Illustrative preview — live metrics are not connected here.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4 text-xs opacity-65">
              <span className="font-semibold">Designed for:</span>
              <span>Multiple vendors</span>
              <span>•</span>
              <span>Central oversight</span>
              <span>•</span>
              <span>Human approval</span>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
              Key features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One control plane for your{" "}
              <span className="text-blue-500">AI workforce</span>
            </h2>
            <p className="mt-4 leading-7 opacity-70">
              A central place to connect, manage, secure and scale AI agents
              across your organization.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <feature.icon size={23} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 opacity-70">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
              Built for oversight
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Give agents capabilities. Keep humans in control.
            </h2>
            <p className="mt-5 max-w-xl leading-7 opacity-70">
              As organizations adopt more AI agents, they need clear visibility
              into what is connected, what actions are allowed, and where human
              review is needed.
            </p>
            <Link
              href="/control-panel"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-500 hover:opacity-80"
            >
              Explore the Control Panel <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Access control", text: "Plan permissions for tools, data and systems.", icon: LockKeyhole },
              { title: "Human approval", text: "Design review steps for sensitive actions.", icon: Users },
              { title: "Activity visibility", text: "Work toward clear operational monitoring.", icon: Activity },
              { title: "Cost awareness", text: "Prepare for usage and cost reporting.", icon: CircleDollarSign },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--border)] bg-background p-5">
                <item.icon size={22} className="text-blue-500" />
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 opacity-70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-blue-600 p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Bring your AI workforce into view.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-blue-100">
              Start with the agents you have today and build toward centralized
              control, permissions and governance.
            </p>
          </div>
          <Link
            href={email ? "/control-panel" : "/signup"}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            {email ? "Open Control Panel" : "Get started"} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              A
            </span>
            <span>
              <span className="block text-sm font-bold">
                AI Agent Control Platform
              </span>
              <span className="block text-xs opacity-60">
                Control your company&apos;s AI workforce.
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap gap-5 text-sm opacity-70">
            <Link href="#about" className="hover:text-blue-500">About Us</Link>
            <Link href="#contact" className="hover:text-blue-500">Contact</Link>
            <Link href="/settings" className="hover:text-blue-500">Settings</Link>
            {!email && (
              <>
                <Link href="/login" className="hover:text-blue-500">Log in</Link>
                <Link href="/signup" className="hover:text-blue-500">Sign up</Link>
              </>
            )}
          </div>

          <p className="text-xs opacity-60">
            © 2026 AI Agent Control Platform
          </p>
        </div>
      </footer>
    </main>
  );
}