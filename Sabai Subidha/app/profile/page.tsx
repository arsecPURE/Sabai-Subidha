'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState({
    label: '',
    fullName: '',
    phone: '',
    province: '',
    district: '',
    municipality: '',
    ward: '',
    tole: '',
    isDefault: false
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserInfo({
        name: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }

    // Load user orders
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setUserOrders(orders);

    // Load saved addresses
    const addresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
    setSavedAddresses(addresses);

    // Check URL parameters for tab
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Order Confirmed': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Pending Verification': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrackingSteps = (order: any) => {
    const steps = [
      { label: 'Order Confirmed', completed: true },
      { label: 'Processing', completed: false },
      { label: 'Shipped', completed: false },
      { label: 'Out for Delivery', completed: false },
      { label: 'Delivered', completed: false }
    ];

    switch (order.status || order.trackingStatus) {
      case 'Processing':
        steps[1].completed = true;
        break;
      case 'Shipped':
        steps[1].completed = true;
        steps[2].completed = true;
        break;
      case 'Out for Delivery':
        steps[1].completed = true;
        steps[2].completed = true;
        steps[3].completed = true;
        break;
      case 'Delivered':
        steps.forEach(step => step.completed = true);
        break;
    }

    return steps;
  };

  const calculateDeliveryDate = (orderDate: string, expectedDelivery?: string) => {
    if (expectedDelivery) {
      return new Date(expectedDelivery).toLocaleDateString();
    }
    // Fallback: add 3-5 days to order date
    const order = new Date(orderDate);
    const delivery = new Date();
    delivery.setDate(order.getDate() + 4);
    return delivery.toLocaleDateString();
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Update current user in localStorage
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const updatedUser = {
          ...user,
          fullName: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          address: userInfo.address
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Also update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        if (userIndex > -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
        }

        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAddress.fullName.trim() || !newAddress.phone.trim() || !newAddress.municipality.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const address = {
      id: Date.now(),
      ...newAddress,
      createdAt: new Date().toISOString()
    };

    const updatedAddresses = [...savedAddresses, address];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));

    // Reset form
    setNewAddress({
      label: '',
      fullName: '',
      phone: '',
      province: '',
      district: '',
      municipality: '',
      ward: '',
      tole: '',
      isDefault: false
    });

    setShowAddressModal(false);
    alert('Address added successfully!');
  };

  const handleDeleteAddress = (addressId: number) => {
    if (confirm('Are you sure you want to delete this address?')) {
      const updatedAddresses = savedAddresses.filter(addr => addr.id !== addressId);
      setSavedAddresses(updatedAddresses);
      localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account and track your orders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-user-line w-10 h-10 flex items-center justify-center text-2xl text-blue-600"></i>
                    </div>
                    <h3 className="font-semibold text-gray-900">{userInfo.name}</h3>
                    <p className="text-sm text-gray-600">{userInfo.email}</p>
                  </div>
                </div>

                <nav className="p-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-user-line w-5 h-5 flex items-center justify-center"></i>
                    <span>Profile Info</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-shopping-bag-line w-5 h-5 flex items-center justify-center"></i>
                    <span>My Orders</span>
                    {userOrders.length > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {userOrders.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-heart-line w-5 h-5 flex items-center justify-center"></i>
                    <span>Wishlist</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center"></i>
                    <span>Addresses</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History & Tracking</h2>

                    {userOrders.length === 0 ? (
                      <div className="text-center py-12">
                        <i className="ri-shopping-bag-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6">Your order history will appear here</p>
                        <a
                          href="/products"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Start Shopping
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {userOrders.map((order) => (
                          <div key={order.orderId} className="border border-gray-200 rounded-lg p-6">
                            <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
                              <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Order {order.orderId}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Placed on {new Date(order.timestamp).toLocaleDateString()} • 
                                  Expected delivery: {calculateDeliveryDate(order.timestamp, order.expectedDelivery)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || order.trackingStatus)}`}>
                                  {order.status || order.trackingStatus || 'Order Confirmed'}
                                </span>
                                <span className="font-semibold text-gray-900 text-lg">{formatPrice(order.total)}</span>
                              </div>
                            </div>

                            {/* Order Tracking */}
                            <div className="mb-6">
                              <h4 className="font-medium text-gray-900 mb-4">Order Status</h4>
                              <div className="flex items-center justify-between">
                                {getTrackingSteps(order).map((step, index) => (
                                  <div key={index} className="flex flex-col items-center flex-1">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                      {step.completed ? '✓' : index + 1}
                                    </div>
                                    <span className={`text-xs mt-2 text-center px-2 ${
                                      step.completed ? 'text-green-600 font-medium' : 'text-gray-500'
                                    }`}>
                                      {step.label}
                                    </span>
                                    {index < getTrackingSteps(order).length - 1 && (
                                      <div className={`hidden sm:block absolute h-px bg-gray-300 w-full mt-4 ${
                                        step.completed ? 'bg-green-500' : 'bg-gray-200'
                                      }`} style={{left: '50%', zIndex: -1}}></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-2 mb-4">
                              <h4 className="font-medium text-gray-900">Items ({order.items.length})</h4>
                              {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                                  <span className="text-gray-700">{item.name} x {item.quantity}</span>
                                  <span className="text-gray-900 font-medium">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>

                            {/* Delivery Address */}
                            {order.address && (
                              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                                <p className="text-sm text-gray-600">
                                  {order.address.fullName}<br />
                                  {order.address.tole}, Ward {order.address.ward}<br />
                                  {order.address.municipality}, {order.address.district}<br />
                                  {order.address.province}<br />
                                  Phone: {order.address.phone}
                                </p>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-4">
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap px-3 py-1 border border-blue-200 rounded">
                                Track Package
                              </button>
                              {(order.status === 'Delivered' || order.trackingStatus === 'Delivered') && (
                                <button className="text-green-600 hover:text-green-700 text-sm font-medium whitespace-nowrap px-3 py-1 border border-green-200 rounded">
                                  Review Products
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-700 text-sm font-medium whitespace-nowrap px-3 py-1 border border-gray-200 rounded">
                                Download Invoice
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <i className="ri-heart-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Add some products to your wishlist to see them here</p>
                    <a
                      href="/products"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Continue Shopping
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                    <button 
                      onClick={() => setShowAddressModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
                    >
                      Add New Address
                    </button>
                  </div>

                  <div className="space-y-4">
                    {savedAddresses.length === 0 ? (
                      <div className="text-center py-12">
                        <i className="ri-map-pin-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                        <p className="text-gray-600 mb-6">Add your addresses for faster checkout</p>
                        <button 
                          onClick={() => setShowAddressModal(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                        >
                          Add First Address
                        </button>
                      </div>
                    ) : (
                      savedAddresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {address.label || 'Address'}
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Default</span>
                                )}
                              </h3>
                              <p className="text-gray-600">
                                {address.fullName}<br />
                                {address.tole && `${address.tole}, `}Ward {address.ward}<br />
                                {address.municipality}, {address.district}<br />
                                {address.province}<br />
                                Phone: {address.phone}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm whitespace-nowrap">Edit</button>
                              <button 
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add Address Modal */}
          {showAddressModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Address</h3>
                    <button
                      onClick={() => setShowAddressModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                    </button>
                  </div>

                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address Label</label>
                      <input
                        type="text"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        placeholder="e.g., Home, Office"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                        <select
                          value={newAddress.province}
                          onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                        >
                          <option value="">Select Province</option>
                          <option value="Bagmati">Bagmati</option>
                          <option value="Gandaki">Gandaki</option>
                          <option value="Lumbini">Lumbini</option>
                          <option value="Karnali">Karnali</option>
                          <option value="Sudurpashchim">Sudurpashchim</option>
                          <option value="Koshi">Koshi</option>
                          <option value="Madhesh">Madhesh</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <input
                          type="text"
                          value={newAddress.district}
                          onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                          placeholder="e.g., Kathmandu"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Municipality *</label>
                      <input
                        type="text"
                        required
                        value={newAddress.municipality}
                        onChange={(e) => setNewAddress({ ...newAddress, municipality: e.target.value })}
                        placeholder="e.g., Kathmandu Metropolitan City"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ward No.</label>
                        <input
                          type="number"
                          value={newAddress.ward}
                          onChange={(e) => setNewAddress({ ...newAddress, ward: e.target.value })}
                          placeholder="e.g., 5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tole/Area</label>
                        <input
                          type="text"
                          value={newAddress.tole}
                          onChange={(e) => setNewAddress({ ...newAddress, tole: e.target.value })}
                          placeholder="e.g., Thamel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="isDefault"
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                        Set as default address
                      </label>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
                      >
                        Add Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}