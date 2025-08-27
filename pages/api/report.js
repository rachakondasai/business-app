import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("sales")
        .select("id, item, session, timestamp")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
        return res.status(500).json({ error: error.message });
      }

      // Group by session
      const grouped = data.reduce((acc, sale) => {
        if (!acc[sale.session]) acc[sale.session] = [];
        acc[sale.session].push(sale);
        return acc;
      }, {});

      return res.status(200).json(grouped);
    } catch (err) {
      console.error("API /report error:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}