"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
require("dotenv/config");
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not set");
}
if (!supabaseSecretKey) {
    throw new Error("SUPABASE_SECRET_KEY is not set");
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseSecretKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});
