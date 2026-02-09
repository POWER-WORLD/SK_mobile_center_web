import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, Smartphone, Wrench, Menu, X } from 'lucide-react';
import AdminCSCServices from '@/pages/admin/AdminCSCServices';
import AdminMobileAccessories from '@/pages/admin/AdminMobileAccessories';
import AdminMobileRepairing from '@/pages/admin/AdminMobileRepairing';

const AdminDashboard = () => {
  const { adminName, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('csc');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'csc', label: 'CSC Services', icon: FileText },
    { id: 'accessories', label: 'Mobile Accessories', icon: Smartphone },
    { id: 'repairing', label: 'Repairing Services', icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar / Mobile Menu */}
      <aside className={`fixed md:relative z-30 inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">SK Admin</h2>
            <p className="text-xs text-gray-400">Management Console</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
              {adminName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{adminName}</p>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="destructive" 
            className="w-full flex items-center justify-center bg-red-600/80 hover:bg-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
          <span className="font-bold text-gray-800">SK Mobile Center Admin</span>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'csc' && <AdminCSCServices />}
              {activeTab === 'accessories' && <AdminMobileAccessories />}
              {activeTab === 'repairing' && <AdminMobileRepairing />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;