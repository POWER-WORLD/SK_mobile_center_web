import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from './GlassButton';

const HeroSection = ({ 
  title, 
  subtitle, 
  badge, 
  backgroundImage, 
  gradientOverlay = "bg-gradient-to-r from-blue-900/90 to-blue-800/80",
  primaryAction,
  secondaryAction
}) => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden rounded-b-[40px] shadow-2xl mb-12">
      {/* Background Image with Parallax-like fixed attachment or absolute positioning */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${gradientOverlay} backdrop-blur-[2px]`} />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {badge && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6 shadow-glow"
            >
              {badge}
            </motion.span>
          )}
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-50 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryAction && (
              <GlassButton onClick={primaryAction.onClick}>
                {primaryAction.label}
              </GlassButton>
            )}
            {secondaryAction && (
              <GlassButton variant="secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </GlassButton>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;