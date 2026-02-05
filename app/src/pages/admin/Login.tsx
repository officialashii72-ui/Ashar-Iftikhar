// app/src/pages/admin/Login.tsx - COMPLETE VERSION WITH DEBUG
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@ashariftikhar.com',
    password: 'Admin123!',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (err: any) {
      error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md px-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Login
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Back to Site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ← Back to website
            </a>
          </div>

          {/* DEBUG SECTION - Can remove after login works */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">DEBUG MODE</span>
            </div>
            
            <button
              type="button"
              onClick={async () => {
                console.log('🐛 Debug login started...');
                setIsLoading(true);
                
                try {
                  const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
                  console.log('API URL:', API_URL);
                  
                  const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                      email: 'admin@ashariftikhar.com',
                      password: 'Admin123!'
                    })
                  });
                  
                  console.log('Response status:', response.status);
                  const data = await response.json();
                  console.log('Response data:', data);
                  
                  if (data.success && data.token && data.user) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Update form with successful credentials
                    setFormData({
                      email: 'admin@ashariftikhar.com',
                      password: 'Admin123!'
                    });
                    
                    // Use the auth context login to trigger proper flow
                    await login('admin@ashariftikhar.com', 'Admin123!');
                    navigate('/admin');
                  } else {
                    error(data.message || 'Debug login failed');
                  }
                } catch (err: any) {
                  console.error('Debug error:', err);
                  error(err.message || 'Debug login error');
                } finally {
                  setIsLoading(false);
                }
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <span>🐛</span>
              <span>Debug Login (Admin/Admin123!)</span>
            </button>
            
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>Use this if normal login doesn't work</p>
              <p className="mt-1">Credentials auto-filled: admin@ashariftikhar.com / Admin123!</p>
            </div>
            
            <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                <span>Status: {isLoading ? 'Loading...' : 'Ready'}</span>
              </div>
              <div>API: {process.env.VITE_API_URL || 'http://localhost:5000/api'}</div>
              <div>Token: {localStorage.getItem('token') ? '✅ Stored' : '❌ Missing'}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}