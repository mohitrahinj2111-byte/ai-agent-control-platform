"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock3,
  FileText,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Network,
  Plus,
  Search,
  Settings,
  Shield,
  SlidersHorizontal,
  Users,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

const departments = [
  {
    name: "Operations",
    agents: 48,
    color: "blue",
    agentsList: ["Process Agent", "Workflow Agent"],
  },
  {
    name: "IT & Infrastructure",
    agents: 32,
    color: "cyan",
    agentsList: ["IT Support Agent", "DevOps Agent"],
  },
  {
    name: "HR & People",
    agents: 20,
    color: "orange",
    agentsList: ["HR Assistant", "Recruitment Agent"],
  },
  {
    name: "Legal & Compliance",
    agents: 16,
    color: "red",
    agentsList: ["Policy Agent", "Risk Agent"],
  },
  {
    name: "Marketing",
    agents: 82,
    color: "blue",
    agentsList: ["Social Media Agent", "Content Agent"],
  },
  {
    name: "Sales",
    agents: 96,
    color: "blue",
    agentsList: ["Lead Gen Agent", "CRM Agent"],
  },
  {
    name: "Research & Analysis",
    agents: 108,
    color: "purple",
    agentsList: ["Market Research", "Data Analysis"],
  },
  {
    name: "Customer Support",
    agents: 80,
    color: "teal",
    agentsList: ["Chat Support", "Ticket Agent"],
  },
  {
    name: "Finance",
    agents: 30,
    color: "purple",
    agentsList: ["Finance Agent", "Expense Agent"],
  },
  {
    name: "Analytics",
    agents: 26,
    color: "purple",
    agentsList: ["BI Agent", "Reporting Agent"],
  },
  {
    name: "Procurement",
    agents: 14,
    color: "purple",
    agentsList: ["Vendor Agent", "Contract Agent"],
  },
  {
    name: "Investor Relations",
    agents: 10,
    color: "purple",
    agentsList: ["IR Research", "Report Agent"],
  },
];

const activity = [
  "Social Media Agent completed content research",
  "Lead Gen Agent sent report to CEO",
  "Data Analyzer completed data processing",
  "Email Agent waiting for human approval",
  "Support Agent resolved 3 tickets",
  "Security Alert: unusual data access blocked",
];

const approvals = [
  ["Content Agent", "Post campaign content"],
  ["Finance Agent", "Access to company data"],
  ["Email Agent", "Send to external client"],
  ["Data Analysis Agent", "Access to database"],
];

