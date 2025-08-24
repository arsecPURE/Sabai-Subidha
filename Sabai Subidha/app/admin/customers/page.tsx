'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');

    // Enhance customer data with order information
    const enhancedCustomers = users.map((user: any) => {
      const userOrders = orders.filter((order: any) => order.email === user.email);
      const totalSpent = userOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
      
      return {
        ...user,
        totalOrders: userOrders.length,
        totalSpent,
        lastOrderDate: userOrders.length > 0 ? 
          new Date(Math.max(...userOrders.map((o: any) => new Date(o.timestamp).getTime()))).toISOString() : 
          null,
        orders: userOrders
      };
    });

    setCustomers(enhancedCustomers);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.includes(searchQuery)
  );

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getCustomerType = (totalSpent: number, totalOrders: number) => {
    if (totalSpent > 50000 || totalOrders > 10) return { label: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent > 20000 || totalOrders > 5) return { label: 'Premium', color: 'bg-blue-100 text-blue-800' };
    if (totalOrders > 0) return { label: 'Regular', color: 'bg-green-100 text-green-800' };
    return { label: 'New', color: 'bg-gray-100 text-gray-800' };
  };

  const handleViewDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  const exportCustomers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Total Orders', 'Total Spent', 'Registration Date', 'Last Order'],
      ...filteredCustomers.map(customer => [
        customer.fullName || '',
        customer.email || '',
        customer.phone || '',
        customer.totalOrders,
        customer.totalSpent,
        new Date(customer.createdAt || '').toLocaleDateString(),
        customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="font-['Pacifico'] text-2xl text-blue-600">Sabai Subhida</div>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                <i className="ri-notification-line w-6 h-6 flex items-center justify-center"></i>
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-dashboard-line w-5 h-5 flex items-center justify-center"></i>
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-shopping-bag-line w-5 h-5 flex items-center justify-center"></i>
              <span>Orders</span>
            </Link>
            <Link href="/admin/products" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-product-hunt-line w-5 h-5 flex items-center justify-center"></i>
              <span>Products</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
              <i className="ri-user-line w-5 h-5 flex items-center justify-center"></i>
              <span>Customers</span>
            </Link>
            <Link href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-bar-chart-line w-5 h-5 flex items-center justify-center"></i>
              <span>Analytics</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-settings-line w-5 h-5 flex items-center justify-center"></i>
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Customers</h1>
                <p className="text-gray-600">Manage customer accounts and data</p>
              </div>
              <button
                onClick={exportCustomers}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                <i className="ri-download-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-user-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{customers.length}</div>
                  <div className="text-sm text-gray-600">Total Customers</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-shopping-bag-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => c.totalOrders > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Customers</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-vip-crown-line w-6 h-6 flex items-center justify-center text-purple-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => getCustomerType(c.totalSpent, c.totalOrders).label === 'VIP').length}
                  </div>
                  <div className="text-sm text-gray-600">VIP Customers</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-user-add-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => {
                      const registrationDate = new Date(c.createdAt || '');
                      const thirtyDaysAgo = new Date();
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                      return registrationDate > thirtyDaysAgo;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">New This Month</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search customers by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Orders</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Total Spent</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Type</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Joined</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {(customer.fullName || customer.email || 'U').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {customer.fullName || 'No Name'}
                            </div>
                            <div className="text-sm text-gray-600">ID: {customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-600">{customer.phone || 'No phone'}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{customer.totalOrders}</div>
                        <div className="text-sm text-gray-600">
                          {customer.lastOrderDate ? 
                            `Last: ${new Date(customer.lastOrderDate).toLocaleDateString()}` : 
                            'No orders'
                          }
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{formatPrice(customer.totalSpent)}</div>
                        <div className="text-sm text-gray-600">
                          Avg: {customer.totalOrders > 0 ? formatPrice(customer.totalSpent / customer.totalOrders) : 'Rs. 0'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCustomerType(customer.totalSpent, customer.totalOrders).color}`}>
                          {getCustomerType(customer.totalSpent, customer.totalOrders).label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'Unknown'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleViewDetails(customer)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-user-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                  <p className="text-gray-600">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Customer Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <div className="font-medium">{selectedCustomer.fullName || 'Not provided'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <div className="font-medium">{selectedCustomer.email}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <div className="font-medium">{selectedCustomer.phone || 'Not provided'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Joined:</span>
                      <div className="font-medium">
                        {selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString() : 'Unknown'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Statistics */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Order Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Orders:</span>
                      <div className="text-xl font-bold text-blue-600">{selectedCustomer.totalOrders}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Spent:</span>
                      <div className="text-xl font-bold text-green-600">{formatPrice(selectedCustomer.totalSpent)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Average Order:</span>
                      <div className="text-xl font-bold text-purple-600">
                        {selectedCustomer.totalOrders > 0 ? formatPrice(selectedCustomer.totalSpent / selectedCustomer.totalOrders) : 'Rs. 0'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Orders</h4>
                  <div className="space-y-3">
                    {selectedCustomer.orders?.length > 0 ? (
                      selectedCustomer.orders.slice(0, 5).map((order: any) => (
                        <div key={order.orderId} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">#{order.orderId}</div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600 text-sm">{formatPrice(order.total)}</span>
                              <span className="text-gray-400 text-sm">•</span>
                              <span className="text-gray-600 text-sm">{new Date(order.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {order.items?.length} items • {order.paymentMethod}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No orders found for this customer
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}