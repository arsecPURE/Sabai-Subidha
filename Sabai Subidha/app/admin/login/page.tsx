'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create admin account if it doesn't exist
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if admin exists, if not create one
      let adminUser = users.find((u: any) => u.role === 'admin');
      
      if (!adminUser) {
        adminUser = {
          id: '1',
          fullName: 'Admin User',
          email: 'admin@company.com',
          password: 'admin123',
          role: 'admin',
          permissions: ['all'],
          isActive: true,
          createdAt: new Date().toISOString()
        };
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Check credentials - flexible matching
      const isValidAdmin = (
        (credentials.email === 'admin@company.com' || credentials.email === adminUser.email) &&
        (credentials.password === 'admin123' || credentials.password === adminUser.password)
      );

      if (isValidAdmin) {
        // Set admin session
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('adminSession', JSON.stringify({
          userId: adminUser.id,
          loginTime: new Date().toISOString(),
          sessionId: Date.now().toString()
        }));

        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setError('Invalid credentials. Try: admin@company.com / admin123');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-admin-line w-10 h-10 flex items-center justify-center text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Control Panel</h1>
          <p className="text-gray-300">Independent admin access for website management</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter admin email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm">
                <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <i className="ri-loader-4-line w-5 h-5 flex items-center justify-center animate-spin mr-2"></i>
                  Accessing Admin Panel...
                </div>
              ) : (
                <>
                  <i className="ri-login-circle-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <h3 className="text-white font-medium mb-2">Quick Access Credentials:</h3>
            <p className="text-green-200 text-sm">Email: admin@company.com</p>
            <p className="text-green-200 text-sm">Password: admin123</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
            Secure independent admin portal
          </p>
        </div>
      </div>
    </div>
  );
}