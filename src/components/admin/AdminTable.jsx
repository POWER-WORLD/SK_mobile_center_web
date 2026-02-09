import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-sm font-semibold text-gray-600">
                {col.label}
              </th>
            ))}
            <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <motion.tr 
                key={item.id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-blue-50/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;