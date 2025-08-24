
'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';

interface CategoryDetailProps {
  categoryId: string;
}

export default function CategoryDetail({ categoryId }: CategoryDetailProps) {
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const categories: { [key: string]: any } = {
    '1': {
      name: 'Electronics',
      description: 'Latest technology and electronic devices',
      banner: 'https://readdy.ai/api/search-image?query=Electronics%20banner%20with%20modern%20devices%2C%20smartphones%2C%20laptops%2C%20headphones%20on%20clean%20gradient%20background%2C%20technology%20theme&width=1200&height=300&seq=catbanner1&orientation=landscape'
    },
    '2': {
      name: 'Fashion & Clothing',
      description: 'Trendy fashion and traditional wear',
      banner: 'https://readdy.ai/api/search-image?query=Fashion%20clothing%20banner%20with%20colorful%20traditional%20and%20modern%20clothes%2C%20textile%20patterns%2C%20Nepal%20fashion%20style%20on%20gradient%20background&width=1200&height=300&seq=catbanner2&orientation=landscape'
    },
    '3': {
      name: 'Home & Kitchen',
      description: 'Everything for your home and kitchen needs',
      banner: 'https://readdy.ai/api/search-image?query=Home%20and%20kitchen%20banner%20with%20modern%20appliances%2C%20cookware%2C%20home%20decor%20items%20on%20clean%20gradient%20background&width=1200&height=300&seq=catbanner3&orientation=landscape'
    },
    '4': {
      name: 'Beauty & Personal Care',
      description: 'Beauty and wellness products',
      banner: 'https://readdy.ai/api/search-image?query=Beauty%20and%20skincare%20banner%20with%20cosmetics%2C%20skincare%20products%2C%20beauty%20accessories%20on%20elegant%20gradient%20background&width=1200&height=300&seq=catbanner4&orientation=landscape'
    },
    '5': {
      name: 'Books & Stationery',
      description: 'Books, educational materials and stationery',
      banner: 'https://readdy.ai/api/search-image?query=Books%20and%20stationery%20banner%20with%20educational%20books%2C%20notebooks%2C%20pens%20arranged%20on%20clean%20gradient%20background&width=1200&height=300&seq=catbanner5&orientation=landscape'
    },
    '6': {
      name: 'Sports & Outdoor',
      description: 'Sports equipment and outdoor gear',
      banner: 'https://readdy.ai/api/search-image?query=Sports%20and%20outdoor%20banner%20with%20fitness%20equipment%2C%20hiking%20gear%2C%20sports%20accessories%20with%20mountain%20backdrop&width=1200&height=300&seq=catbanner6&orientation=landscape'
    }
  };

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy S23',
      price: 89999,
      originalPrice: 99999,
      image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S23%20smartphone%20product%20photo%20on%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=prod1&orientation=squarish',
      rating: 4.8,
      reviews: 234,
      discount: 10
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      price: 179999,
      originalPrice: 189999,
      image: 'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20M2%20laptop%20product%20photo%20on%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=prod2&orientation=squarish',
      rating: 4.9,
      reviews: 156,
      discount: 5
    },
    {
      id: 3,
      name: 'Sony WH-1000XM4',
      price: 24999,
      originalPrice: 29999,
      image: 'https://readdy.ai/api/search-image?query=Sony%20WH-1000XM4%20wireless%20headphones%20product%20photo%20on%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=prod3&orientation=squarish',
      rating: 4.7,
      reviews: 189,
      discount: 17
    },
    {
      id: 4,
      name: 'iPhone 14 Pro',
      price: 149999,
      originalPrice: 159999,
      image: 'https://readdy.ai/api/search-image?query=iPhone%2014%20Pro%20smartphone%20product%20photo%20on%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=prod4&orientation=squarish',
      rating: 4.8,
      reviews: 298,
      discount: 6
    },
    {
      id: 5,
      name: 'Dell XPS 13',
      price: 134999,
      originalPrice: 149999,
      image: 'https://readdy.ai/api/search-image?query=Dell%20XPS%2013%20laptop%20product%20photo%20on%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=prod5&orientation=squarish',
      rating: 4.6,
      reviews: 142,
      discount: 10
    },
    {
      id: 6,
      name: 'Canon EOS R6',
      price: 199999,
      originalPrice: 219999,
      image: 'https://readdy.ai/api/search-image?query=Canon%20EOS%20R6%20mirrorless%20camera%20product%20photo%20on%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=prod6&orientation=squarish',
      rating: 4.9,
      reviews: 87,
      discount: 9
    }
  ];

  const currentCategory = categories[categoryId] || categories['1'];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Category Banner */}
        <section className="relative h-64 overflow-hidden">
          <img 
            src={currentCategory.banner}
            alt={currentCategory.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="text-white">
                <nav className="flex text-sm mb-4">
                  <Link href="/" className="text-white/80 hover:text-white">Home</Link>
                  <span className="mx-2 text-white/60">/</span>
                  <Link href="/categories" className="text-white/80 hover:text-white">Categories</Link>
                  <span className="mx-2 text-white/60">/</span>
                  <span className="text-white">{currentCategory.name}</span>
                </nav>
                <h1 className="text-4xl font-bold mb-2">{currentCategory.name}</h1>
                <p className="text-xl text-white/90">{currentCategory.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Showing {products.length} products</span>
              </div>
              
              <div className="flex items-center gap-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest First</option>
                </select>
                
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-700 hover:text-white transition-colors`}
                  >
                    <i className="ri-grid-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} hover:bg-blue-700 hover:text-white transition-colors`}
                  >
                    <i className="ri-list-unordered w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4" data-product-shop>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <div key={product.id} className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        -{product.discount}%
                      </div>
                    )}
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <i className="ri-heart-line w-4 h-4 flex items-center justify-center text-gray-600"></i>
                    </button>
                  </div>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} w-4 h-4 flex items-center justify-center text-yellow-400`}></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-gray-900">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">3</button>
                <span className="px-3 py-2 text-gray-400">...</span>
                <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">12</button>
                <button className="px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
