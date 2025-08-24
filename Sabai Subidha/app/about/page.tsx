'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '25,000+', label: 'Products Sold' },
    { number: '500+', label: 'Product Varieties' },
    { number: '7', label: 'Provinces Served' }
  ];

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Nepali%20businessman%20in%20formal%20attire%2C%20confident%20smile%2C%20modern%20office%20background%2C%20corporate%20headshot%20photography%20style&width=300&height=300&seq=team1&orientation=squarish'
    },
    {
      name: 'Sita Gurung',
      role: 'Head of Operations',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Nepali%20businesswoman%20in%20formal%20attire%2C%20confident%20expression%2C%20modern%20office%20background%2C%20corporate%20headshot%20photography%20style&width=300&height=300&seq=team2&orientation=squarish'
    },
    {
      name: 'Kiran Thapa',
      role: 'Customer Relations Manager',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Nepali%20customer%20service%20representative%2C%20friendly%20smile%2C%20modern%20office%20setting%2C%20corporate%20headshot%20photography%20style&width=300&height=300&seq=team3&orientation=squarish'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://readdy.ai/api/search-image?query=Beautiful%20Nepal%20landscape%20with%20traditional%20architecture%20and%20modern%20elements%2C%20Kathmandu%20valley%20view%20with%20mountains%20in%20background%2C%20vibrant%20colors%20representing%20commerce%20and%20tradition&width=1200&height=600&seq=abouthero&orientation=landscape')`
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-bold mb-6">About Sabai Subhida</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Nepal's premier online marketplace bringing you authentic local products, 
              international brands, and everything you need for convenient living across all seven provinces.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Founded in 2020, Sabai Subhida began with a simple mission: to make quality products 
                  accessible to every Nepali household. From our humble beginnings in Kathmandu, we've grown 
                  to become Nepal's most trusted e-commerce platform.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We understand the unique needs of Nepali consumers - from traditional items that connect 
                  us to our heritage, to modern electronics that keep us connected to the world. Our carefully 
                  curated selection includes everything from local drinks and traditional crafts to the latest 
                  smartphones and headphones.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, we serve customers across all seven provinces, delivering convenience, quality, 
                  and trust to doorsteps from Mechi to Mahakali.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://readdy.ai/api/search-image?query=Traditional%20Nepali%20marketplace%20with%20colorful%20products%2C%20local%20vendors%2C%20authentic%20cultural%20atmosphere%2C%20vibrant%20commercial%20activity&width=250&height=200&seq=story1&orientation=landscape"
                  alt="Traditional marketplace"
                  className="rounded-lg shadow-md object-cover w-full h-48"
                />
                <img 
                  src="https://readdy.ai/api/search-image?query=Modern%20warehouse%20facility%20with%20organized%20shelves%2C%20efficient%20logistics%20operation%2C%20clean%20professional%20environment%20for%20e-commerce&width=250&height=200&seq=story2&orientation=landscape"
                  alt="Modern operations"
                  className="rounded-lg shadow-md object-cover w-full h-48 mt-8"
                />
                <img 
                  src="https://readdy.ai/api/search-image?query=Happy%20Nepali%20family%20receiving%20package%20delivery%20at%20home%2C%20smiling%20faces%2C%20authentic%20local%20setting%2C%20customer%20satisfaction%20moment&width=250&height=200&seq=story3&orientation=landscape"
                  alt="Happy customers"
                  className="rounded-lg shadow-md object-cover w-full h-48 -mt-8"
                />
                <img 
                  src="https://readdy.ai/api/search-image?query=Nepal%20map%20showing%20delivery%20network%2C%20logistics%20coverage%20across%20provinces%2C%20modern%20technology%20meeting%20traditional%20geography&width=250&height=200&seq=story4&orientation=landscape"
                  alt="Nationwide delivery"
                  className="rounded-lg shadow-md object-cover w-full h-48"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-heart-line w-8 h-8 flex items-center justify-center text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                  <p className="text-gray-600">
                    Every product is carefully selected and verified to ensure you receive only authentic, 
                    high-quality items that meet our strict standards.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-truck-line w-8 h-8 flex items-center justify-center text-2xl text-green-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
                  <p className="text-gray-600">
                    From Kathmandu to remote districts, we ensure your orders reach you quickly and safely, 
                    with real-time tracking and reliable logistics partners.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-customer-service-2-line w-8 h-8 flex items-center justify-center text-2xl text-purple-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
                  <p className="text-gray-600">
                    Our dedicated support team is here to help you in Nepali, English, or Hindi. 
                    Your satisfaction is our priority, always.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our passionate team works tirelessly to bring you the best shopping experience, 
                combining local knowledge with modern technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                <p className="text-gray-600">The principles that guide everything we do</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                  </div>
                  <h3 className="font-semibold mb-2">Trust</h3>
                  <p className="text-sm text-gray-600">Building lasting relationships through transparency and reliability</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-leaf-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                  </div>
                  <h3 className="font-semibold mb-2">Sustainability</h3>
                  <p className="text-sm text-gray-600">Supporting local businesses and eco-friendly practices</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-lightbulb-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                  </div>
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm text-gray-600">Embracing technology to improve your shopping experience</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-team-line w-6 h-6 flex items-center justify-center text-red-600"></i>
                  </div>
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-sm text-gray-600">Strengthening Nepal's digital economy together</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience the Difference?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Sabai Subhida for their daily needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Start Shopping
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}