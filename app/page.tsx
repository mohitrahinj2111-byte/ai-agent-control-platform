export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-bold tracking-tight">
            Rahinj
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#platform" className="hover:text-slate-900">
              Platform
            </a>
            <a href="#security" className="hover:text-slate-900">
              Security
            </a>
            <a href="#about" className="hover:text-slate-900">
              About
            </a>
          </nav>

          <a
            href="/control-panel"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Open Control Panel
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            AI Agent Control Platform
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Control your company&apos;s
            <span className="text-blue-600"> AI workforce.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Connect, discover, control, secure, monitor and govern AI agents
            across your entire organization from one central control plane.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/control-panel"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
            >
              Open Control Panel
            </a>

            <a
              href="#platform"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
            >
              Explore Platform
            </a>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section
        id="platform"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              One control layer
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Manage your AI workforce from one place.
            </h2>

            <p className="mt-4 text-slate-600">
              As companies deploy more AI agents, they need a central layer
              to understand what those agents are doing and control what they
              are allowed to do.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Connect",
                text: "Connect agents from different vendors, platforms and internal systems.",
              },
              {
                title: "Control",
                text: "Pause, restrict, restart and manage agents from a central control plane.",
              },
              {
                title: "Secure",
                text: "Apply permissions, policies and human approval to sensitive actions.",
              },
              {
                title: "Monitor",
                text: "See agent activity, tasks, failures and operational status.",
              },
              {
                title: "Coordinate",
                text: "Understand how agents, teams and departments work together.",
              },
              {
                title: "Govern",
                text: "Track usage, costs, reports and the lifecycle of your AI workforce.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Enterprise control
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Give AI agents access.
            <br />
            Keep humans in control.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-slate-600">
            Sensitive actions can require human approval, while policies and
            permissions help control what agents can access and execute.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-5">
              <div className="font-semibold">Permissions</div>
              <div className="mt-1 text-sm text-slate-600">
                Control access to tools, data and systems.
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-5">
              <div className="font-semibold">Human Approval</div>
              <div className="mt-1 text-sm text-slate-600">
                Keep people in the loop for sensitive actions.
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-5">
              <div className="font-semibold">Monitoring</div>
              <div className="mt-1 text-sm text-slate-600">
                See what your AI workforce is doing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Rahinj. AI Agent Control Platform.</div>
          <div>Connect. Control. Govern.</div>
        </div>
      </footer>
    </main>
  );
}