import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Tag, ShoppingBag, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ProductCard({ product, onEdit, onDelete }) {
  const { name, image, originalPrice, discount, status } = product;

  // Calculate prices
  const finalPrice = Math.round(originalPrice - (originalPrice * discount) / 100);
  const savings = originalPrice - finalPrice;
  const isAvailable = status === 'in_stock';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {discount}% OFF
          </div>
        )}

        {/* Status Badge */}
        <div className={cn(
          "absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1",
          isAvailable ? "bg-green-500 text-white" : "bg-gray-600 text-white"
        )}>
          {isAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {status}
        </div>

        {/* Edit/Delete Overlay (Visible on Hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => { e.preventDefault(); onEdit(product); }}
            className="rounded-full bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 shadow-lg transform hover:scale-110 transition-all"
            title="Edit Product"
          >
            <Edit className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={(e) => { e.preventDefault(); onDelete(product); }}
            className="rounded-full shadow-lg transform hover:scale-110 transition-all"
            title="Delete Product"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1" title={name}>
          {name}
        </h3>
        
        <div className="mt-auto space-y-2">
          {/* Price Block */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">₹{finalPrice}</span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
            )}
          </div>
          
          {discount > 0 && (
            <p className="text-sm font-medium text-orange-600">
              Save ₹{savings}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;