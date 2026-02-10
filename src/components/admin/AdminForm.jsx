import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Save, X, AlertCircle } from 'lucide-react';

const AdminForm = ({ fields, onSubmit, onCancel, initialValues, title }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize form data based on fields and initialValues
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = initialValues && initialValues[field.name] !== undefined 
        ? initialValues[field.name] 
        : field.defaultValue || '';
    });
    setFormData(initialData);
  }, [initialValues, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear specific error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'number' && formData[field.name] < 0) {
        newErrors[field.name] = `${field.label} cannot be negative`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-800">{title || 'Edit Item'}</h3>
        <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-red-50 hover:text-red-500">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                rows={field.rows || 3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder={field.placeholder}
              />
            ) : field.type === 'select' ? (
              <div className="relative">
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white appearance-none transition-all ${errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder={field.placeholder}
              />
            )}
            
            {errors[field.name] && (
              <p className="text-xs text-red-500 flex items-center mt-1">
                <AlertCircle className="w-3 h-3 mr-1" /> {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
          <Button type="button" variant="outline" onClick={onCancel} className="px-6">Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-medium shadow-md">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminForm;