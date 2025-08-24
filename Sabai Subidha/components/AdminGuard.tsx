
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  permissions?: string[];
  createdAt: string;
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const currentUserStr = localStorage.getItem('currentUser');
      
      if (authStatus !== 'true' || !currentUserStr) {
        setIsAuthorized(false);
        setIsLoading(false);
        router.push('/admin/login');
        return;
      }

      try {
        const currentUser: User = JSON.parse(currentUserStr);
        
        // Check if user has admin role
        if (currentUser.role !== 'admin') {
          setIsAuthorized(false);
          setIsLoading(false);
          router.push('/admin/auth/unauthorized');
          return;
        }

        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthorized(false);
        setIsLoading(false);
        router.push('/admin/login');
      }
    };

    checkAdminAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
