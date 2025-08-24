'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="font-['Pacifico'] text-2xl text-blue-400 mb-4">Sabai Subhida</div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Nepal's premier e-commerce platform bringing you quality products from electronics to everyday essentials, delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <i className="ri-instagram-line w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <i className="ri-whatsapp-line w-5 h-5 flex items-center justify-center"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</Link></li>
              <li><Link href="/deals" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Deals</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/categories/1" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Electronics</Link></li>
              <li><Link href="/categories/2" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Fashion</Link></li>
              <li><Link href="/categories/3" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home & Kitchen</Link></li>
              <li><Link href="/categories/4" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Beauty</Link></li>
              <li><Link href="/categories/5" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Books</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Help Center</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Returns Policy</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Shipping Info</Link></li>
              <li><Link href="/profile?tab=orders" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Track Order</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Contact Info</h4>
              <p className="text-gray-400 text-sm">+977- 9765630494</p>
              <p className="text-gray-400 text-sm">support@sabaisubhida.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Sabai Subhida. All rights reserved. Proudly serving Nepal.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}