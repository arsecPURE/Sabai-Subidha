'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuthStatus();
  }, [pathname]);

  const checkAuthStatus = () => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userStr = localStorage.getItem('currentUser');
    
    if (authStatus === 'true' && userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAuthenticated(true);
        setCurrentUser(user);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-['Pacifico'] text-2xl text-blue-600">Sabai Subhida</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Deals
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <i className="ri-shopping-cart-line w-6 h-6 flex items-center justify-center"></i>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Admin Panel Link - Only visible to admins */}
            {isAuthenticated && isAdmin && (
              <Link 
                href="/admin" 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center"
              >
                <i className="ri-admin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Admin Panel
              </Link>
            )}

            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <i className="ri-user-line w-6 h-6 flex items-center justify-center"></i>
                  <span className="hidden sm:block font-medium">{currentUser?.fullName}</span>
                  <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center"></i>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <i className="ri-user-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      <i className="ri-shopping-bag-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      My Orders
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <i className="ri-logout-box-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
                  Login
                </Link>
                <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              <i className="ri-menu-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Categories
              </Link>
              <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Deals
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Contact
              </Link>
              
              {/* Admin Panel Link for Mobile - Only visible to admins */}
              {isAuthenticated && isAdmin && (
                <Link 
                  href="/admin" 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center mt-4"
                >
                  <i className="ri-admin-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}