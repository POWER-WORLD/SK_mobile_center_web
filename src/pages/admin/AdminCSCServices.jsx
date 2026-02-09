import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cscServicesAPI } from '@/services/api';
import AdminTable from '@/components/admin/AdminTable';
import AdminForm from '@/components/admin/AdminForm';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminCSCServices = () => {
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
      const data = await cscServicesAPI.getAll();
      setServices(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load services', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Service Name' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Description' },
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
    { name: 'name', label: 'Service Name', required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'Government Services', label: 'Government Services' },
        { value: 'Banking & Money', label: 'Banking & Money' },
        { value: 'Printing & Scanning', label: 'Printing & Scanning' },
        { value: 'Travel & Tickets', label: 'Travel & Tickets' },
      ]
    },
    { name: 'description', label: 'Description', type: 'textarea' },
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
    if (window.confirm(`Delete ${item.name}?`)) {
      try {
        await cscServicesAPI.delete(item.id);
        toast({ title: 'Deleted', description: 'Service removed successfully.' });
        fetchServices();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete service', variant: 'destructive' });
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (currentItem) {
        await cscServicesAPI.update({ ...formData, id: currentItem.id });
        toast({ title: 'Updated', description: 'Service updated successfully.' });
      } else {
        await cscServicesAPI.create(formData);
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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">CSC Services Management</h2>
        <Button onClick={() => { setCurrentItem(null); setIsEditing(true); }} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      {isEditing ? (
        <AdminForm 
          fields={formFields} 
          initialValues={currentItem || { is_active: true }} 
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

export default AdminCSCServices;