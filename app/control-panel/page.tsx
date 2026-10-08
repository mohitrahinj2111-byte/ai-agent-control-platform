"use client";

import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileText,
  Link2,
  Network,
  Plus,
  Search,
  Settings,
  Settings2,
  Shield,
  ShieldCheck,
  Upload,
  UserCircle,
  Users,
  Wrench,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import {
  ChangeEvent,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";

/* ========================================================================= */
/* TYPES                                                                     */
/* ========================================================================= */

type StatType = "blue" | "green" | "gray" | "red" | "orange";

type WizardStep = {
  id: number;
  title: string;
};

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
};

type WizardData = {
  agentName: string;
  agentRole: string;
  department: string;

  runtime: string;

  connectionEndpoint: string;
  connectionMethod: string;

  capabilities: string[];
  permissions: string[];
  tools: string[];
  customTools: UploadedFile[];

  policies: string[];
  customPolicy: string;
  policyFiles: UploadedFile[];

  dataSecurity: string[];
  customDataSecurity: string;
  dataSecurityFiles: UploadedFile[];

  documents: UploadedFile[];

  limitations: string[];

  terms: string;
  termsFiles: UploadedFile[];

  finalNotes: string;
};

/* ========================================================================= */
/* WIZARD STEPS                                                              */
/* ========================================================================= */

const wizardSteps: WizardStep[] = [
  { id: 1, title: "Agent Information" },
  { id: 2, title: "Runtime" },
  { id: 3, title: "Connection" },
  { id: 4, title: "Capability" },
  { id: 5, title: "Permission" },
  { id: 6, title: "Tools" },
  { id: 7, title: "Policies" },
  { id: 8, title: "Data and Security" },
  { id: 9, title: "Document" },
  { id: 10, title: "Limitations" },
  { id: 11, title: "Terms and Conditions" },
  { id: 12, title: "Confirm" },
];

/* ========================================================================= */
/* OPTIONS                                                                   */
/* ========================================================================= */

const runtimeOptions = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "Microsoft Azure AI",
  "AWS Bedrock",
  "LangChain",
  "CrewAI",
  "AutoGen",
  "Custom Runtime",
];

const capabilityOptions = [
  "Text Generation",
  "Reasoning",
  "Web Search",
  "Code Execution",
  "Data Analysis",
  "File Processing",
  "Image Understanding",
  "API Interaction",
  "Task Automation",
  "Decision Support",
];

const permissionOptions = [
  "Read Data",
  "Write Data",
  "Create Records",
  "Modify Records",
  "Delete Records",
  "Execute Actions",
  "Access External APIs",
  "Access Internal Systems",
  "Send Communications",
];

const toolOptions = [
  "Web Browser",
  "Database",
  "Email",
  "CRM",
  "File Storage",
  "Code Interpreter",
  "HTTP/API",
  "Search",
  "Calendar",
  "Custom Tools",
];

const policyOptions = [
  "Human Approval Required",
  "No Destructive Actions",
  "Data Privacy",
  "Least Privilege",
  "Audit Every Action",
  "No External Sharing",
  "Restricted API Access",
  "Cost Limits",
];

const dataSecurityOptions = [
  "Encrypt Sensitive Data",
  "No Personal Data",
  "No Credential Exposure",
  "Data Retention Limits",
  "Secure API Communication",
  "Audit Logs",
  "Restricted Data Access",
  "Anonymize Sensitive Data",
];

const limitationOptions = [
  "No Financial Transactions",
  "No Account Deletion",
  "No Legal Decisions",
  "No Medical Decisions",
  "No Credential Management",
  "No External Communication",
  "No Production Changes",
  "No Irreversible Actions",
];

/* ========================================================================= */
/* HELPERS                                                                   */
/* ========================================================================= */

function createInitialWizardData(): WizardData {
  return {
    agentName: "",
    agentRole: "",
    department: "",

    runtime: "",

    connectionEndpoint: "",
    connectionMethod: "",

    capabilities: [],
    permissions: [],
    tools: [],
    customTools: [],

    policies: [],
    customPolicy: "",
    policyFiles: [],

    dataSecurity: [],
    customDataSecurity: "",
    dataSecurityFiles: [],

    documents: [],

    limitations: [],

    terms: "",
    termsFiles: [],

    finalNotes: "",
  };
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAllowedDocument(file: File) {
  const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
  ];

  const lowerName = file.name.toLowerCase();

  return allowedExtensions.some((extension) =>
    lowerName.endsWith(extension)
  );
}

