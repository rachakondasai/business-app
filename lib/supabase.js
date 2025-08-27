import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-side

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);