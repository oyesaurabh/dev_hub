"use client";
import { motion } from "framer-motion";

export default function Chat() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[70vh] text-zinc-300"
    >
      <h3 className="text-xl font-medium mb-3 text-white">Under Development</h3>
      <p className="text-sm text-zinc-400 max-w-[250px] text-center">
        This Chat feature is currently under development. Please check back
        later for updates.
      </p>
    </motion.div>
  );
}
