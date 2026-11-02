"use client";

const activities = [
  {
    title: "Research Agent registered",
    time: "Demo event",
    status: "Completed",
  },
  {
    title: "Manager A workspace created",
    time: "Demo event",
    status: "Completed",
  },
  {
    title: "Worker Agent awaiting connection",
    time: "Demo event",
    status: "Pending",
  },
  {
    title: "Monitoring workspace initialized",
    time: "Demo event",
    status: "Active",
  },
];

export default function ActivityFeed() {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-foreground transition-colors">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Activity Feed</h2>
        <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
          DEMO
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />

            <div className="min-w-0 flex-1">
              <p className="text-sm">{activity.title}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {activity.time}
              </p>
            </div>

            <span className="text-xs text-[var(--muted)]">
              {activity.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}