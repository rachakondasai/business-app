import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}