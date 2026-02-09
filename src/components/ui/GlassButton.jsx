import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GlassButton = ({ children, variant = 'primary', className, onClick, icon: Icon, ...props }) => {
  const variants = {
    primary: "bg-primary-gradient text-white shadow-lg border-transparent",
    secondary: "bg-white/30 backdrop-blur-sm border-white/60 text-white hover:bg-white/50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default GlassButton;