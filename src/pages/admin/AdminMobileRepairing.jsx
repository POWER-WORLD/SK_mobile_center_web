import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { repairingAPI } from '@/services/api';
import AdminTable from '@/components/admin/AdminTable';
import AdminForm from '@/components/admin/AdminForm';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminMobileRepairing = () => {
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await repairingAPI.getAll();
      setServices(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load services', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'service_name', label: 'Service Name' },
    { key: 'description', label: 'Description' },
    { key: 'price_range', label: 'Price Range' },
    { key: 'estimated_time', label: 'Time Required' },
    { 
      key: 'is_active', 
      label: 'Status',
      render: (is_active) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const formFields = [
    { name: 'service_name', label: 'Service Name', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'price_range', label: 'Price Range (e.g., ₹500 - ₹2000)' },
    { name: 'estimated_time', label: 'Estimated Time (e.g., 1-2 hours)' },
    { name: 'brand_compatibility', label: 'Brand Compatibility (optional)', type: 'textarea', placeholder: 'All brands, Samsung, Apple, etc.' },
    { 
      name: 'is_active', 
      label: 'Status', 
      type: 'select', 
      options: [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' }
      ] 
    },
  ];

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Delete ${item.service_name}?`)) {
      try {
        await repairingAPI.delete(item.id);
        toast({ title: 'Deleted', description: 'Repair service removed successfully.' });
        fetchServices();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete service', variant: 'destructive' });
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (currentItem) {
        await repairingAPI.update({ ...formData, id: currentItem.id });
        toast({ title: 'Updated', description: 'Service updated successfully.' });
      } else {
        await repairingAPI.create(formData);
        toast({ title: 'Created', description: 'New service added successfully.' });
      }
      setIsEditing(false);
      setCurrentItem(null);
      fetchServices();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save service', variant: 'destructive' });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center juis_active: true4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mobile Repairing Management</h2>
        <Button onClick={() => { setCurrentItem(null); setIsEditing(true); }} className="bg-orange-600 hover:bg-orange-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Repair Service
        </Button>
      </div>

      {isEditing ? (
        <AdminForm 
          fields={formFields} 
          initialValues={currentItem || { status: 'Active' }} 
          onSubmit={handleSave} 
          onCancel={() => setIsEditing(false)} 
          title={currentItem ? 'Edit Service' : 'Add New Service'}
        />
      ) : (
        <AdminTable columns={columns} data={services} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AdminMobileRepairing;