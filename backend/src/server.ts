import Fastify from "fastify";
import cors from "@fastify/cors";
import { randomUUID } from "node:crypto";
import { pool } from "./db.js";

const app = Fastify({
  logger: true,
});

function toDbValue(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value);
}

async function start() {
  await app.register(cors, {
    origin: true,
  });

  // Basic health check
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "ai-agent-control-backend",
    };
  });

  // Database health check
  app.get("/health/db", async (_request, reply) => {
    try {
      await pool.query("SELECT 1");

      return {
        status: "ok",
        database: "connected",
      };
    } catch (error) {
      app.log.error(error);

      reply.code(500);

      return {
        status: "error",
        database: "disconnected",
      };
    }
  });

  // Create new agent
  app.post("/api/agents", async (request, reply) => {
    try {
      const body = request.body as Record<string, unknown>;

      const agentId = `agt_${randomUUID()}`;

      const result = await pool.query(
        `
        INSERT INTO public.agent_data (
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
          document_file,
          limitations,
          terms
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15
        )
        RETURNING agent_id
        `,
        [
          agentId,
          toDbValue(body.agent_name),
          toDbValue(body.description),
          toDbValue(body.department),
          toDbValue(body.runtime),
          toDbValue(body.connection_endpoint),
          toDbValue(body.connection_method),
          toDbValue(body.capability),
          toDbValue(body.permission),
          toDbValue(body.tools),
          toDbValue(body.policies),
          toDbValue(body.data_security),
          toDbValue(body.document_file),
          toDbValue(body.limitations),
          toDbValue(body.terms),
        ]
      );

      reply.code(201);

      return {
        status: "ok",
        message: "Agent created successfully",
        agent_id: result.rows[0].agent_id,
      };
    } catch (error) {
      app.log.error(error);

      reply.code(500);

      return {
        status: "error",
        message: "Failed to create agent",
      };
    }
  });

  try {
    await app.listen({
      port: 4000,
      host: "127.0.0.1",
    });

    console.log("Backend running at http://127.0.0.1:4000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();