import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GlassCard = ({ children, className, onClick, hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { 
        scale: 1.05, 
        y: -8,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
      } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "bg-white/40 backdrop-blur-md border border-white/40 shadow-soft rounded-[24px] overflow-hidden relative",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;