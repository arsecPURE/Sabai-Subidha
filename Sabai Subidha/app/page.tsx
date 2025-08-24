
'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Admin Quick Access - Only visible to admins */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <i className="ri-admin-line w-5 h-5 flex items-center justify-center"></i>
                  <span className="font-medium">Admin Access</span>
                  <span className="text-red-200">|</span>
                  <span className="text-sm">Welcome back, {currentUser?.fullName}</span>
                </div>
                <Link 
                  href="/admin" 
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center"
                >
                  <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        <main>
          <HeroSection />
          <CategoriesSection />
          <FeaturedProducts />
          <WhyChooseUs />
        </main>
        
        <Footer />
      </div>
    </AuthGuard>
  );
}
