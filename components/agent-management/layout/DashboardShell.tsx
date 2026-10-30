import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-[#080D16] text-white">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Dashboard Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Top Header */}
        <Header />

        {/* Page Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden p-5 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}