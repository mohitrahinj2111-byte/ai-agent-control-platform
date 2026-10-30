import Fastify, {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";

import cors from "@fastify/cors";
import { randomUUID } from "node:crypto";
import { supabase } from "./db.js";

const app: FastifyInstance = Fastify({
  logger: true,
  bodyLimit: 1_048_576,
});

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? "0.0.0.0";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://ai-agent-control-platform.pages.dev",
];

const allowedOrigins = [
  ...new Set(
    (
      process.env.CORS_ORIGINS ??
      DEFAULT_ALLOWED_ORIGINS.join(",")
    )
      .split(",")
      .map((origin) => origin.trim().replace(/\/+$/, ""))
      .filter(Boolean),
  ),
];

type JsonObject = Record<string, unknown>;

type AgentInput = {
  agent_name: string;
  description?: unknown;
  department?: unknown;
  runtime?: unknown;
  connection_endpoint?: unknown;
  connection_method?: unknown;
  capability?: unknown;
  permission?: unknown;
  tools?: unknown;
  policies?: unknown;
  data_security?: unknown;
  documents?: unknown;
  limitations?: unknown;
  terms_and_conditions?: unknown;
  configuration?: JsonObject;
};

type AuthenticatedUser = {
  id: string;
};

function isObject(value: unknown): value is JsonObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, "");
}

function toDbValue(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return JSON.stringify(value);
}

function getAgentInput(
  body: unknown,
): { data?: AgentInput; error?: string } {
  if (!isObject(body)) {
    return {
      error: "Request body must be a JSON object.",
    };
  }

  if (
    typeof body.agent_name !== "string" ||
    body.agent_name.trim().length === 0
  ) {
    return {
      error: "agent_name is required.",
    };
  }

  if (body.agent_name.trim().length > 200) {
    return {
      error: "agent_name must be 200 characters or fewer.",
    };
  }

  if (
    body.configuration !== undefined &&
    !isObject(body.configuration)
  ) {
    return {
      error: "configuration must be a JSON object.",
    };
  }

  return {
    data: {
      agent_name: body.agent_name.trim(),
      description: body.description,
      department: body.department,
      runtime: body.runtime,
      connection_endpoint: body.connection_endpoint,
      connection_method: body.connection_method,
      capability: body.capability,
      permission: body.permission,
      tools: body.tools,
      policies: body.policies,
      data_security: body.data_security,
      documents: body.documents,
      limitations: body.limitations,
      terms_and_conditions: body.terms_and_conditions,
      configuration: body.configuration as
        | JsonObject
        | undefined,
    },
  };
}

function sendError(
  reply: FastifyReply,
  statusCode: number,
  message: string,
) {
  return reply.code(statusCode).send({
    status: "error",
    message,
  });
}

/**
 * Verify the Supabase access token.
 * The user ID is always obtained from Supabase,
 * never trusted from the request body.
 */
async function authenticateRequest(
  request: FastifyRequest,
): Promise<AuthenticatedUser | null> {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return null;
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      request.log.warn(
        { message: error?.message },
        "Authentication failed",
      );
      return null;
    }

    return {
      id: data.user.id,
    };
  } catch (error) {
    request.log.error(
      { err: error },
      "Unexpected authentication error",
    );
    return null;
  }
}

