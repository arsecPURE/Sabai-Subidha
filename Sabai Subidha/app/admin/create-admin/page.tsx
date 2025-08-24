'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateAdminPage() {
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    createAdminAccount();
  }, []);

  const createAdminAccount = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if this admin already exists
      const existingAdmin = users.find((u: any) => u.email.toLowerCase() === 'kingsshnt@gmail.com');
      if (existingAdmin) {
        setError('Admin account with this email already exists');
        return;
      }

      // Create the admin user
      const newAdmin = {
        id: Date.now().toString(),
        fullName: 'Admin User',
        email: 'kingsshnt@gmail.com',
        password: '9745356396@sushantarsec',
        role: 'admin',
        permissions: [
          'manage_orders',
          'manage_products', 
          'manage_users',
          'view_analytics',
          'manage_settings',
          'export_data'
        ],
        isFounder: users.filter((u: any) => u.role === 'admin').length === 0,
        createdAt: new Date().toISOString(),
        createdBy: 'direct_creation',
        isActive: true
      };

      users.push(newAdmin);
      localStorage.setItem('users', JSON.stringify(users));

      // Log the admin creation
      const adminLogs = JSON.parse(localStorage.getItem('adminAccessLogs') || '[]');
      adminLogs.push({
        adminId: newAdmin.id,
        adminEmail: newAdmin.email,
        action: 'admin_account_created_direct',
        timestamp: new Date().toISOString(),
        ip: 'localhost',
        userAgent: navigator.userAgent
      });
      localStorage.setItem('adminAccessLogs', JSON.stringify(adminLogs));

      setIsCreated(true);
    } catch (err) {
      setError('Failed to create admin account');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/admin/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {isCreated ? (
          <>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line w-10 h-10 flex items-center justify-center text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Admin Account Created!
              </h2>
              <p className="text-gray-300 mb-8">
                Your admin account has been successfully created with full permissions.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
              <div className="space-y-4 mb-6">
                <div className="text-center text-white">
                  <h3 className="font-semibold mb-4">Admin Account Details:</h3>
                  <div className="bg-black/20 rounded-lg p-4 text-left">
                    <p><span className="text-gray-300">Email:</span> kingsshnt@gmail.com</p>
                    <p><span className="text-gray-300">Password:</span> 9745356396@sushantarsec</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-green-200 text-sm">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-3"></i>
                    <span>Full admin permissions granted</span>
                  </div>
                  <div className="flex items-center text-green-200 text-sm">
                    <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center mr-3"></i>
                    <span>User management access enabled</span>
                  </div>
                  <div className="flex items-center text-green-200 text-sm">
                    <i className="ri-key-line w-4 h-4 flex items-center justify-center mr-3"></i>
                    <span>Can create additional admin accounts</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLoginRedirect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
              >
                <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                Login to Admin Panel
              </button>
            </div>
          </>
        ) : error ? (
          <>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-error-warning-line w-10 h-10 flex items-center justify-center text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Creation Failed
              </h2>
              <p className="text-gray-300 mb-8">
                {error}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20 text-center">
              <Link
                href="/admin/auth/login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
              >
                <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                Try Admin Login
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-add-line w-8 h-8 flex items-center justify-center text-white animate-pulse"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Creating Admin Account
              </h2>
              <p className="text-gray-300">
                Setting up your admin access...
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </div>
          </>
        )}

        <div className="text-center">
          <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
            <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
            Back to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}