"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// A "template" is like a layout, but Next.js shows it again on every page change.
// So each new page fades in softly.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}