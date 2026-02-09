import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DeleteConfirmation({ isOpen, onClose, onConfirm, productName }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 pointer-events-auto border border-red-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{productName}"</span>? 
                  This action cannot be undone.
                </p>

                <div className="flex w-full gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 bg-red-600 hover:bg-red-700" 
                    onClick={onConfirm}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteConfirmation;