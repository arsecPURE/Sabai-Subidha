
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy S24',
      price: 89999,
      originalPrice: 94999,
      image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20smartphone%20in%20elegant%20black%20color%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20modern%20mobile%20phone%20design%2C%20high%20quality%20studio%20lighting&width=300&height=300&seq=prod1&orientation=squarish',
      rating: 4.5,
      reviews: 128,
      discount: 5
    },
    {
      id: 2,
      name: 'Apple MacBook Air M2',
      price: 124999,
      originalPrice: 134999,
      image: 'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20M2%20laptop%20in%20silver%20color%2C%20sleek%20modern%20design%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20premium%20laptop%20computer&width=300&height=300&seq=prod2&orientation=squarish',
      rating: 4.8,
      reviews: 89,
      discount: 7
    },
    {
      id: 3,
      name: 'Traditional Nepali Kurta',
      price: 2499,
      originalPrice: 2999,
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Nepali%20kurta%20shirt%20in%20royal%20blue%20color%20with%20golden%20patterns%2C%20cultural%20clothing%2C%20professional%20fashion%20photography%20on%20clean%20white%20background%2C%20traditional%20wear&width=300&height=300&seq=prod3&orientation=squarish',
      rating: 4.3,
      reviews: 56,
      discount: 17
    },
    {
      id: 4,
      name: 'Instant Pot Pressure Cooker',
      price: 8999,
      originalPrice: 10499,
      image: 'https://readdy.ai/api/search-image?query=Modern%20electric%20pressure%20cooker%20instant%20pot%2C%20kitchen%20appliance%20in%20stainless%20steel%20finish%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20cooking%20equipment&width=300&height=300&seq=prod4&orientation=squarish',
      rating: 4.6,
      reviews: 234,
      discount: 14
    },
    {
      id: 5,
      name: 'Nike Running Shoes',
      price: 7999,
      originalPrice: 8999,
      image: 'https://readdy.ai/api/search-image?query=Nike%20running%20shoes%20in%20blue%20and%20white%20colors%2C%20athletic%20footwear%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20sports%20shoes%20sneakers&width=300&height=300&seq=prod5&orientation=squarish',
      rating: 4.4,
      reviews: 167,
      discount: 11
    },
    {
      id: 6,
      name: 'Wireless Bluetooth Headphones',
      price: 3999,
      originalPrice: 4999,
      image: 'https://readdy.ai/api/search-image?query=Premium%20wireless%20bluetooth%20headphones%20in%20black%20color%2C%20over-ear%20design%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20audio%20equipment&width=300&height=300&seq=prod6&orientation=squarish',
      rating: 4.2,
      reviews: 143,
      discount: 20
    }
  ];

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: any) => {
    try {
      const existingCart = localStorage.getItem('cart');
      let cartItems = existingCart ? JSON.parse(existingCart) : [];
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add new item
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Trigger cart update event
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show success message
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our best-selling products with amazing deals and fast delivery across Nepal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-product-shop>
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -{product.discount}%
                  </div>
                )}
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <i className={`${wishlist.includes(product.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'} w-5 h-5 flex items-center justify-center`}></i>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`${i < Math.floor(product.rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'} w-4 h-4 flex items-center justify-center`}></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    href={`/products/${product.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap"
                  >
                    <i className="ri-shopping-cart-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            View All Products
            <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
