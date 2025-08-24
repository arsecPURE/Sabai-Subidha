
'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[600px] bg-gradient-to-r from-blue-600 to-purple-600 flex items-center"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20e-commerce%20shopping%20experience%20in%20Nepal%20with%20traditional%20Nepali%20mountains%20in%20background%2C%20online%20shopping%20concept%20with%20smartphones%20and%20packages%2C%20warm%20lighting%2C%20professional%20photography%20style%2C%20clean%20and%20organized%20delivery%20system&width=1200&height=600&seq=hero1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sabai Subhida
Your Online Shopping Paradise
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Discover quality products delivered right to your doorstep across Nepal. From electronics to fashion, we have everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Shop Now
            </Link>
            <Link 
              href="/categories"
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
