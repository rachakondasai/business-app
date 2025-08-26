import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center p-12">
        <motion.h1
          className="text-5xl font-extrabold text-indigo-700 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          SMK Traders 🏪
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-6 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Manage your sales sessions with ease. Upload images, let OCR extract
          numbers, and view detailed animated reports automatically.
        </motion.p>
        <motion.a
          href="/upload"
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          🚀 Get Started
        </motion.a>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-indigo-700 text-white mt-12 shadow-lg">
        <p className="text-sm">Created by <span className="font-semibold">Rachakonda Sai</span> ❤️</p>
      </footer>
    </div>
  );
}