
'use client';

import { useState } from 'react';

interface ProductFiltersProps {
  onFiltersChange?: (filters: {
    priceRange: number[];
    categories: string[];
    brands: string[];
  }) => void;
}

export default function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const categories = [
    'Electronics', 'Fashion', 'Home & Kitchen', 
    'Beauty & Personal Care', 'Books & Stationery', 'Sports'
  ];

  const brands = [
    'Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'LG', 'Dell', 'HP'
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({
        priceRange,
        categories: selectedCategories,
        brands: selectedBrands
      });
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    if (onFiltersChange) {
      onFiltersChange({
        priceRange: [0, 200000],
        categories: [],
        brands: []
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          Clear All
        </button>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          <input 
            type="range" 
            min="0" 
            max="200000" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Rs. 0</span>
            <span>Rs. {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input 
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="mr-2 cursor-pointer"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Brands</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input 
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="mr-2 cursor-pointer"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button 
          onClick={applyFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
        >
          Apply Filters
        </button>
        
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[1] < 200000) && (
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">Active Filters:</h5>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map(category => (
                <span key={category} className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {category}
                  <button onClick={() => toggleCategory(category)} className="ml-1 cursor-pointer">
                    <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                  </button>
                </span>
              ))}
              {selectedBrands.map(brand => (
                <span key={brand} className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {brand}
                  <button onClick={() => toggleBrand(brand)} className="ml-1 cursor-pointer">
                    <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                  </button>
                </span>
              ))}
              {priceRange[1] < 200000 && (
                <span className="inline-flex items-center bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  Up to Rs. {priceRange[1].toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
