
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProductGridProps {
  filters?: {
    priceRange: number[];
    categories: string[];
    brands: string[];
  };
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const allProducts = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      price: 149999,
      originalPrice: 159999,
      image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20smartphone%20in%20titanium%20black%2C%20premium%20mobile%20phone%20with%20S%20Pen%2C%20professional%20product%20photography%20on%20clean%20white%20background&width=300&height=300&seq=prod7&orientation=squarish',
      rating: 4.8,
      reviews: 234,
      discount: 6,
      category: 'Electronics',
      brand: 'Samsung'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      price: 189999,
      originalPrice: 199999,
      image: 'https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20in%20natural%20titanium%20color%2C%20premium%20Apple%20smartphone%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20luxury%20mobile%20device&width=300&height=300&seq=prod8&orientation=squarish',
      rating: 4.9,
      reviews: 156,
      discount: 5,
      category: 'Electronics',
      brand: 'Apple'
    },
    {
      id: 3,
      name: 'Traditional Dhaka Topi',
      price: 899,
      originalPrice: 1199,
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Nepali%20Dhaka%20topi%20hat%20in%20colorful%20patterns%2C%20cultural%20headwear%2C%20authentic%20Nepalese%20traditional%20cap%20on%20clean%20white%20background%2C%20heritage%20clothing&width=300&height=300&seq=prod9&orientation=squarish',
      rating: 4.6,
      reviews: 89,
      discount: 25,
      category: 'Fashion',
      brand: 'Local'
    },
    {
      id: 4,
      name: 'Dell XPS 13 Laptop',
      price: 119999,
      originalPrice: 129999,
      image: 'https://readdy.ai/api/search-image?query=Dell%20XPS%2013%20laptop%20computer%20in%20silver%20color%2C%20ultrabook%20design%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20premium%20notebook%20computer&width=300&height=300&seq=prod10&orientation=squarish',
      rating: 4.7,
      reviews: 167,
      discount: 8,
      category: 'Electronics',
      brand: 'Dell'
    },
    {
      id: 5,
      name: 'Nepali Handwoven Shawl',
      price: 3499,
      originalPrice: 3999,
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20Nepali%20handwoven%20pashmina%20shawl%20in%20burgundy%20color%2C%20traditional%20textile%20craftsmanship%2C%20luxury%20fabric%20on%20clean%20white%20background%2C%20cultural%20heritage&width=300&height=300&seq=prod11&orientation=squarish',
      rating: 4.5,
      reviews: 78,
      discount: 13,
      category: 'Fashion',
      brand: 'Local'
    },
    {
      id: 6,
      name: 'Sony WH-1000XM5 Headphones',
      price: 34999,
      originalPrice: 37999,
      image: 'https://readdy.ai/api/search-image?query=Sony%20WH-1000XM5%20wireless%20noise%20canceling%20headphones%20in%20black%20color%2C%20premium%20audio%20equipment%2C%20professional%20product%20photography%20on%20clean%20white%20background&width=300&height=300&seq=prod12&orientation=squarish',
      rating: 4.8,
      reviews: 203,
      discount: 8,
      category: 'Electronics',
      brand: 'Sony'
    },
    {
      id: 7,
      name: 'Stainless Steel Pressure Cooker',
      price: 4999,
      originalPrice: 5999,
      image: 'https://readdy.ai/api/search-image?query=Stainless%20steel%20pressure%20cooker%20for%20kitchen%20cooking%2C%20modern%20cookware%20appliance%2C%20professional%20product%20photography%20on%20clean%20white%20background%2C%20kitchen%20equipment&width=300&height=300&seq=prod13&orientation=squarish',
      rating: 4.4,
      reviews: 145,
      discount: 17,
      category: 'Home & Kitchen',
      brand: 'Local'
    },
    {
      id: 8,
      name: 'Nike Air Max 270',
      price: 12999,
      originalPrice: 14999,
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Max%20270%20running%20shoes%20in%20white%20and%20blue%20colors%2C%20athletic%20sneakers%20footwear%2C%20professional%20product%20photography%20on%20clean%20white%20background&width=300&height=300&seq=prod14&orientation=squarish',
      rating: 4.6,
      reviews: 189,
      discount: 13,
      category: 'Sports',
      brand: 'Nike'
    }
  ];

  useEffect(() => {
    let products = [...allProducts];

    if (filters) {
      // Filter by price range
      products = products.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );

      // Filter by categories
      if (filters.categories.length > 0) {
        products = products.filter(product => 
          filters.categories.includes(product.category)
        );
      }

      // Filter by brands
      if (filters.brands.length > 0) {
        products = products.filter(product => 
          filters.brands.includes(product.brand)
        );
      }
    }

    // Sort products
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(products);
  }, [filters, sortBy]);

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {filteredProducts.length} products</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border rounded-lg px-4 py-2 text-sm cursor-pointer pr-8"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <i className="ri-search-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-product-shop>
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
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
              
              <div className="p-4">
                <div className="text-xs text-blue-600 font-medium mb-1">{product.category}</div>
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
                    <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    href={`/products/${product.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-semibold text-center text-sm transition-colors whitespace-nowrap cursor-pointer"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                  >
                    <i className="ri-shopping-cart-line w-4 h-4 flex items-center justify-center"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">2</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">3</button>
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 whitespace-nowrap">
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
