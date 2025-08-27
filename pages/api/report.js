import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Call the SQL function we created
      const { data, error } = await supabase.rpc("group_sales_by_session");

      if (error) {
        console.error("Supabase error:", error.message);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data || []);
    } catch (err) {
      console.error("API /report error:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}