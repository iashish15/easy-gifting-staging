import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "luxury";
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  hover = true,
}) => {
  const baseClasses = "rounded-2xl overflow-hidden transition-all duration-300";

  const variantClasses = {
    default: "bg-white dark:bg-neutral-800 shadow-soft",
    glass: "glass shadow-glass",
    luxury: "bg-white dark:bg-neutral-800 shadow-luxury",
  };

  const hoverClasses = hover ? "hover:shadow-xl transform hover:scale-105" : "";

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      whileHover={hover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