async function registerRoutes(): Promise<void> {
  await app.register(cors, {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      app.log.warn(
        { origin: normalizedOrigin },
        "CORS origin rejected",
      );

      callback(
        new Error("Origin is not allowed by CORS."),
        false,
      );
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  });

  // GET /health
  app.get("/health", async () => ({
    status: "ok",
    service: "ai-agent-control-backend",
  }));

  // GET /health/db
  app.get(
    "/health/db",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { error } = await supabase
          .from("agent_data")
          .select("agent_id")
          .limit(1);

        if (error) {
          app.log.error(
            {
              code: error.code,
              message: error.message,
            },
            "Database health check failed",
          );

          return reply.code(503).send({
            status: "error",
            database: "unavailable",
            message: "Database query failed.",
          });
        }

        return {
          status: "ok",
          database: "connected",
        };
      } catch (error) {
        app.log.error(
          { err: error },
          "Unexpected database health check error",
        );

        return reply.code(503).send({
          status: "error",
          database: "unavailable",
          message: "Could not check database connection.",
        });
      }
    },
  );

  // POST /api/wizard/continue
  app.post(
    "/api/wizard/continue",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      request.log.info(
        { timestamp: new Date().toISOString() },
        "[WIZARD] Continue button clicked",
      );

      return reply.code(200).send({
        success: true,
        message: "Wizard Continue request received",
      });
    },
  );

  // POST /api/agents
  // Creates an agent owned by the authenticated user.
  app.post(
    "/api/agents",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const user = await authenticateRequest(request);

      if (!user) {
        return sendError(
          reply,
          401,
          "Authentication required. Please sign in again.",
        );
      }

      const validation = getAgentInput(request.body);

      if (!validation.data) {
        return sendError(
          reply,
          400,
          validation.error ?? "Invalid request body.",
        );
      }

      const agent = validation.data;

      let record: Record<string, unknown>;

      try {
        record = {
          agent_id: `agt_${randomUUID()}`,
          user_id: user.id,
          agent_name: agent.agent_name,
          description: toDbValue(agent.description),
          department: toDbValue(agent.department),
          runtime: toDbValue(agent.runtime),
          connection_endpoint: toDbValue(
            agent.connection_endpoint,
          ),
          connection_method: toDbValue(
            agent.connection_method,
          ),
          capability: toDbValue(agent.capability),
          permission: agent.permission ?? null,
          tools: agent.tools ?? null,
          policies: agent.policies ?? null,
          data_security: agent.data_security ?? null,
          documents: agent.documents ?? null,
          limitations: agent.limitations ?? null,
          terms_and_conditions:
            agent.terms_and_conditions ?? null,
          configuration: agent.configuration ?? {},
        };
      } catch (error) {
        request.log.error(
          { err: error },
          "Agent input serialization failed",
        );

        return sendError(
          reply,
          400,
          "One or more agent fields contain invalid data.",
        );
      }

      try {
        const { data, error } = await supabase
          .from("agent_data")
          .insert(record)
          .select()
          .single();

        if (error) {
          request.log.error(
            {
              code: error.code,
              message: error.message,
              details: error.details,
              hint: error.hint,
            },
            "Agent save error",
          );

          return sendError(
            reply,
            500,
            "Failed to create agent. Check backend logs.",
          );
        }

        request.log.info(
          {
            agent_id: data.agent_id,
            user_id: user.id,
          },
          "Agent saved successfully",
        );

        return reply.code(201).send({
          status: "ok",
          message: "Agent created successfully.",
          agent: data,
        });
      } catch (error) {
        request.log.error(
          { err: error },
          "Unexpected agent save error",
        );

        return sendError(
          reply,
          500,
          "Failed to create agent.",
        );
      }
    },
  );

  // GET /api/agents
  // Returns only agents owned by the authenticated user.
  app.get(
    "/api/agents",
    async (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const user = await authenticateRequest(request);

      if (!user) {
        return sendError(
          reply,
          401,
          "Authentication required. Please sign in again.",
        );
      }

      try {
        const { data, error } = await supabase
          .from("agent_data")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          request.log.error(
            {
              code: error.code,
              message: error.message,
              details: error.details,
              hint: error.hint,
            },
            "Fetch agents error",
          );

          return sendError(
            reply,
            500,
            "Failed to fetch agents. Check backend logs.",
          );
        }

        return reply.send({
          status: "ok",
          count: data.length,
          agents: data,
        });
      } catch (error) {
        request.log.error(
          { err: error },
          "Unexpected fetch agents error",
        );

        return sendError(
          reply,
          500,
          "Failed to fetch agents.",
        );
      }
    },
  );

  // Unknown routes
  app.setNotFoundHandler(
    async (request, reply) => {
      return reply.code(404).send({
        status: "error",
        message: "Route not found.",
        path: request.url,
      });
    },
  );
}

async function start(): Promise<void> {
  if (
    !Number.isInteger(PORT) ||
    PORT < 1 ||
    PORT > 65535
  ) {
    throw new Error("PORT must be a valid port number.");
  }

  await registerRoutes();

  await app.listen({
    port: PORT,
    host: HOST,
  });

  app.log.info(
    {
      host: HOST,
      port: PORT,
      allowedOrigins,
    },
    "AI Agent Control Backend started",
  );
}

async function shutdown(signal: string): Promise<void> {
  app.log.info(
    { signal },
    "Shutting down backend",
  );

  try {
    await app.close();
  } catch (error) {
    app.log.error(
      { err: error },
      "Server shutdown error",
    );

    process.exitCode = 1;
  }
}

process.once("SIGINT", () => {
  void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});

start().catch(async (error: unknown) => {
  app.log.error(
    { err: error },
    "Backend start failed",
  );

  try {
    await app.close();
  } catch {
    // Ignore close errors if the server never started.
  }

  process.exitCode = 1;
});