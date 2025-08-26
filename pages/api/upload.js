import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { item, session } = req.body;
    const { data, error } = await supabase
      .from("sales")
      .insert([{ item, session }]);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }
  res.status(405).json({ error: "Method not allowed" });
}