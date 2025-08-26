import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="p-4 bg-indigo-600 text-white flex gap-6 shadow-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/upload" className="hover:underline">Upload</Link>
      <Link href="/report" className="hover:underline">Reports</Link>
    </motion.nav>
  );
}