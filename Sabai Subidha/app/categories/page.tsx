
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      count: '2,450+ items',
      image: 'https://readdy.ai/api/search-image?query=Modern%20electronics%20devices%20including%20smartphones%2C%20laptops%2C%20headphones%20arranged%20beautifully%20on%20clean%20white%20background%2C%20product%20photography%20style%2C%20professional%20lighting%2C%20high%20quality&width=400&height=300&seq=catpage1&orientation=landscape',
      subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Gaming', 'Accessories']
    },
    {
      id: 2,
      name: 'Fashion & Clothing',
      count: '3,200+ items',
      image: 'https://readdy.ai/api/search-image?query=Fashion%20clothing%20collection%20with%20traditional%20Nepali%20and%20modern%20styles%2C%20colorful%20fabrics%2C%20clean%20studio%20photography%2C%20professional%20product%20display%20on%20white%20background&width=400&height=300&seq=catpage2&orientation=landscape',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Traditional Wear', 'Footwear', 'Accessories', 'Bags']
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      count: '1,800+ items',
      image: 'https://readdy.ai/api/search-image?query=Home%20and%20kitchen%20appliances%20collection%2C%20modern%20cookware%2C%20home%20decor%20items%2C%20clean%20organized%20display%20on%20white%20background%2C%20product%20photography%20style&width=400&height=300&seq=catpage3&orientation=landscape',
      subcategories: ['Cookware', 'Appliances', 'Home Decor', 'Furniture', 'Storage', 'Cleaning']
    },
    {
      id: 4,
      name: 'Beauty & Personal Care',
      count: '950+ items',
      image: 'https://readdy.ai/api/search-image?query=Beauty%20and%20skincare%20products%20collection%2C%20cosmetics%2C%20personal%20care%20items%20arranged%20elegantly%20on%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=300&seq=catpage4&orientation=landscape',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Hygiene', 'Health']
    },
    {
      id: 5,
      name: 'Books & Stationery',
      count: '1,200+ items',
      image: 'https://readdy.ai/api/search-image?query=Books%20and%20stationery%20collection%2C%20educational%20materials%2C%20notebooks%2C%20pens%20arranged%20neatly%20on%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=300&seq=catpage5&orientation=landscape',
      subcategories: ['Academic Books', 'Fiction', 'Children\'s Books', 'Notebooks', 'Pens & Pencils', 'Art Supplies']
    },
    {
      id: 6,
      name: 'Sports & Outdoor',
      count: '800+ items',
      image: 'https://readdy.ai/api/search-image?query=Sports%20equipment%20and%20outdoor%20gear%20collection%2C%20fitness%20accessories%2C%20hiking%20gear%20with%20Nepal%20mountain%20backdrop%2C%20professional%20product%20photography%20on%20clean%20background&width=400&height=300&seq=catpage6&orientation=landscape',
      subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Sports Shoes', 'Team Sports', 'Water Sports', 'Yoga & Wellness']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Categories</h1>
            <p className="text-gray-600">Explore our wide range of product categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Popular Subcategories:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 4).map((sub, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/categories/${category.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-center block transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Browse Category
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
