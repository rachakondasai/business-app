import { useState } from "react";
import Tesseract from "tesseract.js";
import Navbar from "../components/Navbar";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = async () => {
      const { data: { text } } = await Tesseract.recognize(reader.result, "eng");
      setResult(text);

      // Determine session based on current time
      const now = new Date();
      const hour = now.getHours();
      let session = "Unknown";
      if (hour >= 10 && hour < 13) session = "Morning";
      else if (hour >= 14 && hour < 16) session = "Afternoon";
      else if (hour >= 18 && hour < 20) session = "Evening";

      // Save to Supabase via API
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
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Upload Image</h1>
        <input type="file" accept="image/*" onChange={handleImage} />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload"}
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="font-bold">Extracted Text:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}