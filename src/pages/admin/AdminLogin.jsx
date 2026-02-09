import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Lock, User, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const { login, loading } = useAdmin();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = 'Username is required';
    if (!password.trim()) errors.password = 'Password is required';
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validate();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500" />
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">SK Mobile Center</h1>
          <p className="text-blue-600 font-medium">Admin Portal Access</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center text-sm border border-red-100"
          >
            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if(validationErrors.username) setValidationErrors(prev => ({...prev, username: ''}));
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${validationErrors.username ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter admin username"
              />
            </div>
            {validationErrors.username && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if(validationErrors.password) setValidationErrors(prev => ({...prev, password: ''}));
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${validationErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Enter admin password"
              />
            </div>
            {validationErrors.password && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">Secure Area. Unauthorized access is prohibited.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;