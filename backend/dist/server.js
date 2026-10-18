"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const node_crypto_1 = require("node:crypto");
const db_js_1 = require("./db.js");
const app = (0, fastify_1.default)({
    logger: true,
    bodyLimit: 1048576,
});
const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? "0.0.0.0";
const allowedOrigins = (process.env.CORS_ORIGINS ??
    [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://ai-agent-control-platform.pages.dev",
    ].join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
function isObject(value) {
    return (typeof value === "object" &&
        value !== null &&
        !Array.isArray(value));
}
function toDbValue(value) {
    if (value === undefined || value === null || value === "") {
        return null;
    }
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    try {
        return JSON.stringify(value);
    }
    catch {
        throw new Error("A field contains data that cannot be serialized.");
    }
}
function getAgentInput(body) {
    if (!isObject(body)) {
        return { error: "Request body must be a JSON object." };
    }
    if (typeof body.agent_name !== "string" ||
        body.agent_name.trim().length === 0) {
        return { error: "agent_name is required." };
    }
    if (body.agent_name.trim().length > 200) {
        return {
            error: "agent_name must be 200 characters or fewer.",
        };
    }
    if (body.configuration !== undefined &&
        !isObject(body.configuration)) {
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
            configuration: body.configuration,
        },
    };
}
function sendError(reply, statusCode, message) {
    return reply.code(statusCode).send({
        status: "error",
        message,
    });
}
async function registerRoutes() {
    await app.register(cors_1.default, {
        origin: allowedOrigins,
    });
    // ---------------------------------------------------------
    // BACKEND HEALTH
    // GET /health
    // ---------------------------------------------------------
    app.get("/health", async () => ({
        status: "ok",
        service: "ai-agent-control-backend",
    }));
    // ---------------------------------------------------------
    // SUPABASE HEALTH
    // GET /health/db
    // ---------------------------------------------------------
    app.get("/health/db", async (request, reply) => {
        try {
            const { error } = await db_js_1.supabase
                .from("agent_data")
                .select("agent_id")
                .limit(1);
            if (error) {
                request.log.error({
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                }, "SUPABASE HEALTH CHECK FAILED");
                return sendError(reply, 503, "Supabase connection or table access failed.");
            }
            return reply.send({
                status: "ok",
                database: "connected",
            });
        }
        catch (error) {
            request.log.error({ err: error }, "UNEXPECTED SUPABASE HEALTH CHECK ERROR");
            return sendError(reply, 503, "Supabase is currently unavailable.");
        }
    });
    // ---------------------------------------------------------
    // CREATE AGENT
    // POST /api/agents
    // ---------------------------------------------------------
    app.post("/api/agents", async (request, reply) => {
        const validation = getAgentInput(request.body);
        if (!validation.data) {
            return sendError(reply, 400, validation.error ?? "Invalid request body.");
        }
        const agent = validation.data;
        let record;
        try {
            record = {
                agent_id: `agt_${(0, node_crypto_1.randomUUID)()}`,
                agent_name: agent.agent_name,
                description: toDbValue(agent.description),
                department: toDbValue(agent.department),
                runtime: toDbValue(agent.runtime),
                connection_endpoint: toDbValue(agent.connection_endpoint),
                connection_method: toDbValue(agent.connection_method),
                capability: toDbValue(agent.capability),
                // These values may be arrays/objects.
                // Their compatibility depends on the actual database column types.
                permission: agent.permission ?? null,
                tools: agent.tools ?? null,
                policies: agent.policies ?? null,
                data_security: agent.data_security ?? null,
                documents: agent.documents ?? null,
                limitations: agent.limitations ?? null,
                terms_and_conditions: agent.terms_and_conditions ?? null,
                configuration: agent.configuration ?? {},
            };
        }
        catch (error) {
            request.log.error({ err: error }, "AGENT INPUT SERIALIZATION FAILED");
            return sendError(reply, 400, "One or more agent fields contain invalid data.");
        }
        try {
            const { data, error } = await db_js_1.supabase
                .from("agent_data")
                .insert(record)
                .select()
                .single();
            if (error) {
                request.log.error({
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                }, "AGENT SAVE ERROR");
                return sendError(reply, 500, "Failed to create agent. Check database schema and permissions.");
            }
            return reply.code(201).send({
                status: "ok",
                message: "Agent created successfully.",
                agent: data,
            });
        }
        catch (error) {
            request.log.error({ err: error }, "UNEXPECTED AGENT SAVE ERROR");
            return sendError(reply, 500, "Failed to create agent.");
        }
    });
    // ---------------------------------------------------------
    // GET ALL AGENTS
    // GET /api/agents
    // ---------------------------------------------------------
    app.get("/api/agents", async (request, reply) => {
        try {
            const { data, error } = await db_js_1.supabase
                .from("agent_data")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                request.log.error({
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                }, "FETCH AGENTS ERROR");
                return sendError(reply, 500, "Failed to fetch agents. Check database schema and permissions.");
            }
            return reply.send({
                status: "ok",
                count: data.length,
                agents: data,
            });
        }
        catch (error) {
            request.log.error({ err: error }, "UNEXPECTED FETCH AGENTS ERROR");
            return sendError(reply, 500, "Failed to fetch agents.");
        }
    });
}
// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------
async function start() {
    if (!Number.isInteger(PORT) ||
        PORT < 1 ||
        PORT > 65535) {
        throw new Error("PORT must be a valid port number.");
    }
    await registerRoutes();
    await app.listen({
        port: PORT,
        host: HOST,
    });
    app.log.info(`Backend running at http://${HOST}:${PORT}`);
}
// ---------------------------------------------------------
// GRACEFUL SHUTDOWN
// ---------------------------------------------------------
async function shutdown(signal) {
    app.log.info({ signal }, "SHUTTING DOWN BACKEND");
    try {
        await app.close();
    }
    catch (error) {
        app.log.error({ err: error }, "SERVER SHUTDOWN ERROR");
        process.exitCode = 1;
    }
}
process.once("SIGINT", () => {
    void shutdown("SIGINT");
});
process.once("SIGTERM", () => {
    void shutdown("SIGTERM");
});
start().catch(async (error) => {
    app.log.error({ err: error }, "BACKEND START FAILED");
    try {
        await app.close();
    }
    catch {
        // Ignore errors if the server did not start.
    }
    process.exitCode = 1;
});
