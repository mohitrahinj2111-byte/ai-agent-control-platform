"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  Plus,
  RefreshCw,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/client";

type Agent = {
  agent_id: string;
  agent_name: string;
  description: string | null;
  department: string | null;
  runtime: string | null;
  connection_endpoint: string | null;
  connection_method: string | null;
  created_at?: string;
};

type AgentsResponse = {
  status: string;
  count: number;
  agents: Agent[];
};

const API_URL =
  "https://ai-agent-control-platform.onrender.com/api/agents";

export default function AgentsPage() {
  const router = useRouter();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAgents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error("Unable to verify your login session.");
      }

      if (!session) {
        router.replace("/login");
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (response.status === 401) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Unable to load agents. Server returned ${response.status}.`
        );
      }

      const result: AgentsResponse = await response.json();

      if (!Array.isArray(result.agents)) {
        throw new Error("Invalid agent data received from the server.");
      }

      setAgents(result.agents);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading agents."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadAgents();
  }, [loadAgents]);

  const totalAgents = agents.length;

  // Backend currently does not provide verified connection status.
  const connectedAgents = 0;
  const disconnectedAgents = 0;
  const unverifiedAgents = totalAgents;

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="mt-2 text-gray-400">
            Discover, manage and monitor your AI workforce.
          </p>
        </div>

        <Link
          href="/agent-management/add-agent"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Add Agent
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-center gap-3 text-sm text-red-300">
            <AlertCircle size={20} />
            {error}
          </div>

          <button
            type="button"
            onClick={() => void loadAgents()}
            className="rounded-lg border border-red-400/30 px-3 py-2 text-sm hover:bg-red-500/10"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Agents", value: totalAgents },
          { label: "Connected", value: connectedAgents },
          { label: "Disconnected", value: disconnectedAgents },
          { label: "Not Verified", value: unverifiedAgents },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-[#101927] p-5"
          >
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className="mt-3 text-3xl font-bold">
              {loading ? "—" : item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Agent List */}
      <div className="rounded-xl border border-white/10 bg-[#101927] p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">All Agents</h2>
            <p className="mt-1 text-sm text-gray-400">
              Your registered agent workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadAgents()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">
            Loading your agents...
          </div>
        ) : agents.length === 0 && !error ? (
          <div className="rounded-xl border border-dashed border-white/15 bg-[#080D16] px-5 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Bot size={32} />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              No agents registered yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              Your agent workspace is empty. Add your first AI agent to start
              managing your AI workforce from one place.
            </p>

            <Link
              href="/agent-management/add-agent"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
            >
              <Plus size={17} />
              Add Agent
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent) => (
              <div
                key={agent.agent_id}
                className="rounded-xl border border-white/10 bg-[#080D16] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Bot size={21} />
                    </div>

                    <h3 className="break-words font-semibold">
                      {agent.agent_name}
                    </h3>
                  </div>

                  <span className="shrink-0 rounded-full bg-gray-500/10 px-3 py-1 text-xs text-gray-300">
                    Not verified
                  </span>
                </div>

                <p className="mt-4 min-h-10 text-sm text-gray-400">
                  {agent.description || "No description provided."}
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-gray-400">
                    Type:{" "}
                    <span className="text-white">
                      {agent.department || "Not specified"}
                    </span>
                  </p>

                  <p className="text-gray-400">
                    Runtime:{" "}
                    <span className="text-white">
                      {agent.runtime || "Not specified"}
                    </span>
                  </p>

                  <p className="text-gray-400">
                    ID:{" "}
                    <span className="break-all text-white">
                      {agent.agent_id}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/agent-management/agents/${encodeURIComponent(agent.agent_id)}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-blue-500/40 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10"
                >
                  View Details
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}