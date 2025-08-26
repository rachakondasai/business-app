import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100">
      <Navbar />
      <motion.div
        className="flex flex-col items-center justify-center h-[80vh] text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent mb-6">
          Business App 🚀
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Manage your sales sessions with ease. Upload images, let OCR extract numbers, 
          and view detailed animated reports automatically.
        </p>
        <a
          href="/upload"
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 text-white text-lg rounded-xl shadow-xl hover:scale-105 transform transition-all"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}