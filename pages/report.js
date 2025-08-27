import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Report() {
  const [sales, setSales] = useState([]);
  const [activeSession, setActiveSession] = useState("Morning");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const exportCSV = (session) => {
    const sessionSales = sales.find((s) => s.session === session)?.sales || [];
    const csvContent = [
      ["ID", "Item", "Session", "Timestamp"],
      ...sessionSales.map((s) => [s.id, s.item, s.session, s.timestamp]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${session}_sales.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSales = () => {
    const sessionSales = sales.find((s) => s.session === activeSession)?.sales || [];

    if (loading) return <p>Loading sales...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (sessionSales.length === 0) return <p>No sales found.</p>;

    return sessionSales.map((sale) => (
      <motion.div
        key={sale.id}
        className="p-4 bg-white rounded-lg shadow mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-semibold text-gray-800">{sale.item}</p>
        <p className="text-sm text-gray-500">
          Uploaded at:{" "}
          {sale.timestamp ? new Date(sale.timestamp).toLocaleString() : "N/A"}
        </p>
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Navbar />
      <div className="p-8 max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-indigo-700 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📊 Sales Report
        </motion.h1>

        <div className="flex justify-center gap-4 mb-6">
          {["Morning", "Afternoon", "Evening"].map((session) => (
            <button
              key={session}
              onClick={() => setActiveSession(session)}
              className={`px-4 py-2 rounded-lg shadow-md ${
                activeSession === session
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {session}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => exportCSV(activeSession)}
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:scale-105 transition-all"
          >
            📥 Export {activeSession} Sales
          </button>
        </div>

        <div>{renderSales()}</div>
      </div>
    </div>
  );
}