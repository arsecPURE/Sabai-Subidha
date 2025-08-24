'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'ri-question-line' },
    { id: 'orders', name: 'Orders & Shipping', icon: 'ri-truck-line' },
    { id: 'returns', name: 'Returns & Refunds', icon: 'ri-arrow-go-back-line' },
    { id: 'account', name: 'Account & Profile', icon: 'ri-user-line' },
    { id: 'payment', name: 'Payment & Billing', icon: 'ri-bank-card-line' },
    { id: 'technical', name: 'Technical Support', icon: 'ri-settings-line' }
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll also receive tracking information via email and SMS once your order is shipped.'
    },
    {
      category: 'orders', 
      question: 'What are the delivery charges?',
      answer: 'Delivery charges vary by location: Kathmandu Valley - Rs. 100, Outside Valley - Rs. 150-300. Free delivery on orders above Rs. 2000 within Kathmandu Valley.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery for most items. Items must be in original condition with tags attached. Electronics have a 3-day return window.'
    },
    {
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'Go to your order history, select the item you want to return, and click "Request Return". Our team will contact you within 24 hours to arrange pickup.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash on Delivery, eSewa, Khalti, Bank Transfer, and major credit/debit cards. All online payments are processed securely.'
    },
    {
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try clearing your browser cache, checking your internet connection, or try accessing the site from a different browser. Contact us if the problem persists.'
    },
    {
      category: 'orders',
      question: 'Can I modify my order after placing it?',
      answer: 'Orders can be modified within 1 hour of placement if they haven\'t been processed. Contact our customer support immediately for assistance.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-xl mb-8 text-blue-100">Find answers to common questions or get in touch with our support team</p>
            
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="#" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-truck-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="font-semibold mb-2">Track Order</h3>
                <p className="text-gray-600 text-sm">Check the status of your recent orders</p>
              </a>
              
              <a href="#" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-arrow-go-back-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="font-semibold mb-2">Return Item</h3>
                <p className="text-gray-600 text-sm">Start a return or exchange request</p>
              </a>
              
              <a href="#" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-customer-service-2-line text-purple-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm">Chat with our support team</p>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className={`${category.icon} w-4 h-4 flex items-center justify-center mr-2 inline-block`}></i>
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-lg">
                  <summary className="p-6 cursor-pointer hover:bg-gray-50 font-semibold text-gray-900">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-search-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4"></i>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or browse different categories.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-8">Our customer support team is here to assist you</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg">
                <i className="ri-phone-line w-8 h-8 flex items-center justify-center text-blue-600 mx-auto mb-4"></i>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-4">Available 9 AM - 8 PM</p>
                <a href="tel:+97714567890" className="text-blue-600 hover:text-blue-700 font-semibold">
                  +977- 9765630494
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <i className="ri-mail-line w-8 h-8 flex items-center justify-center text-blue-600 mx-auto mb-4"></i>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Response within 24 hours</p>
                <a href="mailto:support@sabaisubhida.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                  support@sabaisubhida.com
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <i className="ri-customer-service-2-line w-8 h-8 flex items-center justify-center text-blue-600 mx-auto mb-4"></i>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Real-time assistance</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  Start Chat
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