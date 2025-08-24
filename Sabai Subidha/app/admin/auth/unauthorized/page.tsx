'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Log unauthorized access attempt
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      try {
        const user = JSON.parse(currentUserStr);
        const securityLogs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
        securityLogs.push({
          userId: user.id,
          userEmail: user.email,
          action: 'unauthorized_admin_access_attempt',
          timestamp: new Date().toISOString(),
          ip: 'localhost',
          userAgent: navigator.userAgent
        });
        localStorage.setItem('securityLogs', JSON.stringify(securityLogs));
      } catch (error) {
        console.error('Error logging security event:', error);
      }
    }
  }, []);

  const handleGoBack = () => {
    // Clear any admin session attempts
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-red-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <div className="mx-auto w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6">
            <i className="ri-shield-cross-line w-10 h-10 flex items-center justify-center text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-xl text-red-200 mb-6">
            Insufficient Privileges
          </p>
          <p className="text-gray-300 mb-8">
            You don't have the required administrative permissions to access this area. 
            This incident has been logged for security purposes.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="space-y-4">
            <div className="flex items-center text-red-200 text-sm">
              <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center mr-2"></i>
              <span>Administrative access required</span>
            </div>
            <div className="flex items-center text-red-200 text-sm">
              <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-2"></i>
              <span>Unauthorized attempt logged</span>
            </div>
            <div className="flex items-center text-red-200 text-sm">
              <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center mr-2"></i>
              <span>Contact IT administrator for access</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
          >
            <i className="ri-home-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
            Return to Main Website
          </button>
          
          <Link
            href="/admin/auth/login"
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center whitespace-nowrap"
          >
            <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
            Admin Login
          </Link>
        </div>

        <div className="text-xs text-gray-400">
          <p>Security ID: {Date.now()}</p>
          <p>Time: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}