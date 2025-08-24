'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ReturnsPage() {
  const [selectedTab, setSelectedTab] = useState('policy');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
            <p className="text-gray-600">Easy returns and hassle-free refunds for your peace of mind</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setSelectedTab('policy')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                selectedTab === 'policy' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Return Policy
            </button>
            <button
              onClick={() => setSelectedTab('process')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                selectedTab === 'process' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              How to Return
            </button>
            <button
              onClick={() => setSelectedTab('refunds')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                selectedTab === 'refunds' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Refund Policy
            </button>
          </div>

          {/* Return Policy Tab */}
          {selectedTab === 'policy' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-6">Return Policy Overview</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line w-6 h-6 flex items-center justify-center text-blue-600 mt-0.5"></i>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">30-Day Return Window</h3>
                      <p className="text-blue-800">Most items can be returned within 30 days of delivery for a full refund, provided they meet our return conditions.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <i className="ri-checkbox-circle-line w-5 h-5 flex items-center justify-center mr-2"></i>
                      Eligible for Return
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mt-0.5"></i>
                        <span>Unopened items in original packaging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mt-0.5"></i>
                        <span>Items with all original accessories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mt-0.5"></i>
                        <span>Clothing with original tags attached</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mt-0.5"></i>
                        <span>Electronics in working condition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-500 mt-0.5"></i>
                        <span>Books in like-new condition</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                      <i className="ri-close-circle-line w-5 h-5 flex items-center justify-center mr-2"></i>
                      Not Eligible for Return
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center text-red-500 mt-0.5"></i>
                        <span>Personal care and hygiene products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center text-red-500 mt-0.5"></i>
                        <span>Perishable food items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center text-red-500 mt-0.5"></i>
                        <span>Customized or personalized items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center text-red-500 mt-0.5"></i>
                        <span>Items damaged by misuse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-close-line w-4 h-4 flex items-center justify-center text-red-500 mt-0.5"></i>
                        <span>Software and digital products</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6">Return Timeframes by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">30 Days</h4>
                    <p className="text-green-800 text-sm">Clothing, Books, Home & Kitchen, Beauty Products</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">15 Days</h4>
                    <p className="text-blue-800 text-sm">Electronics, Mobile Phones, Laptops, Cameras</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">7 Days</h4>
                    <p className="text-orange-800 text-sm">Perishables, Personal Care Items (if unopened)</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* How to Return Tab */}
          {selectedTab === 'process' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-6">How to Return an Item</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Initiate Return Request</h3>
                      <p className="text-gray-700 mb-3">Log into your account and go to "My Orders". Find the item you want to return and click "Request Return".</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                        Go to My Orders
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Select Return Reason</h3>
                      <p className="text-gray-700 mb-3">Choose the reason for return from the available options and provide additional details if necessary.</p>
                      <div className="text-sm text-gray-600">
                        Common reasons: Damaged item, Wrong size, Changed mind, Quality issues
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Schedule Pickup</h3>
                      <p className="text-gray-700 mb-3">Choose a convenient time slot for our team to collect the item from your address.</p>
                      <div className="text-sm text-gray-600">
                        Pickup available: Mon-Sat, 10 AM - 6 PM
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Package & Handover</h3>
                      <p className="text-gray-700 mb-3">Pack the item securely with all original accessories and hand it over to our pickup agent.</p>
                      <div className="text-sm text-gray-600">
                        Keep original packaging when possible for faster processing
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6">Return Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="ri-truck-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                      <h3 className="font-semibold">Free Pickup Service</h3>
                    </div>
                    <p className="text-gray-700 mb-3">Schedule a free pickup from your address. Available in major cities across Nepal.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• No additional charges</li>
                      <li>• Convenient time slots</li>
                      <li>• SMS and email updates</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="ri-store-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                      <h3 className="font-semibold">Drop-off Points</h3>
                    </div>
                    <p className="text-gray-700 mb-3">Drop off your return at one of our partner locations for immediate processing.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Immediate receipt</li>
                      <li>• Extended hours</li>
                      <li>• Multiple locations</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Refund Policy Tab */}
          {selectedTab === 'refunds' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-6">Refund Process & Timeline</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <i className="ri-money-dollar-circle-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                    <h3 className="font-semibold text-green-900">Refund Timeline</h3>
                  </div>
                  <p className="text-green-800">Refunds are processed within 5-7 business days after we receive and inspect your returned item.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Refund Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <i className="ri-bank-card-line w-5 h-5 flex items-center justify-center text-blue-600 mt-1"></i>
                        <div>
                          <h4 className="font-medium">Original Payment Method</h4>
                          <p className="text-sm text-gray-600">For card payments, refund to the same card (3-5 days)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <i className="ri-smartphone-line w-5 h-5 flex items-center justify-center text-green-600 mt-1"></i>
                        <div>
                          <h4 className="font-medium">Digital Wallet</h4>
                          <p className="text-sm text-gray-600">eSewa, Khalti (Instant refund)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <i className="ri-building-2-line w-5 h-5 flex items-center justify-center text-purple-600 mt-1"></i>
                        <div>
                          <h4 className="font-medium">Bank Transfer</h4>
                          <p className="text-sm text-gray-600">Direct to your bank account (2-3 days)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <i className="ri-gift-line w-5 h-5 flex items-center justify-center text-orange-600 mt-1"></i>
                        <div>
                          <h4 className="font-medium">Store Credit</h4>
                          <p className="text-sm text-gray-600">Instant credit to your account</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Refund Processing Steps</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-semibold">1</div>
                        <span className="text-gray-700">Item received at our warehouse</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-semibold">2</div>
                        <span className="text-gray-700">Quality inspection (1-2 days)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-semibold">3</div>
                        <span className="text-gray-700">Refund approval and processing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-semibold">4</div>
                        <span className="text-gray-700">Refund credited to your account</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6">Special Refund Cases</h2>
                <div className="space-y-4">
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                      What if I receive a damaged or defective item?
                    </summary>
                    <div className="px-4 pb-4 text-gray-700">
                      For damaged or defective items, we offer immediate replacement or full refund including shipping charges. Contact us within 48 hours with photos of the damage.
                    </div>
                  </details>
                  
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                      Can I get a partial refund?
                    </summary>
                    <div className="px-4 pb-4 text-gray-700">
                      Partial refunds are considered for items with minor defects that don't warrant a full return. Each case is evaluated individually.
                    </div>
                  </details>
                  
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                      What about return shipping costs?
                    </summary>
                    <div className="px-4 pb-4 text-gray-700">
                      Return shipping is free for most returns. Customers are responsible for return shipping only if returning due to change of mind after 7 days.
                    </div>
                  </details>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}