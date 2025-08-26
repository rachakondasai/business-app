import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <Navbar />
      <motion.div
        className="flex flex-col items-center justify-center h-[80vh] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
          Business App 🚀
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Manage your sales sessions with ease. Upload images, let OCR extract numbers, 
          and view reports automatically.
        </p>
        <a
          href="/upload"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}