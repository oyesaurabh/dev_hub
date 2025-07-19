import { Bell } from "lucide-react";
import { motion } from "framer-motion";

const NoNotification = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[70vh] text-zinc-300"
    >
      <div className="relative mb-8 p-6 rounded-full bg-primary/10">
        <Bell className="w-16 h-16 text-primary" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-medium mb-3 text-white">
        No notifications yet
      </h3>
      <p className="text-sm text-zinc-400 max-w-[250px] text-center">
        When you receive notifications, they&apos;ll appear here
      </p>
    </motion.div>
  );
};

export default NoNotification;
