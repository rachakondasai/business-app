import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Papa from "papaparse";
import { saveAs } from "file-saver";

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
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">Sales Report</h1>
        <button
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          onClick={exportCSV}
        >
          Download CSV
        </button>
        <table className="w-full border shadow-md">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2">Session</th>
              <th className="p-2">Item</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{s.session}</td>
                <td className="p-2">{s.item}</td>
                <td className="p-2">{new Date(s.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}