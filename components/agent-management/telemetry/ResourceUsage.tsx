"use client";

const resources = [
  { name: "Compute", value: 72 },
  { name: "Memory", value: 61 },
  { name: "Tokens", value: 43 },
  { name: "Network", value: 35 },
];

export default function ResourceUsage() {
  return (
    <section className="rounded-xl border border-white/10 bg-[#101927] p-4 text-white">
      <h2 className="text-sm font-semibold">Resource Utilization</h2>
      <p className="mt-1 text-xs text-gray-400">
        Illustrative demo values
      </p>

      <div className="mt-5 space-y-5">
        {resources.map((resource) => (
          <div key={resource.name}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-gray-300">{resource.name}</span>
              <span className="text-cyan-400">{resource.value}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400"
                style={{ width: `${resource.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}