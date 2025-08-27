import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Papa from "papaparse";
import { saveAs } from "file-saver";

export default function Report() {
  const [sales, setSales] = useState([]);
  const [activeTab, setActiveTab] = useState("Morning");
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
        console.error(err);
        setError("Unable to load sales data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Group by session (memoized)
  const groupedSales = useMemo(
    () =>
      sales.reduce((acc, item) => {
        acc[item.session] = acc[item.session] || [];
        acc[item.session].push(item);
        return acc;
      }, {}),
    [sales]
  );

  const sessions = ["Morning", "Afternoon", "Evening"];

  // CSV Export Function
  const exportCSV = (session) => {
    const rows = groupedSales[session] || [];
    if (rows.length === 0) return;

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${session}-sales.csv`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          📊 Sales Report
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          {sessions.map((session) => (
            <button
              key={session}
              onClick={() => setActiveTab(session)}
              className={`px-6 py-2 rounded-lg shadow-md transition-all ${
                activeTab === session
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {session}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <div className="flex justify-center mb-4">
          <button
            disabled={!groupedSales[activeTab] || groupedSales[activeTab].length === 0}
            onClick={() => exportCSV(activeTab)}
            className={`px-6 py-2 rounded-lg shadow transition-all ${
              groupedSales[activeTab]?.length
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            ⬇ Export {activeTab} Sales
          </button>
        </div>        

        {/* Loading / Error / Report */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {loading ? (
            <p className="text-center text-indigo-600 font-medium">Loading sales...</p>
          ) : error ? (
            <p className="text-center text-red-500 font-medium">{error}</p>
          ) : groupedSales[activeTab]?.length > 0 ? (
            <ul className="space-y-3">
              {groupedSales[activeTab].map((item, index) => (
                <li
                  key={item.id || index}
                  className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-sm border border-indigo-100"
                >
                  <p className="font-medium text-gray-800">{item.item}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded at: {new Date(item.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No sales found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}