import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import AdminTable from '@/components/admin/AdminTable';
import AdminForm from '@/components/admin/AdminForm';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Mobile Cover', originalPrice: 299, discount: 10, status: 'Available', category: 'Covers', description: 'Premium quality mobile cover with shock protection' },
  { id: 2, name: 'Screen Guard', originalPrice: 150, discount: 0, status: 'Available', category: 'Screen Guards', description: '9H tempered glass screen protection' },
  { id: 3, name: 'Fast Charger', originalPrice: 850, discount: 15, status: 'Available', category: 'Chargers', description: '30W fast charger with cable included' },
  { id: 4, name: 'Wired Earphones', originalPrice: 399, discount: 5, status: 'Available', category: 'Earphones', description: 'High quality wired earphones with deep bass' },
  { id: 5, name: 'Power Bank 10000mAh', originalPrice: 1299, discount: 20, status: 'Out of Stock', category: 'Power Banks', description: 'Portable 10000mAh power bank with fast charging' },
  { id: 6, name: '32GB Memory Card', originalPrice: 450, discount: 10, status: 'Available', category: 'Memory Cards', description: 'High speed 32GB microSD memory card' },
  { id: 7, name: 'Smart Watch', originalPrice: 2500, discount: 30, status: 'Available', category: 'Smart Watches', description: 'Feature-rich smart watch with fitness tracking' },
  { id: 8, name: 'Bluetooth Speaker', originalPrice: 999, discount: 25, status: 'Available', category: 'Speakers', description: 'Portable wireless bluetooth speaker with powerful sound' },
];

const AdminMobileAccessories = () => {
  const [products, setProducts] = useLocalStorage('mobileAccessories', DEFAULT_PRODUCTS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { toast } = useToast();

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    {
      key: 'originalPrice',
      label: 'Price (₹)',
      render: (val) => `₹${val}`
    },
    {
      key: 'discount',
      label: 'Discount',
      render: (val) => <span className="text-orange-600 font-medium">{val}% Off</span>
    },
    {
      key: 'finalPrice',
      label: 'Final Price',
      render: (_, item) => {
        const final = Math.round(item.originalPrice - (item.originalPrice * item.discount / 100));
        return <span className="font-bold text-green-600">₹{final}</span>;
      }
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
      )
    },
  ];

  const formFields = [
    { name: 'name', label: 'Product Name', required: true },
    { name: 'image', label: 'Image URL', placeholder: 'https://...' },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'Covers', label: 'Covers' },
        { value: 'Screen Guards', label: 'Screen Guards' },
        { value: 'Chargers', label: 'Chargers' },
        { value: 'Earphones', label: 'Earphones' },
        { value: 'Power Banks', label: 'Power Banks' },
        { value: 'Smart Watches', label: 'Smart Watches' },
        { value: 'Speakers', label: 'Speakers' },
        { value: 'Memory Cards', label: 'Memory Cards' },
      ]
    },
    { name: 'description', label: 'Product Description', type: 'textarea', required: true },
    { name: 'originalPrice', label: 'Original Price', type: 'number', required: true },
    { name: 'discount', label: 'Discount (%)', type: 'number', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Available', label: 'Available' },
        { value: 'Out of Stock', label: 'Out of Stock' },
        { value: 'Coming Soon', label: 'Coming Soon' }
      ]
    },
  ];

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete ${item.name}?`)) {
      setProducts(prev => prev.filter(i => i.id !== item.id));
      toast({ title: 'Deleted', description: 'Product removed successfully.' });
    }
  };

  const handleSave = (formData) => {
    const processedData = {
      ...formData,
      originalPrice: Number(formData.originalPrice),
      discount: Number(formData.discount)
    };

    if (currentItem) {
      setProducts(prev => prev.map(i => i.id === currentItem.id ? { ...processedData, id: i.id } : i));
      toast({ title: 'Updated', description: 'Product updated successfully.' });
    } else {
      setProducts(prev => [...prev, { ...processedData, id: Date.now() }]);
      toast({ title: 'Created', description: 'New product added successfully.' });
    }
    setIsEditing(false);
    setCurrentItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mobile Accessories Inventory</h2>
        <Button onClick={() => { setCurrentItem(null); setIsEditing(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {isEditing ? (
        <AdminForm 
          fields={formFields} 
          initialValues={currentItem || { status: 'Available', discount: 0 }} 
          onSubmit={handleSave} 
          onCancel={() => setIsEditing(false)} 
          title={currentItem ? 'Edit Product' : 'Add New Product'}
        />
      ) : (
        <AdminTable columns={columns} data={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AdminMobileAccessories;