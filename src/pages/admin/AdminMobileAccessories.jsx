import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { accessoriesAPI } from '@/services/api';
import AdminTable from '@/components/admin/AdminTable';
import AdminForm from '@/components/admin/AdminForm';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminMobileAccessories = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await accessoriesAPI.getAll();
      setProducts(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load accessories', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price (₹)',
      render: (val) => `₹${parseFloat(val).toFixed(0)}`
    },
    {
      key: 'stock_status',
      label: 'Stock',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'in_stock' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
  ];

  const formFields = [
    { name: 'name', label: 'Product Name', required: true },
    { name: 'brand', label: 'Brand', placeholder: 'Generic' },
    { name: 'image_url', label: 'Image URL', placeholder: 'https://...' },
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
    { name: 'price', label: 'Price (₹)', type: 'number', required: true },
    {
      name: 'stock_status',
      label: 'Stock Status',
      type: 'select',
      options: [
        { value: 'in_stock', label: 'In Stock' },
        { value: 'out_of_stock', label: 'Out of Stock' }
      ]
    },
  ];

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Delete ${item.name}?`)) {
      try {
        await accessoriesAPI.delete(item.id);
        toast({ title: 'Deleted', description: 'Product removed successfully.' });
        fetchProducts();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (currentItem) {
        await accessoriesAPI.update({ ...formData, id: currentItem.id });
        toast({ title: 'Updated', description: 'Product updated successfully.' });
      } else {
        await accessoriesAPI.create(formData);
        toast({ title: 'Created', description: 'New product added successfully.' });
      }
      setIsEditing(false);
      setCurrentItem(null);
      fetchProducts();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save product', variant: 'destructive' });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mobile Accessories Management</h2>
        <Button onClick={() => { setCurrentItem(null); setIsEditing(true); }} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {isEditing ? (
        <AdminForm 
          fields={formFields} 
          initialValues={currentItem || { stock_status: 'in_stock', brand: 'Generic' }} 
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