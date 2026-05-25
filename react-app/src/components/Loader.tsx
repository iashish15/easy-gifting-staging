import { motion } from "framer-motion";

const Loader = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-6">
    <motion.div
      className="w-16 h-16 rounded-full border-4 border-brand-500 border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  </div>
);

export default Loader;
