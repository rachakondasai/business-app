import { useState } from "react";
import Tesseract from "tesseract.js";
import Navbar from "../components/Navbar";

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
      const { data: { text } } = await Tesseract.recognize(reader.result, "eng");
      setResult(text);

      // Determine session
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
    <div>
      <Navbar />
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Upload Image</h1>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload"}
        </button>

        {result && (
          <div className="mt-6 w-full max-w-lg bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Extracted Text:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}