'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'technology', name: 'Technology', count: 8 },
    { id: 'lifestyle', name: 'Lifestyle', count: 6 },
    { id: 'reviews', name: 'Product Reviews', count: 5 },
    { id: 'tips', name: 'Shopping Tips', count: 3 },
    { id: 'news', name: 'Industry News', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Smartphones Under Rs. 50,000 in Nepal (2024)',
      excerpt: 'Discover the best budget smartphones available in Nepal with excellent features, performance, and value for money.',
      category: 'technology',
      author: 'Suresh Maharjan',
      date: '2024-01-25',
      readTime: '5 min read',
      image: 'https://readdy.ai/api/search-image?query=Collection%20of%20modern%20smartphones%20displayed%20elegantly%20on%20clean%20white%20surface%2C%20various%20brands%2C%20technology%20showcase%2C%20professional%20photography&width=400&height=250&seq=blog1&orientation=landscape',
      featured: true
    },
    {
      id: 2,
      title: 'E-cigarettes vs Traditional Smoking: Health Perspective',
      excerpt: 'An unbiased look at the health implications of vaping compared to traditional cigarettes, based on current research.',
      category: 'lifestyle',
      author: 'Dr. Anjana Thapa',
      date: '2024-01-23',
      readTime: '8 min read',
      image: 'https://readdy.ai/api/search-image?query=Modern%20vaping%20device%20and%20traditional%20cigarettes%20side%20by%20side%20comparison%2C%20health%20concept%2C%20clean%20medical%20style%20photography&width=400&height=250&seq=blog2&orientation=landscape'
    },
    {
      id: 3,
      title: 'Best Energy Drinks for Athletes in Nepal',
      excerpt: 'Complete guide to energy drinks available in Nepal, their ingredients, benefits, and which ones work best for different activities.',
      category: 'reviews',
      author: 'Bikash Adhikari',
      date: '2024-01-20',
      readTime: '6 min read',
      image: 'https://readdy.ai/api/search-image?query=Various%20energy%20drink%20brands%20arranged%20attractively%2C%20sports%20and%20fitness%20theme%2C%20colorful%20beverage%20cans%2C%20professional%20product%20photography&width=400&height=250&seq=blog3&orientation=landscape'
    },
    {
      id: 4,
      title: 'How to Choose the Perfect Headphones in 2024',
      excerpt: 'Complete buying guide for headphones covering different types, features, price ranges, and recommendations for Nepal market.',
      category: 'tips',
      author: 'Priya Shrestha',
      date: '2024-01-18',
      readTime: '7 min read',
      image: 'https://readdy.ai/api/search-image?query=Premium%20headphones%20collection%20showcasing%20different%20styles%20and%20brands%2C%20audio%20equipment%20display%2C%20professional%20technology%20photography&width=400&height=250&seq=blog4&orientation=landscape'
    },
    {
      id: 5,
      title: 'Rise of E-commerce in Nepal: 2024 Trends',
      excerpt: 'Analysis of Nepal\'s growing e-commerce sector, consumer behavior changes, and what it means for local businesses.',
      category: 'news',
      author: 'Ramesh Koirala',
      date: '2024-01-15',
      readTime: '10 min read',
      image: 'https://readdy.ai/api/search-image?query=Nepal%20digital%20marketplace%20concept%20with%20traditional%20and%20modern%20elements%2C%20e-commerce%20growth%20visualization%2C%20business%20analytics%20theme&width=400&height=250&seq=blog5&orientation=landscape'
    },
    {
      id: 6,
      title: 'Sneaker Culture in Nepal: From Streets to Style',
      excerpt: 'Exploring how sneaker fashion has evolved in Nepal, popular brands, and where to find authentic footwear.',
      category: 'lifestyle',
      author: 'Ashish Tamang',
      date: '2024-01-12',
      readTime: '4 min read',
      image: 'https://readdy.ai/api/search-image?query=Trendy%20sneakers%20collection%20in%20various%20colors%20and%20styles%2C%20street%20fashion%20photography%2C%20modern%20footwear%20display%20on%20urban%20background&width=400&height=250&seq=blog6&orientation=landscape'
    },
    {
      id: 7,
      title: 'iPhone 15 Pro Max Review: Worth the Premium?',
      excerpt: 'In-depth review of Apple\'s latest flagship including camera performance, battery life, and value proposition in Nepal.',
      category: 'reviews',
      author: 'Nischal Basnet',
      date: '2024-01-10',
      readTime: '12 min read',
      image: 'https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20detailed%20product%20photography%20showing%20camera%20system%20and%20design%2C%20premium%20smartphone%20review%20setup&width=400&height=250&seq=blog7&orientation=landscape'
    },
    {
      id: 8,
      title: 'Sustainable Shopping: Eco-friendly Products in Nepal',
      excerpt: 'Guide to environmentally conscious shopping choices available in Nepal, from packaging to product lifecycle.',
      category: 'lifestyle',
      author: 'Shristi Karki',
      date: '2024-01-08',
      readTime: '6 min read',
      image: 'https://readdy.ai/api/search-image?query=Eco-friendly%20products%20and%20sustainable%20packaging%20materials%2C%20green%20living%20concept%2C%20natural%20materials%20and%20recycled%20items&width=400&height=250&seq=blog8&orientation=landscape'
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = activeCategory === 'all' 
    ? regularPosts 
    : regularPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sabai Subhida Blog</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stay informed with the latest product reviews, shopping tips, technology trends, and lifestyle insights from Nepal and beyond.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="capitalize bg-gray-100 px-2 py-1 rounded">{featuredPost.category}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <i className="ri-user-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
                        </div>
                        <span className="text-sm text-gray-600">{featuredPost.author}</span>
                      </div>
                      <Link 
                        href={`/blog/${featuredPost.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCategory === category.id 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="capitalize">{category.name}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
                <p className="text-gray-600 mb-4">Get the latest articles delivered to your inbox.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === activeCategory)?.name} Articles`}
                </h2>
                <span className="text-gray-500">{filteredPosts.length} articles</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-medium capitalize">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                            <i className="ri-user-line w-4 h-4 flex items-center justify-center text-gray-600"></i>
                          </div>
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm whitespace-nowrap cursor-pointer"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}