
'use client';

import AdminGuard from '../../components/AdminGuard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

export default function AdminDashboard() {
  const salesData = [
    { name: 'Jan', revenue: 4200, orders: 145 },
    { name: 'Feb', revenue: 5800, orders: 189 },
    { name: 'Mar', revenue: 7200, orders: 234 },
    { name: 'Apr', revenue: 6100, orders: 198 },
    { name: 'May', revenue: 8900, orders: 287 },
    { name: 'Jun', revenue: 9800, orders: 312 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#8B5CF6' },
    { name: 'Clothing', value: 25, color: '#06B6D4' },
    { name: 'Home & Garden', value: 20, color: '#10B981' },
    { name: 'Books', value: 12, color: '#F59E0B' },
    { name: 'Sports', value: 8, color: '#EF4444' },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: 'ri-money-dollar-circle-line'
    },
    {
      title: 'Total Orders',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: 'ri-shopping-cart-line'
    },
    {
      title: 'Active Users',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: 'ri-user-line'
    },
    {
      title: 'Conversion Rate',
      value: '0%',
      change: '+0%',
      changeType: 'positive',
      icon: 'ri-line-chart-line'
    }
  ];

  const recentOrders: any[] = [];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminSession');
    window.location.href = '/admin/login';
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-admin-line w-4 h-4 flex items-center justify-center text-white"></i>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Control Panel</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium whitespace-nowrap">
                  <i className="ri-external-link-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
                  View Website
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <i className="ri-logout-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600 mt-1">Complete control center for your website</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/products" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-store-line w-6 h-6 flex items-center justify-center text-purple-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                <p className="text-gray-600 text-sm mt-1">Manage inventory</p>
              </div>
            </Link>

            <Link href="/admin/orders" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-shopping-cart-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                <p className="text-gray-600 text-sm mt-1">Track sales</p>
              </div>
            </Link>

            <Link href="/admin/users" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                <p className="text-gray-600 text-sm mt-1">User accounts</p>
              </div>
            </Link>

            <Link href="/admin/analytics" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-bar-chart-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="text-gray-600 text-sm mt-1">View reports</p>
              </div>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className={`${stat.icon} w-6 h-6 flex items-center justify-center text-purple-600`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link href="/admin/orders" className="text-purple-600 hover:text-purple-700 text-sm font-medium whitespace-nowrap">
                  View All Orders
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Website Management Section */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Website Management</h3>
            <p className="text-purple-100 mb-6">Control your main website content and settings from this admin panel</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/settings" className="bg-white/20 backdrop-blur rounded-lg p-4 hover:bg-white/30 transition-colors">
                <i className="ri-settings-line w-8 h-8 flex items-center justify-center mb-2"></i>
                <h4 className="font-semibold">Website Settings</h4>
                <p className="text-sm text-purple-100 mt-1">Configure site settings</p>
              </Link>

              <div className="bg-white/20 backdrop-blur rounded-lg p-4 hover:bg-white/30 transition-colors cursor-pointer">
                <i className="ri-palette-line w-8 h-8 flex items-center justify-center mb-2"></i>
                <h4 className="font-semibold">Theme Control</h4>
                <p className="text-sm text-purple-100 mt-1">Customize appearance</p>
              </div>

              <div className="bg-white/20 backdrop-blur rounded-lg p-4 hover:bg-white/30 transition-colors cursor-pointer">
                <i className="ri-file-text-line w-8 h-8 flex items-center justify-center mb-2"></i>
                <h4 className="font-semibold">Content Management</h4>
                <p className="text-sm text-purple-100 mt-1">Edit page content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
