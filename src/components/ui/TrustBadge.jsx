import React from 'react';
import { motion } from 'framer-motion';

const TrustBadge = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-white flex items-center justify-center mb-4 shadow-inner border border-white">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2 font-display">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default TrustBadge;