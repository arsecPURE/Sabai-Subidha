
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';

export default function ProductsPage() {
  const [currentFilters, setCurrentFilters] = useState({
    priceRange: [0, 200000],
    categories: [] as string[],
    brands: [] as string[]
  });

  const handleFiltersChange = (filters: { priceRange: number[]; categories: string[]; brands: string[] }) => {
    setCurrentFilters(filters);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Discover amazing products with great deals</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProductFilters onFiltersChange={handleFiltersChange} />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid filters={currentFilters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
