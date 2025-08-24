
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Debug: Log available admin accounts
      console.log('Available users:', users.map(u => ({ email: u.email, role: u.role, isActive: u.isActive })));
      
      // Find admin user with more flexible matching
      const adminUser = users.find((u: any) => {
        const emailMatch = u.email && u.email.toLowerCase() === formData.email.toLowerCase();
        const passwordMatch = u.password === formData.password;
        const isAdmin = u.role === 'admin';
        const isActive = u.isActive !== false; // Default to true if not set
        
        console.log(`Checking user ${u.email}: emailMatch=${emailMatch}, passwordMatch=${passwordMatch}, isAdmin=${isAdmin}, isActive=${isActive}`);
        
        return emailMatch && passwordMatch && isAdmin && isActive;
      });

      if (adminUser) {
        // Update last login time
        adminUser.lastLogin = new Date().toISOString();
        
        // Update user in users array
        const updatedUsers = users.map((u: any) => 
          u.id === adminUser.id ? adminUser : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Set current admin session
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('adminSession', JSON.stringify({
          userId: adminUser.id,
          loginTime: new Date().toISOString(),
          sessionId: Date.now().toString()
        }));

        // Log successful admin access
        const adminLogs = JSON.parse(localStorage.getItem('adminAccessLogs') || '[]');
        adminLogs.push({
          adminId: adminUser.id,
          adminEmail: adminUser.email,
          action: 'successful_login',
          timestamp: new Date().toISOString(),
          ip: 'localhost',
          userAgent: navigator.userAgent,
          sessionId: Date.now().toString()
        });
        localStorage.setItem('adminAccessLogs', JSON.stringify(adminLogs));

        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        // Check if any admin accounts exist
        const adminUsers = users.filter((u: any) => u.role === 'admin');
        
        if (adminUsers.length === 0) {
          setError('No admin accounts found. Please create an admin account first.');
        } else {
          // Log failed login attempt
          const securityLogs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
          securityLogs.push({
            email: formData.email,
            action: 'failed_admin_login',
            timestamp: new Date().toISOString(),
            ip: 'localhost',
            userAgent: navigator.userAgent,
            reason: 'invalid_credentials'
          });
          localStorage.setItem('securityLogs', JSON.stringify(securityLogs));

          setError('Invalid email or password. Please check your credentials.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = () => {
    router.push('/admin/create-admin');
  };

  const handleSetupRedirect = () => {
    router.push('/admin/setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <i className="ri-shield-user-line w-8 h-8 flex items-center justify-center text-white"></i>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Admin Access
          </h2>
          <p className="text-gray-300">
            Secure login for authorized administrators
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin mr-2"></i>
                  Authenticating...
                </div>
              ) : (
                <>
                  <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Admin Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
              Back to Main Website
            </Link>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 px-4 py-3 rounded-lg text-sm">
            <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
            This is a secure admin area. Access is restricted to authorized personnel only.
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleCreateAdmin}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Quick Admin Setup
            </button>
            
            <button
              onClick={handleSetupRedirect}
              className="text-gray-400 hover:text-gray-300 text-xs transition-colors"
            >
              Full Setup Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
