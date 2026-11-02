import type { ReactNode } from "react";
import "@xyflow/react/dist/style.css";

import Sidebar from "@/components/agent-management/layout/sidebar";
import Header from "@/components/agent-management/layout/Header";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Application */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Global Header */}
        <Header />

        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden bg-background p-4 sm:p-5 md:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}