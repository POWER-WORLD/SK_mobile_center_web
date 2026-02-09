import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ProductModal({ isOpen, onClose, onSave, product }) {
  const initialFormState = {
    name: '',
    originalPrice: '',
    discount: '',
    status: 'Available',
    image: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        originalPrice: product.originalPrice,
        discount: product.discount,
        status: product.status,
        image: product.image || '',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [product, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.originalPrice || Number(formData.originalPrice) <= 0) newErrors.originalPrice = 'Valid price is required';
    if (formData.discount === '' || Number(formData.discount) < 0 || Number(formData.discount) > 100) newErrors.discount = 'Discount must be 0-100';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      originalPrice: Number(formData.originalPrice),
      discount: Number(formData.discount),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900">
                  {product ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Premium Mobile Cover"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="0.00"
                    />
                    {errors.originalPrice && <p className="text-red-500 text-xs mt-1">{errors.originalPrice}</p>}
                  </div>

                  {/* Discount */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Discount (%)</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="0"
                    />
                    {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Image URL</label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use default placeholder</p>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    {product ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProductModal;