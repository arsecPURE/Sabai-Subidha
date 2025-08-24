'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Information</h1>
            <p className="text-gray-600">Everything you need to know about our shipping and delivery services</p>
          </div>

          {/* Shipping Zones */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Shipping Zones & Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-blue-600 mr-3"></i>
                  <h3 className="text-lg font-semibold text-blue-900">Zone 1: Kathmandu Valley</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-blue-800">Areas: Kathmandu, Lalitpur, Bhaktapur</p>
                  <p className="text-sm font-medium text-blue-900">Delivery Charge: Rs. 100</p>
                  <p className="text-sm font-medium text-blue-900">Delivery Time: 1-2 days</p>
                  <p className="text-xs text-blue-700">*Free delivery on orders above Rs. 2,000</p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-green-600 mr-3"></i>
                  <h3 className="text-lg font-semibold text-green-900">Zone 2: Major Cities</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-green-800">Areas: Pokhara, Chitwan, Butwal, Dharan</p>
                  <p className="text-sm font-medium text-green-900">Delivery Charge: Rs. 150</p>
                  <p className="text-sm font-medium text-green-900">Delivery Time: 2-4 days</p>
                  <p className="text-xs text-green-700">*Free delivery on orders above Rs. 5,000</p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-orange-600 mr-3"></i>
                  <h3 className="text-lg font-semibold text-orange-900">Zone 3: Regional Centers</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-orange-800">Areas: Biratnagar, Janakpur, Nepalgunj, Mahendranagar</p>
                  <p className="text-sm font-medium text-orange-900">Delivery Charge: Rs. 200</p>
                  <p className="text-sm font-medium text-orange-900">Delivery Time: 3-5 days</p>
                  <p className="text-xs text-orange-700">*Free delivery on orders above Rs. 7,000</p>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-purple-600 mr-3"></i>
                  <h3 className="text-lg font-semibold text-purple-900">Zone 4: Remote Areas</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-purple-800">Areas: Mountain regions, remote districts</p>
                  <p className="text-sm font-medium text-purple-900">Delivery Charge: Rs. 250-400</p>
                  <p className="text-sm font-medium text-purple-900">Delivery Time: 5-10 days</p>
                  <p className="text-xs text-purple-700">*Charges vary by accessibility</p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">How Shipping Works</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Order Processing</h3>
                  <p className="text-gray-600">Orders are processed within 24 hours during business days. You'll receive an order confirmation email immediately.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Packaging & Dispatch</h3>
                  <p className="text-gray-600">Items are carefully packaged and dispatched from our warehouse. You'll receive tracking information via SMS and email.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">In Transit</h3>
                  <p className="text-gray-600">Track your package in real-time. Our delivery partners will contact you before delivery.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                  <p className="text-gray-600">Package delivered to your doorstep. Please verify items before accepting delivery.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Policies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Shipping Policies</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Order Cutoff Times</h3>
                <p className="text-gray-600">Orders placed before 2:00 PM are processed the same day. Orders after 2:00 PM are processed the next business day.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Delivery Attempts</h3>
                <p className="text-gray-600">We make up to 3 delivery attempts. If unsuccessful, packages are returned to our warehouse and may incur additional charges for redelivery.</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Package Security</h3>
                <p className="text-gray-600">All packages are insured against loss or damage during transit. Report any issues within 24 hours of delivery.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">Special Items</h3>
                <p className="text-gray-600">Fragile, electronics, and high-value items receive extra protective packaging and may require signature upon delivery.</p>
              </div>
            </div>
          </section>

          {/* Delivery Partners */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Delivery Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-truck-line w-8 h-8 flex items-center justify-center text-blue-600"></i>
                </div>
                <h3 className="font-semibold mb-2">Sabai Express</h3>
                <p className="text-gray-600 text-sm">Our in-house delivery service for Kathmandu Valley with same-day delivery options.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-global-line w-8 h-8 flex items-center justify-center text-green-600"></i>
                </div>
                <h3 className="font-semibold mb-2">Nepal Courier Service</h3>
                <p className="text-gray-600 text-sm">Nationwide coverage with reliable tracking and customer support.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-map-2-line w-8 h-8 flex items-center justify-center text-orange-600"></i>
                </div>
                <h3 className="font-semibold mb-2">Local Partners</h3>
                <p className="text-gray-600 text-sm">Regional delivery partners for remote areas ensuring nationwide reach.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Shipping FAQ</h2>
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                  Can I change my delivery address after placing an order?
                </summary>
                <div className="px-4 pb-4 text-gray-700">
                  Address changes are possible within 1 hour of order placement if the order hasn't been processed. Contact customer support immediately.
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                  Do you deliver on weekends and holidays?
                </summary>
                <div className="px-4 pb-4 text-gray-700">
                  Yes, we deliver 7 days a week including most holidays. Delivery times may be slightly longer during peak periods and major festivals.
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                  What if I'm not available during delivery?
                </summary>
                <div className="px-4 pb-4 text-gray-700">
                  Our delivery partner will contact you before delivery. If you're unavailable, they'll attempt delivery the next day or you can reschedule through our customer support.
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg">
                <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold">
                  Is package tracking available?
                </summary>
                <div className="px-4 pb-4 text-gray-700">
                  Yes, all shipments include tracking. You'll receive tracking information via SMS and email once your order is dispatched.
                </div>
              </details>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}