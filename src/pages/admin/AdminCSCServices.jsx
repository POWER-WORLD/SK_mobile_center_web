import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import AdminTable from '@/components/admin/AdminTable';
import AdminForm from '@/components/admin/AdminForm';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEFAULT_CSC_SERVICES = [
  { id: 1, title: 'Online Form Filling', description: 'Jobs, Exams, Admissions', status: 'Active' },
  { id: 2, title: 'Aadhaar Services', description: 'Updates & Corrections', status: 'Active' },
  { id: 3, title: 'PAN Card', description: 'New & Corrections', status: 'Active' },
  { id: 4, title: 'PM Schemes', description: 'PM Kisan, PM Awas', status: 'Active' },
  { id: 5, title: 'Insurance', description: 'Vehicle & Health', status: 'Active' },
  { id: 6, title: 'Pension', description: 'Old age, Widow', status: 'Active' },
  { id: 7, title: 'Digital Seva', description: 'All CSC Services', status: 'Active' },
  { id: 8, title: 'Printing & Scan', description: 'Color/BW, Lamination', status: 'Active' },
  { id: 9, title: 'Passport/Visa', description: 'Application Assistance', status: 'Active' },
  { id: 10, title: 'Bill Payments', description: 'Electricity, Recharge', status: 'Active' },
];

const AdminCSCServices = () => {
  const [services, setServices] = useLocalStorage('cscServices', DEFAULT_CSC_SERVICES);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { toast } = useToast();

  const columns = [
    { key: 'title', label: 'Service Name' },
    { key: 'category', label: 'Category' },
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
      toast({ title: 'Deleted', description: 'Service removed successfully.' });
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
        <h2 className="text-2xl font-bold text-gray-800">CSC Services Management</h2>
        <Button onClick={() => { setCurrentItem(null); setIsEditing(true); }} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add New Service
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

export default AdminCSCServices;