function StatusDot({ color = "green" }: { color?: string }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        color === "green"
          ? "bg-emerald-500"
          : color === "blue"
            ? "bg-blue-500"
            : color === "red"
              ? "bg-red-500"
              : "bg-amber-500"
      }`}
    />
  );
}

function StatCard({
  title,
  value,
  icon,
  type,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: "blue" | "green" | "gray" | "red" | "orange";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    gray: "bg-slate-100 text-slate-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${styles[type]}`}>{icon}</div>
        <div>
          <div className="text-xl font-bold text-slate-900">{value}</div>
          <div className="text-xs text-slate-500">{title}</div>
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({
  department,
}: {
  department: (typeof departments)[number];
}) {
  return (
    <div className="min-w-[185px] rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Building2 size={16} />
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">
                {department.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {department.agents} Agents
              </div>
            </div>
          </div>

          <Plus size={15} className="text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2">
        {department.agentsList.map((agent) => (
          <div
            key={agent}
            className="rounded-lg border border-slate-100 bg-slate-50 p-2"
          >
            <div className="truncate text-[11px] font-medium text-slate-700">
              {agent}
            </div>

            <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
              <StatusDot />
              Working
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-200 text-slate-400">
          <Plus size={16} />
        </div>
      </div>
    </div>
  );
}

export default function ControlPanel() {
  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-900">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 flex h-[68px] items-center gap-4 border-b border-slate-200 bg-white px-5">
        <div className="flex w-[205px] items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Bot size={22} />
          </div>

          <div className="text-lg font-bold tracking-tight">
            AI Agent Control Plane
          </div>
        </div>

        <button className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-medium">
          <Building2 size={18} className="text-blue-600" />
          Acme Corp
          <ChevronDown size={15} />
        </button>

        <div className="flex h-10 max-w-[360px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-400">
          <Search size={17} />
          <span>Search agents, tasks, tools, data, reports...</span>
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <StatCard
            title="Total Agents"
            value="450"
            icon={<Bot size={18} />}
            type="blue"
          />
          <StatCard
            title="Working"
            value="387"
            icon={<CircleDot size={18} />}
            type="green"
          />
          <StatCard
            title="Idle"
            value="32"
            icon={<Clock3 size={18} />}
            type="gray"
          />
          <StatCard
            title="Failed"
            value="18"
            icon={<XCircle size={18} />}
            type="red"
          />
          <StatCard
            title="Human Approval"
            value="13"
            icon={<AlertTriangle size={18} />}
            type="orange"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative rounded-lg p-2 hover:bg-slate-100">
            <Activity size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            A
          </div>

          <div className="hidden text-xs lg:block">
            <div className="font-semibold">Acme Corp</div>
            <div className="text-slate-500">Admin</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="sticky top-[68px] h-[calc(100vh-68px)] w-[205px] shrink-0 border-r border-slate-200 bg-white p-3">
          <nav className="space-y-1">
            {[
              [LayoutDashboard, "Dashboard"],
              [Network, "AI Architecture"],
              [Users, "Agents"],
              [FileText, "Tasks"],
              [CalendarDays, "Day Report"],
              [CheckCircle2, "Human Approvals"],
              [BarChart3, "Monitoring"],
              [Shield, "Security"],
              [Wrench, "Tools & Integrations"],
              [Users, "Team & Access"],
              [Settings, "Settings"],
            ].map(([Icon, label], index) => (
              <button
                key={String(label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  index === 1
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span>{String(label)}</span>

                {label === "Human Approvals" && (
                  <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    13
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1 p-5">
          {/* PAGE HEADER */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                AI Agent Architecture
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Visualize, manage and control your entire AI workforce
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Company View
              </button>

              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
                Department View
              </button>

              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
                Agent Type View
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
                View: Live
                <ChevronDown size={14} />
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                <Plus size={16} />
                Add Agent
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <MessageSquare size={16} />
                AI Control / Chat
              </button>
            </div>
          </div>

          {/* ARCHITECTURE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-5 grid gap-3 lg:grid-cols-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 lg:col-span-1">
                <Building2 className="mb-2 text-blue-600" size={28} />

                <div className="font-bold">Acme Corp</div>

                <div className="text-xs text-slate-500">
                  Global AI Workforce
                </div>

                <div className="mt-3 text-xl font-bold text-blue-700">
                  450
                </div>

                <div className="text-xs text-slate-500">AI Agents</div>
              </div>

              <div className="space-y-3 lg:col-span-1">
                {[
                  ["COO", "Operations & Execution", "120"],
                  ["CEO", "Strategy & Decision", "150"],
                  ["CFO", "Finance & Growth", "80"],
                ].map(([role, description, count]) => (
                  <div
                    key={role}
                    className="rounded-xl border border-blue-100 bg-blue-50/60 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-600 p-2 text-white">
                        <Users size={15} />
                      </div>

                      <div>
                        <div className="font-bold">{role}</div>
                        <div className="text-[10px] text-slate-500">
                          {description}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      {count} Agents
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {departments.map((department) => (
                    <DepartmentCard
                      key={department.name}
                      department={department}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture footer controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <StatusDot /> Working
                </span>

                <span className="flex items-center gap-1">
                  <StatusDot color="blue" /> Idle
                </span>

                <span className="flex items-center gap-1">
                  <StatusDot color="red" /> Failed
                </span>

                <span className="flex items-center gap-1">
                  <StatusDot color="orange" /> Human Approval
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-slate-200 p-2">
                  −
                </button>

                <span className="text-xs font-medium">80%</span>

                <button className="rounded-lg border border-slate-200 p-2">
                  +
                </button>

                <button className="rounded-lg border border-slate-200 p-2">
                  <SlidersHorizontal size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* LOWER DASHBOARD */}
          <div className="mt-4 grid gap-4 xl:grid-cols-4">
            {/* LIVE ACTIVITY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Live Activity Feed</h2>

                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <StatusDot />
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {activity.map((item, index) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-0.5 rounded-full bg-blue-50 p-2 text-blue-600">
                      {index === 5 ? (
                        <AlertTriangle size={14} />
                      ) : (
                        <Zap size={14} />
                      )}
                    </div>

                    <div>
                      <div className="text-xs leading-5 text-slate-700">
                        {item}
                      </div>

                      <div className="mt-1 text-[10px] text-slate-400">
                        {index * 3 + 2} min ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TODAY REPORT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Today&apos;s Report</h2>

                <button className="flex items-center gap-1 text-xs text-slate-500">
                  <CalendarDays size={14} />
                  Nov 29, 2024
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["1,248", "Total Tasks", "blue"],
                  ["1,086", "Completed", "green"],
                  ["56", "Failed", "red"],
                  ["106", "In Progress", "orange"],
                ].map(([number, label, color]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-slate-50 p-3"
                  >
                    <div
                      className={`text-xl font-bold ${
                        color === "green"
                          ? "text-emerald-600"
                          : color === "red"
                            ? "text-red-600"
                            : color === "orange"
                              ? "text-orange-600"
                              : "text-blue-600"
                      }`}
                    >
                      {number}
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-semibold">
                  Top Performing Agents
                </div>

                {[
                  ["Social Media Agent", "9.6/10"],
                  ["Lead Gen Agent", "9.4/10"],
                  ["Data Analysis Agent", "9.3/10"],
                  ["Support Agent", "9.1/10"],
                ].map(([name, score]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between border-b border-slate-100 py-2 text-xs"
                  >
                    <span>{name}</span>
                    <span className="font-semibold text-emerald-600">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* APPROVALS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Human Approvals</h2>

                <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                  Pending 13
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {approvals.map(([agent, task]) => (
                  <div
                    key={agent}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <div className="text-xs font-semibold">{agent}</div>

                    <div className="mt-1 text-[11px] text-slate-500">
                      {task}
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button className="rounded-md bg-emerald-500 px-3 py-1 text-[10px] font-semibold text-white">
                        Approve
                      </button>

                      <button className="rounded-md bg-red-500 px-3 py-1 text-[10px] font-semibold text-white">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AGENT DETAILS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Agent Details</h2>

                <button className="text-xs text-blue-600">View All</button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Bot size={25} />
                </div>

                <div>
                  <div className="text-sm font-bold">
                    Social Media Agent
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                    <StatusDot />
                    Working
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Department</span>
                  <span className="font-medium">Marketing</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Model</span>
                  <span className="font-medium">GPT-4o</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Tools</span>
                  <span className="font-medium">Instagram, X, TikTok</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Permissions</span>
                  <span className="font-medium">Read, Write, Analytics</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Today&apos;s Tasks</span>
                  <span className="font-medium">12/15 completed</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Rating</span>
                  <span className="font-semibold text-emerald-600">
                    8.8/10
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <button className="rounded-lg border border-slate-200 py-2 text-xs font-medium">
                  Pause
                </button>

                <button className="rounded-lg bg-red-500 py-2 text-xs font-semibold text-white">
                  Turn Off
                </button>

                <button className="rounded-lg border border-slate-200 py-2 text-xs font-medium">
                  History
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}