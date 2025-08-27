import { createClient } from '@supabase/supabase-js'

// Use env variables (safe for Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vpgpqkbhmfuhcbbujcok.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3Bxa2JobWZ1aGNiYnVqY29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzM3NDksImV4cCI6MjA3MTgwOTc0OX0.oWp07nQvEXDYhjNmM5f5WrtFTdEbHCxifVixU6cidW4"; // your anon key

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);