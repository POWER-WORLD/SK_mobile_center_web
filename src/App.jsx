import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import CSCServicesPage from '@/pages/CSCServicesPage';
import MobileAccessoriesPage from '@/pages/MobileAccessoriesPage';
import MobileRepairingPage from '@/pages/MobileRepairingPage';
import ContactPage from '@/pages/ContactPage';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="csc-services" element={<CSCServicesPage />} />
              <Route path="mobile-accessories" element={<MobileAccessoriesPage />} />
              <Route path="mobile-repairing" element={<MobileRepairingPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;