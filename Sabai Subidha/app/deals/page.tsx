'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState('flash');

  const flashDeals = [
    {
      id: 1,
      name: 'Samsung Galaxy A54 5G',
      originalPrice: 74999,
      salePrice: 64999,
      discount: 13,
      image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A54%20smartphone%20in%20sleek%20black%20color%2C%20modern%20design%2C%20professional%20product%20photography%20on%20clean%20white%20background&width=300&height=300&seq=deal1&orientation=squarish',
      timeLeft: '2h 45m',
      sold: 67,
      available: 33
    },
    {
      id: 2,
      name: 'Apple AirPods Pro 2nd Gen',
      originalPrice: 32999,
      salePrice: 28999,
      discount: 12,
      image: 'https://readdy.ai/api/search-image?query=Apple%20AirPods%20Pro%20wireless%20earbuds%20in%20white%2C%20premium%20quality%2C%20professional%20product%20photography%20on%20clean%20background&width=300&height=300&seq=deal2&orientation=squarish',
      timeLeft: '1h 23m',
      sold: 89,
      available: 11
    },
    {
      id: 3,
      name: 'JUUL Starter Kit',
      originalPrice: 4999,
      salePrice: 3499,
      discount: 30,
      image: 'https://readdy.ai/api/search-image?query=Modern%20vaping%20device%20starter%20kit%20in%20elegant%20black%20color%2C%20sleek%20design%2C%20professional%20product%20photography%20on%20clean%20white%20background&width=300&height=300&seq=deal3&orientation=squarish',
      timeLeft: '4h 12m',
      sold: 45,
      available: 55
    },
    {
      id: 4,
      name: 'Nike Air Jordan Retro',
      originalPrice: 18999,
      salePrice: 15999,
      discount: 16,
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Jordan%20sneakers%20in%20classic%20red%20and%20white%20colorway%2C%20premium%20basketball%20shoes%2C%20professional%20product%20photography%20on%20clean%20background&width=300&height=300&seq=deal4&orientation=squarish',
      timeLeft: '6h 37m',
      sold: 23,
      available: 77
    }
  ];

  const dailyDeals = [
    {
      id: 5,
      name: 'Coca Cola 12-Pack',
      originalPrice: 1440,
      salePrice: 1199,
      discount: 17,
      image: 'https://readdy.ai/api/search-image?query=Coca%20Cola%2012-pack%20cans%20arranged%20neatly%2C%20refreshing%20beverages%2C%20classic%20red%20branding%2C%20professional%20product%20photography&width=300&height=300&seq=daily1&orientation=squarish'
    },
    {
      id: 6,
      name: 'Sony WH-1000XM5 Headphones',
      originalPrice: 45999,
      salePrice: 39999,
      discount: 13,
      image: 'https://readdy.ai/api/search-image?query=Sony%20premium%20wireless%20headphones%20in%20black%20color%2C%20noise-canceling%20design%2C%20professional%20audio%20equipment%20photography&width=300&height=300&seq=daily2&orientation=squarish'
    },
    {
      id: 7,
      name: 'Marlboro Gold Pack',
      originalPrice: 650,
      salePrice: 580,
      discount: 11,
      image: 'https://readdy.ai/api/search-image?query=Premium%20cigarette%20pack%20in%20gold%20packaging%2C%20luxury%20tobacco%20product%2C%20professional%20product%20photography%20on%20clean%20background&width=300&height=300&seq=daily3&orientation=squarish'
    },
    {
      id: 8,
      name: 'Red Bull Energy Drink 24-Pack',
      originalPrice: 7200,
      salePrice: 6480,
      discount: 10,
      image: 'https://readdy.ai/api/search-image?query=Red%20Bull%20energy%20drink%20cans%2024-pack%2C%20blue%20and%20silver%20branding%2C%20energy%20beverage%20collection%2C%20professional%20photography&width=300&height=300&seq=daily4&orientation=squarish'
    }
  ];

  const weeklyOffers = [
    {
      id: 9,
      name: 'iPhone 15 Pro Max',
      originalPrice: 184999,
      salePrice: 174999,
      discount: 5,
      image: 'https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20in%20titanium%20finish%2C%20premium%20smartphone%2C%20latest%20Apple%20technology%2C%20professional%20product%20photography&width=300&height=300&seq=weekly1&orientation=squarish'
    },
    {
      id: 10,
      name: 'Adidas Ultraboost 22',
      originalPrice: 22999,
      salePrice: 19999,
      discount: 13,
      image: 'https://readdy.ai/api/search-image?query=Adidas%20Ultraboost%20running%20shoes%20in%20black%20and%20white%20design%2C%20premium%20athletic%20footwear%2C%20professional%20sports%20photography&width=300&height=300&seq=weekly2&orientation=squarish'
    },
    {
      id: 11,
      name: 'IQOS ILUMA Device',
      originalPrice: 12999,
      salePrice: 10999,
      discount: 15,
      image: 'https://readdy.ai/api/search-image?query=Modern%20heat-not-burn%20tobacco%20device%20in%20sleek%20white%20design%2C%20premium%20smoking%20alternative%2C%20professional%20product%20photography&width=300&height=300&seq=weekly3&orientation=squarish'
    },
    {
      id: 12,
      name: 'LG 55" 4K Smart TV',
      originalPrice: 89999,
      salePrice: 79999,
      discount: 11,
      image: 'https://readdy.ai/api/search-image?query=LG%2055-inch%204K%20smart%20TV%20with%20thin%20bezels%2C%20modern%20television%20display%2C%20professional%20electronics%20photography%20on%20clean%20background&width=300&height=300&seq=weekly4&orientation=squarish'
    }
  ];

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getCurrentDeals = () => {
    switch (activeTab) {
      case 'flash': return flashDeals;
      case 'daily': return dailyDeals;
      case 'weekly': return weeklyOffers;
      default: return flashDeals;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(220, 38, 127, 0.8), rgba(59, 130, 246, 0.8)), url('https://readdy.ai/api/search-image?query=Exciting%20shopping%20deals%20and%20discounts%20background%20with%20Nepali%20cultural%20elements%2C%20vibrant%20colors%2C%20commercial%20atmosphere%20with%20traditional%20and%20modern%20products&width=1200&height=400&seq=dealshero&orientation=landscape')`
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Amazing Deals & Offers</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover incredible discounts on your favorite products. From electronics to everyday essentials, save big on quality items!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">50%+</div>
                <div className="text-sm">Max Discount</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Products on Sale</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm">New Offers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Deals Navigation */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTab('flash')}
                className={`px-6 py-3 rounded-full font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'flash' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-flashlight-line w-5 h-5 flex items-center justify-center mr-2 inline-flex"></i>
                Flash Deals
              </button>
              <button
                onClick={() => setActiveTab('daily')}
                className={`px-6 py-3 rounded-full font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'daily' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-sun-line w-5 h-5 flex items-center justify-center mr-2 inline-flex"></i>
                Daily Deals
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-6 py-3 rounded-full font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'weekly' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-calendar-line w-5 h-5 flex items-center justify-center mr-2 inline-flex"></i>
                Weekly Offers
              </button>
            </div>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-product-shop>
              {getCurrentDeals().map((deal) => (
                <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{deal.discount}%
                    </div>
                    {deal.timeLeft && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {deal.timeLeft}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{deal.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">{formatPrice(deal.salePrice)}</span>
                      <span className="text-sm text-gray-500 line-through">{formatPrice(deal.originalPrice)}</span>
                    </div>
                    
                    {deal.sold !== undefined && deal.available !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Sold: {deal.sold}</span>
                          <span>Available: {deal.available}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(deal.sold / (deal.sold + deal.available)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Quick Access */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Shop Deals by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Electronics', icon: 'ri-smartphone-line', link: '/categories/electronics' },
                { name: 'Fashion', icon: 'ri-shirt-line', link: '/categories/fashion' },
                { name: 'Beverages', icon: 'ri-cup-line', link: '/categories/beverages' },
                { name: 'Smoking', icon: 'ri-fire-line', link: '/categories/smoking' },
                { name: 'Footwear', icon: 'ri-footprint-line', link: '/categories/footwear' },
                { name: 'Audio', icon: 'ri-headphone-line', link: '/categories/audio' }
              ].map((category, index) => (
                <Link
                  key={index}
                  href={category.link}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <i className={`${category.icon} w-6 h-6 flex items-center justify-center text-blue-600`}></i>
                  </div>
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Never Miss a Deal!</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about flash sales, exclusive offers, and new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white hover:bg-gray-100 text-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}