/* ========================================================================= */
/* SMALL COMPONENTS                                                          */
/* ========================================================================= */

function StatusDot({
  color = "green",
}: {
  color?: "green" | "blue" | "red" | "orange";
}) {
  const colorClass = {
    green: "bg-emerald-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
  }[color];

  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${colorClass}`}
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
  icon: ReactNode;
  type: StatType;
}) {
  const styles: Record<StatType, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    gray: "bg-slate-100 text-slate-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${styles[type]}`}>
          {icon}
        </div>

        <div>
          <div className="text-xl font-bold text-slate-900">
            {value}
          </div>

          <div className="text-xs text-slate-500">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* FILE UPLOADER                                                             */
/* ========================================================================= */

function FileUploader({
  files,
  onFiles,
  accept = ".pdf,.doc,.docx,.txt",
  multiple = true,
}: {
  files: UploadedFile[];
  onFiles: (files: UploadedFile[]) => void;
  accept?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    const validFiles = selectedFiles.filter(isAllowedDocument);

    const mappedFiles: UploadedFile[] = validFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

    onFiles(multiple ? [...files, ...mappedFiles] : mappedFiles);

    event.target.value = "";
  };

  const removeFile = (id: string) => {
    onFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
      >
        <Upload size={16} />
        Add File
      </button>

      <p className="mt-2 text-xs text-slate-400">
        Supported files: PDF, DOC, DOCX and TXT.
      </p>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
                  <FileText size={18} />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-800">
                    {file.name}
                  </div>

                  <div className="text-xs text-slate-400">
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="ml-3 rounded-lg p-2 text-slate-400 hover:bg-white hover:text-red-500"
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* MULTI SELECT                                                              */
/* ========================================================================= */

function MultiSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const checked = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
              checked
                ? "border-blue-500 bg-blue-50 text-blue-800"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                checked
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {checked && <CheckCircle2 size={14} />}
            </span>

            <span className="text-sm font-medium">
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ========================================================================= */
/* WIZARD FIELD                                                              */
/* ========================================================================= */

function FieldLabel({
  children,
  required = false,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-800">
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
}

/* ========================================================================= */
/* ADD AGENT MODAL                                                           */
/* ========================================================================= */

function AddAgentModal({
  onClose,
  onConnectExisting,
}: {
  onClose: () => void;
  onConnectExisting: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add AI Agent
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Connect an AI agent to your workspace.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* CONNECT EXISTING */}
            <button
              type="button"
              onClick={onConnectExisting}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Link2 size={22} />
              </div>

              <h3 className="font-semibold text-slate-900">
                Connect Existing Agent
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Connect an AI agent that is already running on
                another platform, vendor, or runtime.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600">
                Connect agent
                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </button>

            {/* CREATE NEW */}
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 p-5 text-left opacity-70"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <Bot size={22} />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Create New Agent
                </h3>

                <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-500">
                  Coming soon
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Configure a new AI agent, define its role,
                tools, permissions and runtime.
              </p>
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Your agents stay under your control
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  After an agent is connected, you can manage
                  its identity, permissions, tools, security and
                  placement inside your AI workforce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* EXISTING AGENT WIZARD                                                     */
/* ========================================================================= */

function ConnectExistingWizard({
  data,
  setData,
  currentStep,
  setCurrentStep,
  onClose,
  onFinish,
}: {
  data: WizardData;
  setData: React.Dispatch<React.SetStateAction<WizardData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onFinish: () => void;
}) {
  const currentWizardStep = wizardSteps[currentStep - 1];

  const update = <K extends keyof WizardData>(
    key: K,
    value: WizardData[K]
  ) => {
    setData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          data.agentName.trim() !== "" &&
          data.agentRole.trim() !== "" &&
          data.department.trim() !== ""
        );

      case 2:
        return data.runtime.trim() !== "";

      case 3:
        return data.connectionEndpoint.trim() !== "";

      case 4:
        return data.capabilities.length > 0;

      case 5:
        return data.permissions.length > 0;

      case 6:
        return (
          data.tools.length > 0 ||
          data.customTools.length > 0
        );

      case 7:
        return (
          data.policies.length > 0 ||
          data.customPolicy.trim() !== "" ||
          data.policyFiles.length > 0
        );

      case 8:
        return (
          data.dataSecurity.length > 0 ||
          data.customDataSecurity.trim() !== "" ||
          data.dataSecurityFiles.length > 0
        );

      case 9:
        return data.documents.length > 0;

      case 10:
        return data.limitations.length > 0;

      case 11:
        return (
          data.terms.trim() !== "" ||
          data.termsFiles.length > 0
        );

      case 12:
        return true;

      default:
        return false;
    }
  }, [currentStep, data]);

  const handleContinue = () => {
    if (!isStepValid) return;

    if (currentStep < 12) {
      setCurrentStep((step) => step + 1);
    } else {
      onFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="shrink-0 border-b border-slate-200">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={onClose}
                className="mt-0.5 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Connect Existing Agent
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Connect an agent that is already running elsewhere.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* PROGRESS */}
          <div className="overflow-x-auto px-6 pb-5">
            <div className="flex min-w-[900px] items-center">
              {wizardSteps.map((step, index) => {
                const active = step.id === currentStep;
                const completed = step.id < currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex min-w-0 flex-1 items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          active
                            ? "bg-blue-600 text-white"
                            : completed
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          step.id
                        )}
                      </div>

                      <span
                        className={`whitespace-nowrap text-xs font-semibold ${
                          active
                            ? "text-blue-700"
                            : completed
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {index !== wizardSteps.length - 1 && (
                      <div
                        className={`mx-3 h-px flex-1 ${
                          completed
                            ? "bg-emerald-300"
                            : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-4xl">
            {/* ============================================================= */}
            {/* 1. AGENT INFORMATION                                         */}
            {/* ============================================================= */}

            {currentStep === 1 && (
              <div>
                <StepTitle
                  number="1"
                  title="Agent Information"
                  description="Define the identity and responsibility of the existing agent."
                />

                <div className="mt-6 space-y-5">
                  <div>
                    <FieldLabel required>
                      Agent name
                    </FieldLabel>

                    <input
                      value={data.agentName}
                      onChange={(event) =>
                        update("agentName", event.target.value)
                      }
                      placeholder="e.g. Sales Research Agent"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <FieldLabel required>
                      Agent role
                    </FieldLabel>

                    <textarea
                      value={data.agentRole}
                      onChange={(event) =>
                        update("agentRole", event.target.value)
                      }
                      placeholder="Describe what this agent is responsible for"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <FieldLabel required>
                      Department
                    </FieldLabel>

                    <select
                      value={data.department}
                      onChange={(event) =>
                        update("department", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">
                        Select department
                      </option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Customer Support">
                        Customer Support
                      </option>
                      <option value="Human Resources">
                        Human Resources
                      </option>
                      <option value="Security">Security</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 2. RUNTIME                                                    */}
            {/* ============================================================= */}

            {currentStep === 2 && (
              <div>
                <StepTitle
                  number="2"
                  title="Runtime"
                  description="Select the runtime or platform where this agent currently operates."
                />

                <div className="mt-6">
                  <FieldLabel required>
                    Agent runtime
                  </FieldLabel>

                  <div className="space-y-3">
                    {runtimeOptions.map((runtime) => {
                      const selected = data.runtime === runtime;

                      return (
                        <button
                          key={runtime}
                          type="button"
                          onClick={() =>
                            update("runtime", runtime)
                          }
                          className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left ${
                            selected
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              selected
                                ? "border-blue-600"
                                : "border-slate-300"
                            }`}
                          >
                            {selected && (
                              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                            )}
                          </span>

                          <span className="text-sm font-medium">
                            {runtime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 3. CONNECTION                                                  */}
            {/* ============================================================= */}

            {currentStep === 3 && (
              <div>
                <StepTitle
                  number="3"
                  title="Connection"
                  description="Provide the connection details required to communicate with the existing agent."
                />

                <div className="mt-6 space-y-5">
                  <div>
                    <FieldLabel required>
                      Connection endpoint
                    </FieldLabel>

                    <input
                      value={data.connectionEndpoint}
                      onChange={(event) =>
                        update(
                          "connectionEndpoint",
                          event.target.value
                        )
                      }
                      placeholder="https://your-agent-endpoint.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      The actual connection will be handled by
                      the platform adapter and backend integration
                      layer.
                    </p>
                  </div>

                  <div>
                    <FieldLabel>
                      Connection method
                    </FieldLabel>

                    <select
                      value={data.connectionMethod}
                      onChange={(event) =>
                        update(
                          "connectionMethod",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">
                        Select connection method
                      </option>
                      <option value="REST API">
                        REST API
                      </option>
                      <option value="Webhook">
                        Webhook
                      </option>
                      <option value="SDK">
                        SDK
                      </option>
                      <option value="Custom Adapter">
                        Custom Adapter
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 4. CAPABILITY                                                  */}
            {/* ============================================================= */}

            {currentStep === 4 && (
              <div>
                <StepTitle
                  number="4"
                  title="Capability"
                  description="Select every capability this agent is allowed to use."
                />

                <RequiredHint />

                <div className="mt-5">
                  <MultiSelect
                    options={capabilityOptions}
                    selected={data.capabilities}
                    onChange={(values) =>
                      update("capabilities", values)
                    }
                  />
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 5. PERMISSION                                                  */}
            {/* ============================================================= */}

            {currentStep === 5 && (
              <div>
                <StepTitle
                  number="5"
                  title="Permission"
                  description="Choose all permissions that should be available to the agent."
                />

                <RequiredHint />

                <div className="mt-5">
                  <MultiSelect
                    options={permissionOptions}
                    selected={data.permissions}
                    onChange={(values) =>
                      update("permissions", values)
                    }
                  />
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 6. TOOLS                                                       */}
            {/* ============================================================= */}

            {currentStep === 6 && (
              <div>
                <StepTitle
                  number="6"
                  title="Tools"
                  description="Select the tools available to this agent. Multiple tools can be selected."
                />

                <RequiredHint />

                <div className="mt-5">
                  <MultiSelect
                    options={toolOptions}
                    selected={data.tools}
                    onChange={(values) =>
                      update("tools", values)
                    }
                  />
                </div>

                {data.tools.includes("Custom Tools") && (
                  <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Custom Tools
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Upload the file that defines the custom tool
                      or integration.
                    </p>

                    <div className="mt-4">
                      <FileUploader
                        files={data.customTools}
                        onFiles={(files) =>
                          update("customTools", files)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* 7. POLICIES                                                   */}
            {/* ============================================================= */}

            {currentStep === 7 && (
              <div>
                <StepTitle
                  number="7"
                  title="Policies"
                  description="Define the policies that govern how this agent operates."
                />

                <div className="mt-5">
                  <MultiSelect
                    options={policyOptions}
                    selected={data.policies}
                    onChange={(values) =>
                      update("policies", values)
                    }
                  />
                </div>

                <div className="mt-6">
                  <FieldLabel>
                    Company policy / custom instructions
                  </FieldLabel>

                  <textarea
                    value={data.customPolicy}
                    onChange={(event) =>
                      update("customPolicy", event.target.value)
                    }
                    rows={6}
                    placeholder="Write your company's policies and instructions for this AI agent..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-6">
                  <FieldLabel>
                    Policy documents
                  </FieldLabel>

                  <FileUploader
                    files={data.policyFiles}
                    onFiles={(files) =>
                      update("policyFiles", files)
                    }
                  />
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 8. DATA AND SECURITY                                           */}
            {/* ============================================================= */}

            {currentStep === 8 && (
              <div>
                <StepTitle
                  number="8"
                  title="Data and Security"
                  description="Control how the agent can access, use and protect company data."
                />

                <div className="mt-5">
                  <MultiSelect
                    options={dataSecurityOptions}
                    selected={data.dataSecurity}
                    onChange={(values) =>
                      update("dataSecurity", values)
                    }
                  />
                </div>

                <div className="mt-6">
                  <FieldLabel>
                    Custom data and security instructions
                  </FieldLabel>

                  <textarea
                    value={data.customDataSecurity}
                    onChange={(event) =>
                      update(
                        "customDataSecurity",
                        event.target.value
                      )
                    }
                    rows={6}
                    placeholder="Write your own data security instructions..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-6">
                  <FieldLabel>
                    Data and security documents
                  </FieldLabel>

                  <FileUploader
                    files={data.dataSecurityFiles}
                    onFiles={(files) =>
                      update("dataSecurityFiles", files)
                    }
                  />
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 9. DOCUMENT                                                    */}
            {/* ============================================================= */}

            {currentStep === 9 && (
              <div>
                <StepTitle
                  number="9"
                  title="Document"
                  description="Add the documents that should be associated with this agent."
                />

                <div className="mt-6">
                  <FieldLabel required>
                    Agent documents
                  </FieldLabel>

                  <FileUploader
                    files={data.documents}
                    onFiles={(files) =>
                      update("documents", files)
                    }
                  />
                </div>

                {/* DOCUMENT PREVIEW LIST */}
                {data.documents.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold text-slate-800">
                      Selected documents
                    </h3>

                    <div className="grid gap-3 md:grid-cols-2">
                      {data.documents.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FileText size={21} />
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-800">
                              {file.name}
                            </div>

                            <div className="mt-1 text-xs text-slate-400">
                              {formatFileSize(file.size)}
                            </div>
                          </div>

                          <CheckCircle2
                            size={18}
                            className="ml-auto shrink-0 text-emerald-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* 10. LIMITATIONS                                                */}
            {/* ============================================================= */}

            {currentStep === 10 && (
              <div>
                <StepTitle
                  number="10"
                  title="Limitations"
                  description="Select all actions or areas that this agent must not perform."
                />

                <RequiredHint />

                <div className="mt-5">
                  <MultiSelect
                    options={limitationOptions}
                    selected={data.limitations}
                    onChange={(values) =>
                      update("limitations", values)
                    }
                  />
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 11. TERMS AND CONDITIONS                                       */}
            {/* ============================================================= */}

            {currentStep === 11 && (
              <div>
                <StepTitle
                  number="11"
                  title="Terms and Conditions"
                  description="Define the company's terms and conditions that the AI agent must follow."
                />

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Company Terms and Conditions
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        The company can define its own terms and
                        conditions here. These instructions will
                        become part of the agent's governance
                        configuration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <FieldLabel required>
                    Company terms and conditions
                  </FieldLabel>

                  <textarea
                    value={data.terms}
                    onChange={(event) =>
                      update("terms", event.target.value)
                    }
                    rows={9}
                    placeholder="Write the company's terms and conditions that this AI agent must follow..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-6">
                  <FieldLabel>
                    Terms and conditions documents
                  </FieldLabel>

                  <FileUploader
                    files={data.termsFiles}
                    onFiles={(files) =>
                      update("termsFiles", files)
                    }
                  />
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 12. CONFIRM                                                    */}
            {/* ============================================================= */}

            {currentStep === 12 && (
              <div>
                <StepTitle
                  number="12"
                  title="Confirm"
                  description="Review everything entered in the wizard before connecting the agent."
                />

                <div className="mt-6 space-y-4">
                  <ReviewSection
                    title="Agent Information"
                    step={1}
                    onEdit={() => setCurrentStep(1)}
                  >
                    <ReviewRow
                      label="Agent name"
                      value={data.agentName}
                    />

                    <ReviewRow
                      label="Agent role"
                      value={data.agentRole}
                    />

                    <ReviewRow
                      label="Department"
                      value={data.department}
                    />
                  </ReviewSection>

                  <ReviewSection
                    title="Runtime"
                    step={2}
                    onEdit={() => setCurrentStep(2)}
                  >
                    <ReviewRow
                      label="Runtime"
                      value={data.runtime}
                    />
                  </ReviewSection>

                  <ReviewSection
                    title="Connection"
                    step={3}
                    onEdit={() => setCurrentStep(3)}
                  >
                    <ReviewRow
                      label="Endpoint"
                      value={data.connectionEndpoint}
                    />

                    <ReviewRow
                      label="Method"
                      value={
                        data.connectionMethod || "Not specified"
                      }
                    />
                  </ReviewSection>

                  <ReviewSection
                    title="Capability"
                    step={4}
                    onEdit={() => setCurrentStep(4)}
                  >
                    <ReviewTags items={data.capabilities} />
                  </ReviewSection>

                  <ReviewSection
                    title="Permission"
                    step={5}
                    onEdit={() => setCurrentStep(5)}
                  >
                    <ReviewTags items={data.permissions} />
                  </ReviewSection>

                  <ReviewSection
                    title="Tools"
                    step={6}
                    onEdit={() => setCurrentStep(6)}
                  >
                    <ReviewTags items={data.tools} />

                    {data.customTools.length > 0 && (
                      <ReviewFiles files={data.customTools} />
                    )}
                  </ReviewSection>

                  <ReviewSection
                    title="Policies"
                    step={7}
                    onEdit={() => setCurrentStep(7)}
                  >
                    <ReviewTags items={data.policies} />

                    {data.customPolicy && (
                      <ReviewText
                        label="Custom policy"
                        value={data.customPolicy}
                      />
                    )}

                    {data.policyFiles.length > 0 && (
                      <ReviewFiles files={data.policyFiles} />
                    )}
                  </ReviewSection>

                  <ReviewSection
                    title="Data and Security"
                    step={8}
                    onEdit={() => setCurrentStep(8)}
                  >
                    <ReviewTags items={data.dataSecurity} />

                    {data.customDataSecurity && (
                      <ReviewText
                        label="Custom instructions"
                        value={data.customDataSecurity}
                      />
                    )}

                    {data.dataSecurityFiles.length > 0 && (
                      <ReviewFiles
                        files={data.dataSecurityFiles}
                      />
                    )}
                  </ReviewSection>

                  <ReviewSection
                    title="Documents"
                    step={9}
                    onEdit={() => setCurrentStep(9)}
                  >
                    <ReviewFiles files={data.documents} />
                  </ReviewSection>

                  <ReviewSection
                    title="Limitations"
                    step={10}
                    onEdit={() => setCurrentStep(10)}
                  >
                    <ReviewTags items={data.limitations} />
                  </ReviewSection>

                  <ReviewSection
                    title="Terms and Conditions"
                    step={11}
                    onEdit={() => setCurrentStep(11)}
                  >
                    {data.terms && (
                      <ReviewText
                        label="Company terms"
                        value={data.terms}
                      />
                    )}

                    {data.termsFiles.length > 0 && (
                      <ReviewFiles files={data.termsFiles} />
                    )}
                  </ReviewSection>

                  {/* FINAL NOTES */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                    <FieldLabel>
                      Final confirmation notes
                    </FieldLabel>

                    <textarea
                      value={data.finalNotes}
                      onChange={(event) =>
                        update("finalNotes", event.target.value)
                      }
                      rows={5}
                      placeholder="Add any final notes, instructions or confirmation details before connecting this agent..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${
              currentStep === 1
                ? "cursor-not-allowed text-slate-300"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="text-xs text-slate-400">
            Step {currentStep} of 12
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!isStepValid}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
              isStepValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-300"
            }`}
          >
            {currentStep === 12 ? "Connect Agent" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* WIZARD UI HELPERS                                                         */
/* ========================================================================= */

function StepTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {number}
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function RequiredHint() {
  return (
    <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
      <span className="font-bold">*</span> Select at least one
      option to continue.
    </div>
  );
}

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
            {step}
          </span>

          <h3 className="text-sm font-bold text-slate-900">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="space-y-3 p-4">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>

      <div className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
        {value || "Not specified"}
      </div>
    </div>
  );
}

function ReviewTags({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <div className="text-sm text-slate-400">
        None selected
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ReviewText({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>

      <div className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
        {value}
      </div>
    </div>
  );
}

function ReviewFiles({ files }: { files: UploadedFile[] }) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        Files
      </div>

      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2"
          >
            <FileText
              size={15}
              className="shrink-0 text-blue-600"
            />

            <span className="truncate text-xs font-medium text-slate-700">
              {file.name}
            </span>

            <span className="ml-auto shrink-0 text-[10px] text-slate-400">
              {formatFileSize(file.size)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* EMPTY ARCHITECTURE                                                        */
/* ========================================================================= */

function EmptyArchitecture({
  onAddAgent,
}: {
  onAddAgent: () => void;
}) {
  return (
    <div className="relative h-[610px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute left-5 top-5 z-10 w-[300px] rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Network size={17} />
          </div>

          <div className="text-sm font-semibold text-slate-900">
            AI Agent Workspace
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          Your AI workforce will appear here after you add AI
          agents to your workspace.
        </p>
      </div>

      <button
        onClick={onAddAgent}
        className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus size={17} />
        Add AI Agent
      </button>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="w-full max-w-[600px] text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-8 ring-blue-50/50">
            <Bot size={40} strokeWidth={1.7} />
          </div>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Add your first AI agent
          </h2>

          <p className="mx-auto mt-3 max-w-[540px] text-sm leading-6 text-slate-500">
            You can add AI agents from any company, vendor,
            platform or runtime to your workspace.
          </p>

          <button
            onClick={onAddAgent}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add AI Agent
          </button>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-sm">
              <Bot size={13} className="text-blue-600" />
              Connect agents
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-sm">
              <ShieldCheck size={13} className="text-blue-600" />
              Manage permissions
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-sm">
              <Network size={13} className="text-blue-600" />
              Build architecture
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* HOW TO ADD AGENT                                                          */
/* ========================================================================= */

function HowToAddAgent() {
  const steps = [
    {
      number: "01",
      icon: Bot,
      title: "Choose your agent",
      description:
        "Connect an existing AI agent or create a new AI agent.",
    },
    {
      number: "02",
      icon: Link2,
      title: "Connect the runtime",
      description:
        "Connect the platform, vendor or runtime where your agent operates.",
    },
    {
      number: "03",
      icon: Settings2,
      title: "Configure the agent",
      description:
        "Define the agent identity, capabilities, tools and configuration.",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Set permissions",
      description:
        "Control what the agent can access, execute and modify.",
    },
    {
      number: "05",
      icon: Network,
      title: "Build your architecture",
      description:
        "Organize connected agents and create your company AI workforce architecture.",
    },
  ];

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm xl:w-[330px]">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Bot size={21} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              How to add an AI agent
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Build your AI workforce step by step
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex gap-3"
              >
                {index !== steps.length - 1 && (
                  <div className="absolute left-[15px] top-9 h-[calc(100%+8px)] w-px bg-slate-200" />
                )}

                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={16} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-600">
                      {step.number}
                    </span>

                    <h3 className="text-sm font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <div className="flex gap-3">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <div className="text-xs font-semibold text-slate-900">
                Centralized control
              </div>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Once connected, your AI agents can be monitored,
                secured and managed from the control plane.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ========================================================================= */
/* MAIN CONTROL PANEL                                                        */
/* ========================================================================= */

export default function ControlPanel() {
  const [showAddAgent, setShowAddAgent] = useState(false);

  const [showConnectWizard, setShowConnectWizard] =
    useState(false);

  const [wizardStep, setWizardStep] = useState(1);

  const [wizardData, setWizardData] =
    useState<WizardData>(createInitialWizardData);

  const activity = [
    "Your AI workforce activity will appear here",
    "Agent tasks and execution events will appear here",
    "Human approval requests will appear here",
  ];

  const openAddAgent = () => {
    setShowAddAgent(true);
  };

  const openConnectWizard = () => {
    setShowAddAgent(false);
    setWizardStep(1);
    setWizardData(createInitialWizardData());
    setShowConnectWizard(true);
  };

  const closeWizard = () => {
    setShowConnectWizard(false);
    setWizardStep(1);
    setWizardData(createInitialWizardData());
  };

  const finishWizard = () => {
    /*
     * IMPORTANT:
     * Abhi ye UI-only implementation hai.
     *
     * Real production platform me yahan:
     *
     * 1. Backend API call
     * 2. Agent Registry record
     * 3. Adapter configuration
     * 4. Encrypted credentials
     * 5. Policy configuration
     * 6. Permission configuration
     * 7. Audit event
     *
     * create honge.
     */

    console.log("Existing agent configuration:", wizardData);

    closeWizard();
  };

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-900">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 flex h-[68px] items-center gap-4 border-b border-slate-200 bg-white px-5">
        <div className="flex w-[205px] shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Bot size={22} />
          </div>

          <div className="text-lg font-bold tracking-tight">
            AI Agent Control Plane
          </div>
        </div>

        <div className="flex h-10 max-w-[400px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-400">
          <Search size={17} />
          <span>
            Search agents, tasks, tools, data, reports...
          </span>
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <StatCard
            title="Total Agents"
            value="0"
            icon={<Bot size={18} />}
            type="blue"
          />

          <StatCard
            title="Working"
            value="0"
            icon={<CircleDot size={18} />}
            type="green"
          />

          <StatCard
            title="Idle"
            value="0"
            icon={<Clock3 size={18} />}
            type="gray"
          />

          <StatCard
            title="Failed"
            value="0"
            icon={<XCircle size={18} />}
            type="red"
          />

          <StatCard
            title="Human Approval"
            value="0"
            icon={<AlertTriangle size={18} />}
            type="orange"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative rounded-lg p-2 hover:bg-slate-100">
            <Activity size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-slate-300" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <UserCircle size={22} />
          </div>

          <div className="hidden text-xs lg:block">
            <div className="font-semibold">Admin</div>
            <div className="text-slate-500">Workspace</div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="sticky top-[68px] h-[calc(100vh-68px)] w-[205px] shrink-0 border-r border-slate-200 bg-white p-3">
          <nav className="space-y-1">
            {[
              [Network, "Control Panel"],
              [Users, "Agents"],
              [FileText, "Tasks"],
              [CalendarDays, "Day Report"],
              [CheckCircle2, "Human Approvals"],
              [BarChart3, "Monitoring"],
              [Shield, "Security"],
              [Wrench, "Tools & Integrations"],
              [Users, "Team & Access"],
              [Settings, "Settings"],
            ].map(([Icon, label], index) => {
              const IconComponent = Icon as typeof Network;

              return (
                <button
                  key={String(label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    index === 0
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <IconComponent size={18} />

                  <span>{String(label)}</span>

                  {label === "Human Approvals" && (
                    <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                      0
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Control Panel
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Connect, manage and control your AI workforce
                from one place.
              </p>
            </div>

            <button
              onClick={openAddAgent}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Add AI Agent
            </button>
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <div className="min-w-0 flex-1">
              <EmptyArchitecture
                onAddAgent={openAddAgent}
              />
            </div>

            <HowToAddAgent />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {/* ACTIVITY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">
                  Live Activity Feed
                </h2>

                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <StatusDot color="green" />
                  Waiting
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {activity.map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-0.5 rounded-full bg-slate-50 p-2 text-slate-400">
                      <Zap size={14} />
                    </div>

                    <div className="text-xs leading-5 text-slate-500">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REPORT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">
                  Today&apos;s Report
                </h2>

                <CalendarDays
                  size={15}
                  className="text-slate-400"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["0", "Total Tasks"],
                  ["0", "Completed"],
                  ["0", "Failed"],
                  ["0", "In Progress"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-slate-50 p-3"
                  >
                    <div className="text-xl font-bold text-slate-400">
                      {number}
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* APPROVALS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">
                  Human Approvals
                </h2>

                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                  Pending 0
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                <CheckCircle2
                  size={28}
                  className="mx-auto text-slate-300"
                />

                <div className="mt-3 text-sm font-semibold text-slate-700">
                  No pending approvals
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  Add an AI agent to start using approvals
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ADD AGENT */}
      {showAddAgent && (
        <AddAgentModal
          onClose={() => setShowAddAgent(false)}
          onConnectExisting={openConnectWizard}
        />
      )}

      {/* 12-STEP CONNECT WIZARD */}
      {showConnectWizard && (
        <ConnectExistingWizard
          data={wizardData}
          setData={setWizardData}
          currentStep={wizardStep}
          setCurrentStep={setWizardStep}
          onClose={closeWizard}
          onFinish={finishWizard}
        />
      )}
    </main>
  );
}