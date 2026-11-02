"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  ListTodo,
  ShieldCheck,
  Activity,
  Lock,
  Wrench,
  Users,
  Plus,
  Network,
  ArrowLeft,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/agent-management",
    icon: LayoutDashboard,
  },
  {
    name: "Agents",
    href: "/agent-management/agents",
    icon: Bot,
  },
  {
    name: "Tasks",
    href: "/agent-management/tasks",
    icon: ListTodo,
  },
  {
    name: "Approvals",
    href: "/agent-management/approvals",
    icon: ShieldCheck,
  },
  {
    name: "Monitoring",
    href: "/agent-management/monitoring",
    icon: Activity,
  },
  {
    name: "Security",
    href: "/agent-management/security",
    icon: Lock,
  },
  {
    name: "Tools & Integrations",
    href: "/agent-management/tools",
    icon: Wrench,
  },
  {
    name: "Team & Access",
    href: "/agent-management/team",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-[var(--border)] bg-background text-foreground sm:w-64">

      {/* Branding */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-[var(--border)] px-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <Network size={22} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold tracking-tight">
            AI Agent <span className="text-blue-600">Control</span>
          </h1>

          <p className="text-xs text-[var(--muted)]">
            Enterprise Control Plane
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="border-b border-[var(--border)] p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-600"
        >
          <ArrowLeft size={19} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Workspace Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-4">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/agent-management"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "border-blue-500/20 bg-blue-500/10 text-blue-600"
                    : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-foreground"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-blue-600"
                      : "opacity-75 group-hover:text-blue-600"
                  }
                />

                <span className="min-w-0 flex-1 truncate">
                  {item.name}
                </span>

                {isActive && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Add Agent */}
      <div className="shrink-0 border-t border-[var(--border)] p-4">
        <Link
          href="/agent-management/add-agent"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Agent
        </Link>

        <p className="mt-4 text-center text-[11px] text-[var(--muted)]">
          AI Agent Control Platform
        </p>
      </div>
    </aside>
  );
}