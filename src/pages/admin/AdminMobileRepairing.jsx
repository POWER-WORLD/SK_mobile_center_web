import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import AdminTable from '@/components/admin/AdminTable';
import AdminForm from '@/components/admin/AdminForm';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEFAULT_REPAIR_SERVICES = [
  { id: 1, title: 'Screen Replacement', description: 'Original quality displays', status: 'Active' },
  { id: 2, title: 'Battery Replacement', description: 'High capacity batteries', status: 'Active' },
  { id: 3, title: 'Charging Port Repair', description: 'Fix loose connections', status: 'Active' },
  { id: 4, title: 'Speaker & Mic', description: 'Audio issue resolution', status: 'Active' },
  { id: 5, title: 'Software Issues', description: 'Flashing & Updates', status: 'Active' },
  { id: 6, title: 'Water Damage', description: 'Chemical wash & repair', status: 'Active' },
  { id: 7, title: 'General Checkup', description: 'Full diagnostic', status: 'Active' },
];

const AdminMobileRepairing = () => {
  const [services, setServices] = useLocalStorage('mobileRepairing', DEFAULT_REPAIR_SERVICES);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { toast } = useToast();

  const columns = [
    { key: 'title', label: 'Service Name' },
    { key: 'description', label: 'Description' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </span>
      )
    },
  ];

  const formFields = [
    { name: 'title', label: 'Service Name', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select', 
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ] 
    },
  ];

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete ${item.title}?`)) {
      setServices(prev => prev.filter(i => i.id !== item.id));
      toast({ title: 'Deleted', description: 'Repair service removed successfully.' });
    }
  };

  const handleSave = (formData) => {
    if (currentItem) {
      setServices(prev => prev.map(i => i.id === currentItem.id ? { ...formData, id: i.id } : i));
      toast({ title: 'Updated', description: 'Service updated successfully.' });
    } else {
      setServices(prev => [...prev, { ...formData, id: Date.now() }]);
      toast({ title: 'Created', description: 'New service added successfully.' });
    }
    setIsEditing(false);
    setCurrentItem(null);
  };

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