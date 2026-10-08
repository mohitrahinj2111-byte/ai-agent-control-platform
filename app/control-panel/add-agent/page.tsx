"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  FileText,
  Link2,
  Lock,
  Shield,
  ShieldCheck,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";

/* ========================================================================= */
/* TYPES                                                                     */
/* ========================================================================= */

type FileItem = {
  name: string;
  size: number;
  type: string;
};

type AgentData = {
  agentName: string;
  description: string;
  role: string;
  department: string;

  runtime: string;

  connectionType: string;
  endpoint: string;

  capabilities: string[];
  permissions: string[];

  tools: string[];
  customToolInstructions: string;
  customToolFiles: FileItem[];

  policies: string[];
  companyPolicies: string[];

  dataSecurity: string[];
  dataSecurityInstructions: string[];

  documents: FileItem[];

  limitations: string[];

  terms: string;
  termsFiles: FileItem[];

  confirmed: boolean;
};

/* ========================================================================= */
/* STEPS                                                                     */
/* ========================================================================= */

const steps = [
  "Agent Information",
  "Runtime",
  "Connection",
  "Capabilities",
  "Permissions",
  "Tools",
  "Policies",
  "Data & Security",
  "Documents",
  "Limitations",
  "Terms & Conditions",
  "Confirm",
] as const;

/* ========================================================================= */
/* OPTIONS                                                                   */
/* ========================================================================= */

const departmentOptions = [
  "Engineering",
  "Sales",
  "Marketing",
  "Customer Success",
  "Customer Support",
  "Finance",
  "Human Resources",
  "Operations",
  "Legal",
  "IT",
  "Security",
  "Product",
  "Research",
  "Other",
];

const runtimeOptions = [
  "OpenAI",
  "Anthropic",
  "Google",
  "Microsoft",
  "AWS",
  "Azure",
  "Self-hosted",
  "Other",
];

const connectionOptions = [
  "API",
  "Webhook",
  "SDK",
  "Platform Connector",
  "Self-hosted Connection",
];

const capabilityOptions = [
  "Text Generation",
  "Reasoning",
  "Code Generation",
  "Data Analysis",
  "Research",
  "Document Analysis",
  "Summarization",
  "Classification",
  "Planning",
  "Decision Support",
];

const permissionOptions = [
  "Read Data",
  "Write Data",
  "Create Records",
  "Update Records",
  "Delete Records",
  "Execute Actions",
  "Access Internal Systems",
  "Send Messages",
];

const toolOptions = [
  "Web Search",
  "Database",
  "Email",
  "Calendar",
  "CRM",
  "Code Execution",
  "File System",
  "Browser",
];

const policyOptions = [
  "Human Approval Required",
  "No Sensitive Data Access",
  "No External Communication",
  "Restricted Tool Usage",
  "Audit All Actions",
  "Require Authentication",
  "Restricted Data Access",
];

const securityOptions = [
  "Encryption Required",
  "PII Protection",
  "Access Logging",
  "Data Retention Rules",
  "Network Restrictions",
  "Secret Protection",
  "Identity Verification",
];

const limitationOptions = [
  "No Autonomous Decisions",
  "No Financial Transactions",
  "No Deletion Without Approval",
  "No External Account Changes",
  "No Sensitive Data Export",
  "No Production Changes",
  "Rate Limited",
];

/* ========================================================================= */
/* INITIAL DATA                                                              */
/* ========================================================================= */

const initialData: AgentData = {
  agentName: "",
  description: "",
  role: "",
  department: "",

  runtime: "",

  connectionType: "",
  endpoint: "",

  capabilities: [],
  permissions: [],

  tools: [],
  customToolInstructions: "",
  customToolFiles: [],

  policies: [],
  companyPolicies: [],

  dataSecurity: [],
  dataSecurityInstructions: [],

  documents: [],

  limitations: [],

  terms: "",
  termsFiles: [],

  confirmed: false,
};

/* ========================================================================= */
/* HELPERS                                                                   */
/* ========================================================================= */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function filesFromInput(
  event: ChangeEvent<HTMLInputElement>,
): FileItem[] {
  return Array.from(event.target.files ?? []).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));
}

/* ========================================================================= */
/* PAGE                                                                      */
/* ========================================================================= */

