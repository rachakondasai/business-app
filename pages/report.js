import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

export default function Report() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/report");
      const data = await res.json();
      setSales(data);
    }
    fetchData();
  }, []);

  // Export sales as CSV
  const exportCSV = () => {
    if (sales.length === 0) return alert("No data to export");

    const csv = Papa.unparse(
      sales.map((s) => ({
        Session: s.session,
        Item: s.item,
        Time: new Date(s.created_at).toLocaleString(),
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales-report.csv");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-100 to-purple-100">
      <Navbar />
      <div className="p-6">
        <motion.h1
          className="text-3xl font-bold mb-6 text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sales Report
        </motion.h1>
        <motion.button
          className="mb-4 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:scale-105 transition-all"
          onClick={exportCSV}
          whileTap={{ scale: 0.95 }}
        >
          Download CSV
        </motion.button>

        <motion.table
          className="w-full border shadow-lg rounded-xl overflow-hidden bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <thead>
            <tr className="bg-indigo-200 text-indigo-900">
              <th className="p-3">Session</th>
              <th className="p-3">Item</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <motion.tr
                key={s.id}
                className="border-b hover:bg-indigo-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <td className="p-3">{s.session}</td>
                <td className="p-3">{s.item}</td>
                <td className="p-3">{new Date(s.created_at).toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}