import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return value;
}

const supabaseUrl = getRequiredEnv("SUPABASE_URL");
const supabaseSecretKey = getRequiredEnv(
  "SUPABASE_SECRET_KEY",
);

function validateSupabaseUrl(url: string): void {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(
      "SUPABASE_URL must be a valid URL.",
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.hostname !== "localhost" &&
    parsedUrl.hostname !== "127.0.0.1"
  ) {
    throw new Error(
      "SUPABASE_URL must use HTTPS, except for localhost.",
    );
  }
}

validateSupabaseUrl(supabaseUrl);

export const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);