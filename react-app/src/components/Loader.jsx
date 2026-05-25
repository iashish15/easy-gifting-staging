import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>

        {/* Inner spinning ring */}
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full"></div>
      </motion.div>

      <motion.p
        className="absolute mt-24 text-neutral-600 dark:text-neutral-400 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Loading your perfect gifts...
      </motion.p>
    </div>
  );
};

export default Loader;
