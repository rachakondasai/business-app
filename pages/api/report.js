import supabase from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Report fetch error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}