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
      const {
        data: { text },
      } = await Tesseract.recognize(reader.result, "eng");
      setResult(text);

      // Determine session by time
      const now = new Date();
      const hour = now.getHours();
      let session = "Unknown";
      if (hour >= 10 && hour < 13) session = "Morning";
      else if (hour >= 14 && hour < 16) session = "Afternoon";
      else if (hour >= 18 && hour < 20) session = "Evening";

      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: text.trim(), session }),
      });
    };
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      <Navbar />
      <div className="p-8 flex flex-col items-center">
        <motion.h1
          className="text-4xl font-extrabold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📸 Upload Image
        </motion.h1>

        <motion.input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 border border-gray-200 text-black rounded-lg p-2 bg-white shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />

        <motion.button
          className="px-8 py-3 font-semibold bg-gradient-to-r from-teal-400 to-indigo-600 text-white rounded-lg shadow-lg hover:scale-105 transition-all"
          onClick={handleUpload}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "⏳ Processing..." : "🚀 Upload & Extract"}
        </motion.button>

        {result && (
          <motion.div
            className="mt-8 w-full max-w-lg bg-white text-gray-800 p-6 rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bold text-indigo-600 mb-2">✨ Extracted Text:</h2>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}