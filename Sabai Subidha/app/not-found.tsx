'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <img 
              src="https://readdy.ai/api/search-image?query=404%20error%20page%20illustration%20with%20confused%20person%20looking%20at%20empty%20boxes%2C%20modern%20minimalist%20design%2C%20friendly%20and%20approachable%20style&width=400&height=300&seq=404page&orientation=landscape"
              alt="Page not found"
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
            
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Go Back Home
              </Link>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap cursor-pointer"
                >
                  Browse Products
                </Link>
                <Link 
                  href="/categories"
                  className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap cursor-pointer"
                >
                  View Categories
                </Link>
                <Link 
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap cursor-pointer"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}