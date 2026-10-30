import type { ReactNode } from "react";
import "@xyflow/react/dist/style.css";

import DashboardShell from "@/components/agent-management/layout/DashboardShell";

interface AgentManagementLayoutProps {
  children: ReactNode;
}

export default function AgentManagementLayout({
  children,
}: AgentManagementLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}