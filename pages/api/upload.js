import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { item } = req.body;

      if (!item) {
        return res.status(400).json({ error: "No item provided" });
      }

      // Determine session
      const now = new Date();
      const hour = now.getHours();
      let session = "Unknown";
      if (hour >= 10 && hour < 13) session = "Morning";
      else if (hour >= 14 && hour < 16) session = "Afternoon";
      else if (hour >= 18 && hour < 20) session = "Evening";

      // Insert into Supabase
      const { data, error } = await supabase
        .from("sales")
        .insert([{ item, session, timestamp: now.toISOString() }]);

      if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, session, data });
    } catch (err) {
      console.error("API upload error:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    // Explicitly reject other methods
    return res.status(405).json({ error: "Method not allowed" });
  }
}