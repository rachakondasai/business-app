import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Sales Report</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Session</th>
              <th className="p-2">Item</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-b">
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