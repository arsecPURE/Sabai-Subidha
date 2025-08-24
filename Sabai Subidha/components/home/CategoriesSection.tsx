
'use client';

import Link from 'next/link';

export default function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      count: '2,450+ items',
      image: 'https://readdy.ai/api/search-image?query=Modern%20electronics%20devices%20including%20smartphones%2C%20laptops%2C%20headphones%20arranged%20beautifully%20on%20clean%20white%20background%2C%20product%20photography%20style%2C%20professional%20lighting%2C%20high%20quality&width=300&height=300&seq=cat1&orientation=squarish',
      icon: 'ri-smartphone-line'
    },
    {
      id: 2,
      name: 'Fashion & Clothing',
      count: '3,200+ items',
      image: 'https://readdy.ai/api/search-image?query=Fashion%20clothing%20collection%20with%20traditional%20Nepali%20and%20modern%20styles%2C%20colorful%20fabrics%2C%20clean%20studio%20photography%2C%20professional%20product%20display%20on%20white%20background&width=300&height=300&seq=cat2&orientation=squarish',
      icon: 'ri-shirt-line'
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      count: '1,800+ items',
      image: 'https://readdy.ai/api/search-image?query=Home%20and%20kitchen%20appliances%20collection%2C%20modern%20cookware%2C%20home%20decor%20items%2C%20clean%20organized%20display%20on%20white%20background%2C%20product%20photography%20style&width=300&height=300&seq=cat3&orientation=squarish',
      icon: 'ri-home-4-line'
    },
    {
      id: 4,
      name: 'Beauty & Personal Care',
      count: '950+ items',
      image: 'https://readdy.ai/api/search-image?query=Beauty%20and%20skincare%20products%20collection%2C%20cosmetics%2C%20personal%20care%20items%20arranged%20elegantly%20on%20clean%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=cat4&orientation=squarish',
      icon: 'ri-heart-pulse-line'
    },
    {
      id: 5,
      name: 'Books & Stationery',
      count: '1,200+ items',
      image: 'https://readdy.ai/api/search-image?query=Books%20and%20stationery%20collection%2C%20educational%20materials%2C%20notebooks%2C%20pens%20arranged%20neatly%20on%20clean%20white%20background%2C%20professional%20product%20photography&width=300&height=300&seq=cat5&orientation=squarish',
      icon: 'ri-book-line'
    },
    {
      id: 6,
      name: 'Sports & Outdoor',
      count: '800+ items',
      image: 'https://readdy.ai/api/search-image?query=Sports%20equipment%20and%20outdoor%20gear%20collection%2C%20fitness%20accessories%2C%20hiking%20gear%20with%20Nepal%20mountain%20backdrop%2C%20professional%20product%20photography%20on%20clean%20background&width=300&height=300&seq=cat6&orientation=squarish',
      icon: 'ri-football-line'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across different categories. Find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`} className="group cursor-pointer">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <i className={`${category.icon} w-8 h-8 flex items-center justify-center text-white text-2xl`}></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/categories"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            View All Categories
            <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
