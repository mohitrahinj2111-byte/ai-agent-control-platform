import Fastify, {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
} from "fastify";
import cors from "@fastify/cors";
import { randomUUID } from "node:crypto";
import { pool } from "./db.js";

const app: FastifyInstance = Fastify({
  logger: true,
  bodyLimit: 1_048_576, // 1 MB
});

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? "0.0.0.0";

const allowedOrigins = (
  process.env.CORS_ORIGINS ??
  "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

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

function isObject(value: unknown): value is JsonObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
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

  try {
    return JSON.stringify(value);
  } catch {
    throw new Error("A field contains data that cannot be serialized.");
  }
}

function getAgentInput(
  body: unknown,
): { data?: AgentInput; error?: string } {
  if (!isObject(body)) {
    return { error: "Request body must be a JSON object." };
  }

  if (
    typeof body.agent_name !== "string" ||
    body.agent_name.trim().length === 0
  ) {
    return { error: "agent_name is required." };
  }

  if (body.agent_name.trim().length > 200) {
    return { error: "agent_name must be 200 characters or fewer." };
  }

  if (
    body.configuration !== undefined &&
    !isObject(body.configuration)
  ) {
    return { error: "configuration must be a JSON object." };
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
      configuration: body.configuration as JsonObject | undefined,
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

async function registerRoutes(): Promise<void> {
  await app.register(cors, {
    origin: allowedOrigins,
  });

  app.get("/health", async () => ({
    status: "ok",
    service: "ai-agent-control-backend",
  }));

  app.get("/health/db", async (_request, reply) => {
    try {
      await pool.query("SELECT 1");

      return {
        status: "ok",
        database: "connected",
      };
    } catch (error) {
      app.log.error({ err: error }, "DATABASE HEALTH CHECK FAILED");

      return sendError(
        reply,
        503,
        "Database is currently unavailable.",
      );
    }
  });

  app.post(
    "/api/agents",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const validation = getAgentInput(request.body);

      if (!validation.data) {
        return sendError(
          reply,
          400,
          validation.error ?? "Invalid request body.",
        );
      }

      const agent = validation.data;
      const agentId = `agt_${randomUUID()}`;

      try {
        const result = await pool.query(
          `INSERT INTO public.agent_data (
            agent_id,
            agent_name,
            description,
            department,
            runtime,
            connection_endpoint,
            connection_method,
            capability,
            permission,
            tools,
            policies,
            data_security,
            documents,
            limitations,
            terms_and_conditions,
            configuration
          )
          VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16
          )
          RETURNING *`,
          [
            agentId,
            agent.agent_name,
            toDbValue(agent.description),
            toDbValue(agent.department),
            toDbValue(agent.runtime),
            toDbValue(agent.connection_endpoint),
            toDbValue(agent.connection_method),
            toDbValue(agent.capability),
            toDbValue(agent.permission),
            toDbValue(agent.tools),
            toDbValue(agent.policies),
            toDbValue(agent.data_security),
            toDbValue(agent.documents),
            toDbValue(agent.limitations),
            toDbValue(agent.terms_and_conditions),
            JSON.stringify(agent.configuration ?? {}),
          ],
        );

        return reply.code(201).send({
          status: "ok",
          message: "Agent created successfully.",
          agent: result.rows[0],
        });
      } catch (error) {
        app.log.error({ err: error }, "AGENT SAVE ERROR");

        return sendError(
          reply,
          500,
          "Failed to create agent. Check backend logs and database schema.",
        );
      }
    },
  );

  app.get("/api/agents", async (_request, reply) => {
    try {
      const result = await pool.query(
        `SELECT *
         FROM public.agent_data
         ORDER BY created_at DESC`,
      );

      return reply.send({
        status: "ok",
        count: result.rows.length,
        agents: result.rows,
      });
    } catch (error) {
      app.log.error({ err: error }, "FETCH AGENTS ERROR");

      return sendError(
        reply,
        500,
        "Failed to fetch agents. Check backend logs and database schema.",
      );
    }
  });
}

async function shutdown(signal: string): Promise<void> {
  app.log.info({ signal }, "SHUTTING DOWN BACKEND");

  try {
    await app.close();
  } catch (error) {
    app.log.error({ err: error }, "SERVER SHUTDOWN ERROR");
  }

  try {
    await pool.end();
  } catch (error) {
    app.log.error({ err: error }, "DATABASE POOL SHUTDOWN ERROR");
    process.exitCode = 1;
  }
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
    `Backend running at http://${HOST}:${PORT}`,
  );

  process.once("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.once("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
}

start().catch(async (error: unknown) => {
  app.log.error({ err: error }, "BACKEND START FAILED");

  try {
    await app.close();
  } catch {
    // Ignore errors while closing a server that may not have started.
  }

  try {
    await pool.end();
  } catch (poolError) {
    app.log.error(
      { err: poolError },
      "DATABASE POOL CLEANUP FAILED",
    );
  }

  process.exitCode = 1;
});