'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminSetupPage() {
  const [step, setStep] = useState(1);
  const [setupKey, setSetupKey] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasExistingAdmin, setHasExistingAdmin] = useState(false);
  const router = useRouter();

  const SETUP_KEY = 'SABAI_ADMIN_SETUP_2024';

  useEffect(() => {
    checkExistingAdmins();
  }, []);

  const checkExistingAdmins = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const admins = users.filter((user: any) => user.role === 'admin');
    setHasExistingAdmin(admins.length > 0);
  };

  const handleSetupKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (setupKey !== SETUP_KEY) {
      setError('Invalid setup key. Please contact system administrator.');
      return;
    }

    setStep(2);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleAdminCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      const existingUser = users.find((u: any) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (existingUser) {
        setError('An account with this email already exists');
        setIsLoading(false);
        return;
      }

      // Create new admin user
      const newAdmin = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email.toLowerCase(),
        password: formData.password,
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
        createdBy: 'system_setup',
        isActive: true
      };

      users.push(newAdmin);
      localStorage.setItem('users', JSON.stringify(users));

      // Log the admin creation
      const adminLogs = JSON.parse(localStorage.getItem('adminAccessLogs') || '[]');
      adminLogs.push({
        adminId: newAdmin.id,
        adminEmail: newAdmin.email,
        action: 'admin_account_created',
        timestamp: new Date().toISOString(),
        ip: 'localhost',
        userAgent: navigator.userAgent
      });
      localStorage.setItem('adminAccessLogs', JSON.stringify(adminLogs));

      setStep(3);
    } catch (err) {
      setError('Failed to create admin account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/admin/auth/login');
  };

  if (hasExistingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shield-check-line w-10 h-10 flex items-center justify-center text-white"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Setup Complete
          </h1>
          
          <p className="text-gray-300 mb-8">
            Admin accounts have already been configured for this system. 
            Use the admin login to access the dashboard.
          </p>

          <div className="space-y-4">
            <Link
              href="/admin/auth/login"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
              Admin Login
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="ri-home-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Step 1: Setup Key Verification */}
        {step === 1 && (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-key-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Admin Setup
              </h2>
              <p className="text-gray-300">
                Enter the setup key to create the first admin account
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
              <form onSubmit={handleSetupKeySubmit} className="space-y-6">
                <div>
                  <label htmlFor="setupKey" className="block text-sm font-medium text-gray-200 mb-2">
                    Setup Key
                  </label>
                  <input
                    id="setupKey"
                    type="password"
                    required
                    value={setupKey}
                    onChange={(e) => setSetupKey(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter setup key"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                    <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                  Continue
                </button>
              </form>
            </div>
          </>
        )}

        {/* Step 2: Admin Account Creation */}
        {step === 2 && (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-add-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Create Admin Account
              </h2>
              <p className="text-gray-300">
                Set up your administrator account
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
              <form onSubmit={handleAdminCreation} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Confirm your password"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                    <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin mr-2"></i>
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      <i className="ri-user-add-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Create Admin Account
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line w-10 h-10 flex items-center justify-center text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Setup Complete!
              </h2>
              <p className="text-gray-300 mb-8">
                Your admin account has been created successfully. You can now access the admin dashboard.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20 text-center">
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-green-200 text-sm">
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-3"></i>
                  <span>Admin account created</span>
                </div>
                <div className="flex items-center text-green-200 text-sm">
                  <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center mr-3"></i>
                  <span>Full permissions granted</span>
                </div>
                <div className="flex items-center text-green-200 text-sm">
                  <i className="ri-key-line w-4 h-4 flex items-center justify-center mr-3"></i>
                  <span>Security logging enabled</span>
                </div>
              </div>

              <button
                onClick={handleLoginRedirect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
              >
                <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                Go to Admin Login
              </button>
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