export default function AddAgentPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AgentData>(initialData);
  const [error, setError] = useState("");

  const progress = ((step + 1) / steps.length) * 100;

  /* ----------------------------------------------------------------------- */
  /* UPDATE                                                                  */
  /* ----------------------------------------------------------------------- */

  const update = <K extends keyof AgentData>(
    key: K,
    value: AgentData[K],
  ) => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  };

  /* ----------------------------------------------------------------------- */
  /* MULTI SELECT                                                            */
  /* ----------------------------------------------------------------------- */

  const toggleMultiple = (
    key:
      | "capabilities"
      | "permissions"
      | "tools"
      | "policies"
      | "dataSecurity"
      | "limitations",
    value: string,
  ) => {
    setData((current) => {
      const currentValues = current[key];

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...current,
        [key]: nextValues,
      };
    });

    setError("");
  };

  /* ----------------------------------------------------------------------- */
  /* VALIDATION                                                              */
  /* ----------------------------------------------------------------------- */

  const validateStep = (): string => {
    switch (step) {
      case 0:
        if (!data.agentName.trim()) {
          return "Agent name is required.";
        }

        if (!data.description.trim()) {
          return "Agent description is required.";
        }

        if (!data.role.trim()) {
          return "Agent role is required.";
        }

        if (!data.department) {
          return "Please select a department.";
        }

        return "";

      case 1:
        if (!data.runtime) {
          return "Please select a runtime.";
        }

        return "";

      case 2:
        if (!data.connectionType) {
          return "Please select a connection type.";
        }

        if (!data.endpoint.trim()) {
          return "Connection endpoint is required.";
        }

        return "";

      case 3:
        if (data.capabilities.length === 0) {
          return "Please select at least one capability.";
        }

        return "";

      case 4:
        if (data.permissions.length === 0) {
          return "Please select at least one permission.";
        }

        return "";

      case 5:
        if (
          data.tools.length === 0 &&
          !data.customToolInstructions.trim() &&
          data.customToolFiles.length === 0
        ) {
          return "Please select at least one tool or add a custom tool.";
        }

        return "";

      case 6:
        if (
          data.policies.length === 0 &&
          data.companyPolicies.length === 0
        ) {
          return "Select at least one policy or add a company policy.";
        }

        return "";

      case 7:
        if (
          data.dataSecurity.length === 0 &&
          data.dataSecurityInstructions.length === 0
        ) {
          return "Select at least one security rule or add custom security instructions.";
        }

        return "";

      case 8:
        if (data.documents.length === 0) {
          return "Please add at least one document.";
        }

        return "";

      case 9:
        if (data.limitations.length === 0) {
          return "Please select at least one limitation.";
        }

        return "";

      case 10:
        if (
          !data.terms.trim() &&
          data.termsFiles.length === 0
        ) {
          return "Please add company terms and conditions or upload a file.";
        }

        return "";

      case 11:
        if (!data.confirmed) {
          return "Please confirm that the information is correct before connecting the agent.";
        }

        return "";

      default:
        return "";
    }
  };

  /* ----------------------------------------------------------------------- */
  /* CONTINUE                                                                */
  /* ----------------------------------------------------------------------- */

  const handleContinue = () => {
    const validationError = validateStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
    }
  };

  /* ----------------------------------------------------------------------- */
  /* BACK                                                                    */
  /* ----------------------------------------------------------------------- */

  const handleBack = () => {
    setError("");

    if (step > 0) {
      setStep((current) => current - 1);
    }
  };

  /* ----------------------------------------------------------------------- */
  /* STEP NAVIGATION                                                         */
  /* ----------------------------------------------------------------------- */

  const goToStep = (index: number) => {
    if (index >= step) {
      return;
    }

    setError("");
    setStep(index);
  };

  /* ----------------------------------------------------------------------- */
  /* DOCUMENTS                                                               */
  /* ----------------------------------------------------------------------- */

  const addDocuments = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = filesFromInput(event);

    if (files.length === 0) {
      return;
    }

    update("documents", [
      ...data.documents,
      ...files,
    ]);

    event.target.value = "";
  };

  const addTermsFiles = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = filesFromInput(event);

    if (files.length === 0) {
      return;
    }

    update("termsFiles", [
      ...data.termsFiles,
      ...files,
    ]);

    event.target.value = "";
  };

  const addCustomToolFiles = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = filesFromInput(event);

    if (files.length === 0) {
      return;
    }

    update("customToolFiles", [
      ...data.customToolFiles,
      ...files,
    ]);

    event.target.value = "";
  };

  /* ----------------------------------------------------------------------- */
  /* REMOVE FILES                                                            */
  /* ----------------------------------------------------------------------- */

  const removeDocument = (index: number) => {
    update(
      "documents",
      data.documents.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  const removeTermsFile = (index: number) => {
    update(
      "termsFiles",
      data.termsFiles.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  const removeCustomToolFile = (index: number) => {
    update(
      "customToolFiles",
      data.customToolFiles.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  /* ----------------------------------------------------------------------- */
  /* SUMMARY                                                                 */
  /* ----------------------------------------------------------------------- */

  const summary = useMemo<Array<[string, string]>>(
    () => [
      ["Agent Name", data.agentName],
      ["Description", data.description],
      ["Role", data.role],
      ["Department", data.department],
      ["Runtime", data.runtime],
      ["Connection Type", data.connectionType],
      ["Endpoint", data.endpoint],

      [
        "Capabilities",
        data.capabilities.join(", ") || "None",
      ],

      [
        "Permissions",
        data.permissions.join(", ") || "None",
      ],

      [
        "Tools",
        data.tools.join(", ") || "None",
      ],

      [
        "Custom Tool Instructions",
        data.customToolInstructions || "None",
      ],

      [
        "Custom Tool Files",
        data.customToolFiles
          .map((file) => file.name)
          .join(", ") || "None",
      ],

      [
        "Policies",
        data.policies.join(", ") || "None",
      ],

      [
        "Company Policies",
        data.companyPolicies.join("\n") || "None",
      ],

      [
        "Data & Security",
        data.dataSecurity.join(", ") || "None",
      ],

      [
        "Security Instructions",
        data.dataSecurityInstructions.join("\n") ||
          "None",
      ],

      [
        "Documents",
        data.documents
          .map((file) => file.name)
          .join(", ") || "None",
      ],

      [
        "Limitations",
        data.limitations.join(", ") || "None",
      ],

      [
        "Terms & Conditions",
        data.terms || "Uploaded document",
      ],

      [
        "Terms Files",
        data.termsFiles
          .map((file) => file.name)
          .join(", ") || "None",
      ],
    ],
    [data],
  );

  /* ----------------------------------------------------------------------- */
  /* CONNECT                                                                 */
  /* ----------------------------------------------------------------------- */

  const handleConnect = () => {
    const validationError = validateStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    alert(
      "Existing AI agent is ready to be connected. Backend integration will be added next.",
    );
  };

  /* ========================================================================= */
  /* RENDER                                                                    */
  /* ========================================================================= */

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-900">

      {/* =================================================================== */}
      {/* HEADER                                                              */}
      {/* =================================================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex w-full max-w-[1550px] items-center justify-between px-6 py-5 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Bot size={23} />
            </div>

            <div className="min-w-0">

              <div className="truncate text-lg font-bold text-slate-900">
                Connect Existing Agent
              </div>

              <div className="text-xs text-slate-500">
                Connect and configure an existing AI agent
              </div>

            </div>

          </div>

          <div className="ml-4 shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
            Step {step + 1} of {steps.length}
          </div>

        </div>

      </header>

      {/* =================================================================== */}
      {/* MAIN WIZARD AREA                                                    */}
      {/* =================================================================== */}

      <div className="mx-auto w-full max-w-[1550px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        <div className="min-h-[760px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

          {/* =============================================================== */}
          {/* PROGRESS / 12 STEP NAVIGATION                                    */}
          {/* =============================================================== */}

          <section className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7 lg:px-9">

            {/* Progress information */}

            <div className="mb-5 flex items-center justify-between gap-4">

              <div>

                <div className="text-sm font-bold text-slate-900">
                  Agent setup progress
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Step {step + 1} of {steps.length} completed
                </div>

              </div>

              <div className="shrink-0 text-sm font-bold text-blue-600">
                {Math.round(progress)}%
              </div>

            </div>

            {/* Progress bar */}

            <div className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            {/* ============================================================= */}
            {/* IMPORTANT: 12 STEP GRID                                       */}
            {/* ============================================================= */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

              {steps.map((item, index) => {

                const isCurrent = index === step;
                const isCompleted = index < step;
                const isLocked = index > step;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => goToStep(index)}
                    disabled={isLocked}
                    className={`group min-h-[72px] w-full rounded-xl border p-3 text-left transition-all ${
                      isCurrent
                        ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                        : isCompleted
                          ? "border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-300 hover:bg-blue-100"
                          : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      {/* Number / check */}

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          isCurrent
                            ? "bg-white text-blue-600"
                            : isCompleted
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={15} strokeWidth={3} />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Step title */}

                      <div className="min-w-0 flex-1 pt-0.5">

                        <div
                          className={`text-[11px] font-semibold uppercase tracking-wide ${
                            isCurrent
                              ? "text-blue-100"
                              : isCompleted
                                ? "text-blue-500"
                                : "text-slate-400"
                          }`}
                        >
                          Step {index + 1}
                        </div>

                        <div
                          className={`mt-1 break-words text-sm font-bold leading-5 ${
                            isCurrent
                              ? "text-white"
                              : isCompleted
                                ? "text-blue-800"
                                : "text-slate-500"
                          }`}
                        >
                          {item}
                        </div>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </section>

          {/* =============================================================== */}
          {/* STEP CONTENT                                                     */}
          {/* =============================================================== */}

          <section className="px-5 py-7 sm:px-7 lg:px-10 lg:py-9">

            {/* ============================================================= */}
            {/* STEP HEADER                                                    */}
            {/* ============================================================= */}

            <div className="mb-7 border-b border-slate-100 pb-6">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  {step === 0 && <Bot size={23} />}
                  {step === 1 && <Bot size={23} />}
                  {step === 2 && <Link2 size={23} />}
                  {step === 3 && <Wrench size={23} />}
                  {step === 4 && <Shield size={23} />}
                  {step === 5 && <Wrench size={23} />}
                  {step === 6 && <ShieldCheck size={23} />}
                  {step === 7 && <Lock size={23} />}
                  {step === 8 && <FileText size={23} />}
                  {step === 9 && <Shield size={23} />}
                  {step === 10 && <FileText size={23} />}
                  {step === 11 && (
                    <CheckCircle2 size={23} />
                  )}

                </div>

                <div className="min-w-0">

                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {steps[step]}
                  </h1>

                  <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">

                    {step === 0 &&
                      "Tell us the basic information about this AI agent."}

                    {step === 1 &&
                      "Choose where this agent operates."}

                    {step === 2 &&
                      "Configure how the control plane connects to the existing agent."}

                    {step === 3 &&
                      "Select everything this agent should be capable of doing."}

                    {step === 4 &&
                      "Define what the agent is allowed to access and perform."}

                    {step === 5 &&
                      "Choose the tools this agent can use."}

                    {step === 6 &&
                      "Define the policies this agent must follow."}

                    {step === 7 &&
                      "Configure data protection and security requirements."}

                    {step === 8 &&
                      "Add documents that the agent can use or reference."}

                    {step === 9 &&
                      "Define actions and areas that are restricted."}

                    {step === 10 &&
                      "Add your company's terms and conditions for the AI agent."}

                    {step === 11 &&
                      "Review everything before connecting the agent."}

                  </p>

                </div>

              </div>

            </div>

            {/* ============================================================= */}
            {/* STEP BODY                                                      */}
            {/* ============================================================= */}

            <div className="min-h-[430px]">

              {/* =========================================================== */}
              {/* STEP 1 — AGENT INFORMATION                                  */}
              {/* =========================================================== */}

              {step === 0 && (
                <div className="space-y-6">

                  <RequiredInput
                    label="Agent name"
                    value={data.agentName}
                    onChange={(value) =>
                      update("agentName", value)
                    }
                    placeholder="e.g. Sales Research Agent"
                  />

                  <RequiredTextarea
                    label="Description"
                    value={data.description}
                    onChange={(value) =>
                      update("description", value)
                    }
                    placeholder="Describe what this AI agent does..."
                  />

                  <div className="grid gap-6 md:grid-cols-2">

                    <RequiredInput
                      label="Agent role"
                      value={data.role}
                      onChange={(value) =>
                        update("role", value)
                      }
                      placeholder="e.g. Sales Research"
                    />

                    <RequiredSelect
                      label="Department"
                      value={data.department}
                      options={departmentOptions}
                      onChange={(value) =>
                        update("department", value)
                      }
                      placeholder="Select department"
                    />

                  </div>

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 2 — RUNTIME                                             */}
              {/* =========================================================== */}

              {step === 1 && (
                <SingleChoice
                  title="Select one runtime"
                  options={runtimeOptions}
                  value={data.runtime}
                  onChange={(value) =>
                    update("runtime", value)
                  }
                />
              )}

              {/* =========================================================== */}
              {/* STEP 3 — CONNECTION                                          */}
              {/* =========================================================== */}

              {step === 2 && (
                <div className="space-y-7">

                  <SingleChoice
                    title="Connection type"
                    options={connectionOptions}
                    value={data.connectionType}
                    onChange={(value) =>
                      update("connectionType", value)
                    }
                  />

                  <RequiredInput
                    label="Connection endpoint"
                    value={data.endpoint}
                    onChange={(value) =>
                      update("endpoint", value)
                    }
                    placeholder="https://api.example.com/..."
                  />

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                    <div className="flex gap-3">

                      <Link2
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div>

                        <div className="text-sm font-semibold text-blue-900">
                          Connection information
                        </div>

                        <div className="mt-1 text-xs leading-5 text-blue-700">
                          The control plane will use this connection
                          information to communicate with the existing
                          agent. Authentication credentials should be
                          handled securely by the backend.
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 4 — CAPABILITIES                                        */}
              {/* =========================================================== */}

              {step === 3 && (
                <MultipleChoice
                  title="Select one or more capabilities"
                  options={capabilityOptions}
                  selected={data.capabilities}
                  onToggle={(value) =>
                    toggleMultiple(
                      "capabilities",
                      value,
                    )
                  }
                />
              )}

              {/* =========================================================== */}
              {/* STEP 5 — PERMISSIONS                                         */}
              {/* =========================================================== */}

              {step === 4 && (
                <MultipleChoice
                  title="Select the permissions this agent should have"
                  options={permissionOptions}
                  selected={data.permissions}
                  onToggle={(value) =>
                    toggleMultiple(
                      "permissions",
                      value,
                    )
                  }
                />
              )}

              {/* =========================================================== */}
              {/* STEP 6 — TOOLS                                               */}
              {/* =========================================================== */}

              {step === 5 && (
                <div className="space-y-7">

                  <MultipleChoice
                    title="Select the tools this agent can use"
                    options={toolOptions}
                    selected={data.tools}
                    onToggle={(value) =>
                      toggleMultiple(
                        "tools",
                        value,
                      )
                    }
                  />

                  <div className="rounded-xl border border-slate-200 p-5">

                    <h3 className="font-semibold">
                      Custom tools
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Add instructions or documentation for a custom
                      tool used by this agent.
                    </p>

                    <textarea
                      value={data.customToolInstructions}
                      onChange={(event) =>
                        update(
                          "customToolInstructions",
                          event.target.value,
                        )
                      }
                      rows={5}
                      placeholder="Describe your custom tool..."
                      className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">

                      <Upload size={17} />

                      Upload custom tool file

                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.json,.txt"
                        multiple
                        onChange={addCustomToolFiles}
                      />

                    </label>

                    {data.customToolFiles.length > 0 && (
                      <div className="mt-4 space-y-3">

                        {data.customToolFiles.map(
                          (file, index) => (
                            <FileRow
                              key={`${file.name}-${index}`}
                              file={file}
                              onRemove={() =>
                                removeCustomToolFile(index)
                              }
                            />
                          ),
                        )}

                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 7 — POLICIES                                            */}
              {/* =========================================================== */}

              {step === 6 && (
                <div className="space-y-7">

                  <MultipleChoice
                    title="Select policies"
                    options={policyOptions}
                    selected={data.policies}
                    onToggle={(value) =>
                      toggleMultiple(
                        "policies",
                        value,
                      )
                    }
                  />

                  <div className="rounded-xl border border-slate-200 p-5">

                    <h3 className="font-semibold">
                      Company policy instructions
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Add additional policies that are specific to
                      your company.
                    </p>

                    <textarea
                      value={data.companyPolicies.join("\n")}
                      onChange={(event) =>
                        update(
                          "companyPolicies",
                          event.target.value
                            .split("\n")
                            .filter(
                              (line) =>
                                line.trim().length > 0,
                            ),
                        )
                      }
                      rows={6}
                      placeholder="Write your company's AI policy here..."
                      className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 8 — DATA & SECURITY                                     */}
              {/* =========================================================== */}

              {step === 7 && (
                <div className="space-y-7">

                  <MultipleChoice
                    title="Select data & security requirements"
                    options={securityOptions}
                    selected={data.dataSecurity}
                    onToggle={(value) =>
                      toggleMultiple(
                        "dataSecurity",
                        value,
                      )
                    }
                  />

                  <div className="rounded-xl border border-slate-200 p-5">

                    <h3 className="font-semibold">
                      Custom data & security instructions
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Add security requirements specific to your
                      company.
                    </p>

                    <textarea
                      value={data.dataSecurityInstructions.join(
                        "\n",
                      )}
                      onChange={(event) =>
                        update(
                          "dataSecurityInstructions",
                          event.target.value
                            .split("\n")
                            .filter(
                              (line) =>
                                line.trim().length > 0,
                            ),
                        )
                      }
                      rows={6}
                      placeholder="Write your data and security instructions..."
                      className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 9 — DOCUMENTS                                           */}
              {/* =========================================================== */}

              {step === 8 && (
                <div className="space-y-6">

                  <FileUpload
                    label="Add documents"
                    description="PDF, DOC or DOCX files"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={addDocuments}
                  />

                  {data.documents.length > 0 && (
                    <div className="space-y-3">

                      <h3 className="font-semibold">
                        Selected documents
                      </h3>

                      {data.documents.map(
                        (file, index) => (
                          <FileRow
                            key={`${file.name}-${index}`}
                            file={file}
                            onRemove={() =>
                              removeDocument(index)
                            }
                          />
                        ),
                      )}

                    </div>
                  )}

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 10 — LIMITATIONS                                        */}
              {/* =========================================================== */}

              {step === 9 && (
                <MultipleChoice
                  title="Select the limitations for this agent"
                  options={limitationOptions}
                  selected={data.limitations}
                  onToggle={(value) =>
                    toggleMultiple(
                      "limitations",
                      value,
                    )
                  }
                />
              )}

              {/* =========================================================== */}
              {/* STEP 11 — TERMS                                               */}
              {/* =========================================================== */}

              {step === 10 && (
                <div className="space-y-6">

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                    <div className="flex gap-3">

                      <ShieldCheck
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div>

                        <h3 className="font-semibold">
                          Company Terms & Conditions
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Define the terms and conditions that this
                          AI agent must follow.
                        </p>

                      </div>

                    </div>

                  </div>

                  <textarea
                    value={data.terms}
                    onChange={(event) =>
                      update(
                        "terms",
                        event.target.value,
                      )
                    }
                    rows={10}
                    placeholder="Write your company's AI terms and conditions here..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <FileUpload
                    label="Upload Terms & Conditions"
                    description="PDF, DOC or DOCX"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={addTermsFiles}
                  />

                  {data.termsFiles.length > 0 && (
                    <div className="space-y-3">

                      <h3 className="font-semibold">
                        Uploaded terms files
                      </h3>

                      {data.termsFiles.map(
                        (file, index) => (
                          <FileRow
                            key={`${file.name}-${index}`}
                            file={file}
                            onRemove={() =>
                              removeTermsFile(index)
                            }
                          />
                        ),
                      )}

                    </div>
                  )}

                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 12 — CONFIRM                                             */}
              {/* =========================================================== */}

              {step === 11 && (
                <div className="space-y-6">

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">

                    <div className="flex gap-3">

                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <div>

                        <h3 className="font-semibold">
                          Review Existing AI Agent
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Review all information before connecting
                          the existing agent to the control plane.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="grid gap-4 md:grid-cols-2">

                    {summary.map(
                      ([label, value]) => (
                        <div
                          key={label}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                        >

                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {label}
                          </div>

                          <div className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-800">
                            {value || "Not specified"}
                          </div>

                        </div>
                      ),
                    )}

                  </div>

                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="checkbox"
                        checked={data.confirmed}
                        onChange={(event) =>
                          update(
                            "confirmed",
                            event.target.checked,
                          )
                        }
                        className="mt-1 h-4 w-4 rounded border-slate-300"
                      />

                      <span className="text-sm leading-6 text-slate-700">
                        I confirm that the information above is
                        correct and this AI agent should operate
                        according to the configured permissions,
                        policies, security rules and company terms.
                      </span>

                    </label>

                  </div>

                </div>
              )}

              {/* =========================================================== */}
              {/* ERROR                                                         */}
              {/* =========================================================== */}

              {error && (
                <div
                  role="alert"
                  className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

            </div>

          </section>

          {/* =============================================================== */}
          {/* FOOTER                                                          */}
          {/* =============================================================== */}

          <footer className="sticky bottom-0 flex items-center justify-between border-t border-slate-200 bg-white px-5 py-5 sm:px-7 lg:px-10">

            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {step < steps.length - 1 ? (

              <button
                type="button"
                onClick={handleContinue}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Continue
                <ArrowRight size={17} />
              </button>

            ) : (

              <button
                type="button"
                onClick={handleConnect}
                disabled={!data.confirmed}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={17} />
                Connect AI Agent
              </button>

            )}

          </footer>

        </div>

      </div>

    </main>
  );
}

/* ========================================================================= */
/* REQUIRED INPUT                                                            */
/* ========================================================================= */

function RequiredInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">

      <div className="mb-2.5 text-sm font-semibold text-slate-800">
        {label}{" "}
        <span className="text-red-500">*</span>
      </div>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </label>
  );
}

/* ========================================================================= */
/* REQUIRED SELECT                                                           */
/* ========================================================================= */

function RequiredSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">

      <div className="mb-2.5 text-sm font-semibold text-slate-800">
        {label}{" "}
        <span className="text-red-500">*</span>
      </div>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </label>
  );
}

/* ========================================================================= */
/* REQUIRED TEXTAREA                                                         */
/* ========================================================================= */

function RequiredTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">

      <div className="mb-2.5 text-sm font-semibold text-slate-800">
        {label}{" "}
        <span className="text-red-500">*</span>
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={5}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </label>
  );
}

/* ========================================================================= */
/* SINGLE CHOICE                                                             */
/* ========================================================================= */

function SingleChoice({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <div className="mb-5 text-sm font-semibold text-slate-800">
        {title}{" "}
        <span className="text-red-500">*</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {options.map((option) => (

          <label
            key={option}
            className={`flex min-h-[72px] cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
              value === option
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
            }`}
          >

            <input
              type="radio"
              name={title}
              value={option}
              checked={value === option}
              onChange={() =>
                onChange(option)
              }
              className="h-4 w-4 shrink-0"
            />

            <span className="text-sm font-medium text-slate-800">
              {option}
            </span>

          </label>

        ))}

      </div>

    </div>
  );
}

/* ========================================================================= */
/* MULTIPLE CHOICE                                                           */
/* ========================================================================= */

function MultipleChoice({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>

      <div className="mb-5 text-sm font-semibold text-slate-800">
        {title}{" "}
        <span className="text-red-500">*</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {options.map((option) => {

          const checked =
            selected.includes(option);

          return (
            <label
              key={option}
              className={`flex min-h-[72px] cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
              }`}
            >

              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  onToggle(option)
                }
                className="h-4 w-4 shrink-0 rounded"
              />

              <span className="text-sm font-medium text-slate-800">
                {option}
              </span>

            </label>
          );
        })}

      </div>

    </div>
  );
}

/* ========================================================================= */
/* FILE UPLOAD                                                               */
/* ========================================================================= */

function FileUpload({
  label,
  description,
  accept,
  multiple,
  onChange,
}: {
  label: string;
  description: string;
  accept: string;
  multiple?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-blue-300 bg-blue-50 px-5 py-7 text-center transition hover:bg-blue-100">

      <Upload
        size={20}
        className="shrink-0 text-blue-600"
      />

      <div>

        <div className="text-sm font-semibold text-blue-700">
          {label}
        </div>

        <div className="mt-1 text-xs text-blue-500">
          {description}
        </div>

      </div>

      <input
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />

    </label>
  );
}

/* ========================================================================= */
/* FILE ROW                                                                  */
/* ========================================================================= */

function FileRow({
  file,
  onRemove,
}: {
  file: FileItem;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <FileText size={19} />
      </div>

      <div className="min-w-0 flex-1">

        <div className="truncate text-sm font-semibold">
          {file.name}
        </div>

        <div className="mt-1 text-xs text-slate-400">
          {formatFileSize(file.size)}
        </div>

      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={17} />
      </button>

    </div>
  );
}