import { useState } from "react";
import Tesseract from "tesseract.js";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return alert("Select an image first");
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      // OCR Extract
      const {
        data: { text },
      } = await Tesseract.recognize(reader.result, "eng");

      setResult(text);

      // 🚀 Send extracted text to API for saving in Supabase
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: text.trim() }),
      });

      const resData = await response.json();
      console.log("Saved to DB:", resData);

      if (!response.ok) {
        alert("Error saving to database: " + resData.error);
      } else {
        window.location.href = "/report";
      }

      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-indigo-400">
      <Navbar />
      <div className="p-8 flex flex-col items-center">
        <motion.h1
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📸 Upload Image
        </motion.h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 border border-indigo-300 rounded-lg p-2 bg-white"
        />

        <motion.button
          className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-lg shadow-lg hover:scale-105 transition-all"
          onClick={handleUpload}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Processing..." : "🚀 Upload & Extract"}
        </motion.button>

        {result && (
          <motion.div
            className="mt-6 w-full max-w-lg bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-semibold text-indigo-700 mb-2">
              ✨ Extracted Text:
            </h2>
            <pre className="text-gray-700 whitespace-pre-wrap">{result}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/report");
      if (!res.ok) throw new Error("Failed to fetch sales data");
      const data = await res.json();
      setSales(data);
    } catch (err) {
      console.error("Report fetch error:", err);
      setError("Unable to load sales data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);