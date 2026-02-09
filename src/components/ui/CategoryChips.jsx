import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CategoryChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 scrollbar-hide">
      <div className="flex gap-3 px-1 min-w-max">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-sm border",
              activeCategory === category
                ? "bg-primary-gradient text-white border-transparent shadow-lg"
                : "bg-white/30 text-gray-700 border-white/50 hover:bg-white/50 hover:border-white/80"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;