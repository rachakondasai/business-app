import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex gap-4">
      <Link href="/">Upload</Link>
      <Link href="/report">Reports</Link>
    </nav>
  );
}