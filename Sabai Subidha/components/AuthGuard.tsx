'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const authExceptions = ['/auth/login', '/auth/register'];

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const currentUser = localStorage.getItem('currentUser');
      
      const isLoggedIn = authStatus === 'true' && currentUser;
      setIsAuthenticated(isLoggedIn);

      if (!isLoggedIn && !authExceptions.includes(pathname)) {
        router.push('/auth/register');
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !authExceptions.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}