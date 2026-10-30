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
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#080D16] text-white">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <Network size={23} />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide">
            Agent<span className="text-cyan-400">Control</span>
          </h1>

          <p className="text-xs text-gray-500">
            Control Plane
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
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
                className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-all ${
                  isActive
                    ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                    : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Add Agent */}
      <div className="border-t border-white/10 p-4">
        <Link
          href="/control-panel/add-agent"
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
        >
          <Plus size={18} />
          Add New Agent
        </Link>

        <p className="mt-4 text-center text-xs text-gray-600">
          AI Agent Control Platform
        </p>
      </div>

    </aside>
  );
}