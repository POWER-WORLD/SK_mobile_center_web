import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';

function ServiceDetailModal({ isOpen, onClose, service }) {
  if (!service) return null;

  // Function to format text with bullet points and paragraphs
  const formatDetailedDescription = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Empty line creates paragraph break
      if (trimmedLine === '') {
        return <div key={index} className="h-3"></div>;
      }
      
      // Check if line starts with bullet point or dash
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <li key={index} className="ml-4 text-gray-700 leading-relaxed">
            {trimmedLine.substring(1).trim()}
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-2">
          {trimmedLine}
        </p>
      );
    });
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
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {service.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Category Badge */}
                {service.category && (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                      {service.category}
                    </span>
                  </div>
                )}

                {/* Short Description */}
                {service.description && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Overview</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                )}

                {/* Detailed Description */}
                {service.detailed_description && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
                      {formatDetailedDescription(service.detailed_description)}
                    </div>
                  </div>
                )}

                {/* No Details Message */}
                {!service.detailed_description && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800 text-sm">
                      Detailed information is not available for this service. Please contact us for more information.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Need help? <a href="/contact" className="text-blue-600 hover:underline font-semibold">Contact us</a>
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ServiceDetailModal;
