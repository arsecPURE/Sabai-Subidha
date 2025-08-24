'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    topProducts: [],
    salesByCategory: [],
    revenueByMonth: [],
    ordersByStatus: []
  });

  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = () => {
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Filter orders based on time range
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeRange) {
      case '7d':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        filterDate.setDate(now.getDate() - 90);
        break;
      default:
        filterDate.setFullYear(now.getFullYear() - 1);
    }

    const filteredOrders = orders.filter((order: any) => 
      new Date(order.timestamp) >= filterDate
    );

    // Calculate basic metrics
    const totalRevenue = filteredOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    const totalOrders = filteredOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Simple conversion rate calculation
    const totalSiteVisitors = users.length * 10; // Approximation
    const conversionRate = totalSiteVisitors > 0 ? (totalOrders / totalSiteVisitors) * 100 : 0;

    // Top products analysis
    const productSales: { [key: string]: { name: string, quantity: number, revenue: number } } = {};
    filteredOrders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        if (!productSales[item.name]) {
          productSales[item.name] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productSales[item.name].quantity += item.quantity;
        productSales[item.name].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Sales by category
    const categorySales: { [key: string]: number } = {};
    filteredOrders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const category = item.category || 'Uncategorized';
        categorySales[category] = (categorySales[category] || 0) + (item.price * item.quantity);
      });
    });

    const salesByCategory = Object.entries(categorySales)
      .map(([category, revenue]) => ({ category, revenue }))
      .sort((a, b) => b.revenue - a.revenue);

    // Revenue by month
    const monthlyRevenue: { [key: string]: number } = {};
    filteredOrders.forEach((order: any) => {
      const month = new Date(order.timestamp).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total;
    });

    const revenueByMonth = Object.entries(monthlyRevenue)
      .map(([month, revenue]) => ({ month, revenue }));

    // Orders by status
    const statusCount: { [key: string]: number } = {};
    filteredOrders.forEach((order: any) => {
      const status = order.status || order.trackingStatus || 'Order Confirmed';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    const ordersByStatus = Object.entries(statusCount)
      .map(([status, count]) => ({ status, count }));

    setAnalyticsData({
      totalRevenue,
      totalOrders,
      averageOrderValue,
      conversionRate,
      topProducts,
      salesByCategory,
      revenueByMonth,
      ordersByStatus
    });
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
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
            <Link href="/admin/customers" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-user-line w-5 h-5 flex items-center justify-center"></i>
              <span>Customers</span>
            </Link>
            <Link href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
                <p className="text-gray-600">Track your store performance and insights</p>
              </div>
              <div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-money-dollar-circle-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{formatPrice(analyticsData.totalRevenue)}</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-shopping-bag-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{analyticsData.totalOrders}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-calculator-line w-6 h-6 flex items-center justify-center text-purple-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{formatPrice(analyticsData.averageOrderValue)}</div>
                  <div className="text-sm text-gray-600">Average Order Value</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-percent-line w-6 h-6 flex items-center justify-center text-orange-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{formatPercentage(analyticsData.conversionRate)}</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Top Products by Revenue</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analyticsData.topProducts.length > 0 ? (
                    analyticsData.topProducts.map((product: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.quantity} sold</div>
                          </div>
                        </div>
                        <div className="font-semibold text-gray-900">{formatPrice(product.revenue)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">No sales data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Sales by Category</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analyticsData.salesByCategory.length > 0 ? (
                    analyticsData.salesByCategory.map((category: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                          <span className="font-medium text-gray-900">{category.category}</span>
                        </div>
                        <div className="font-semibold text-gray-900">{formatPrice(category.revenue)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">No category data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analyticsData.revenueByMonth.length > 0 ? (
                    analyticsData.revenueByMonth.map((month: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{month.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{
                                width: `${Math.min((month.revenue / Math.max(...analyticsData.revenueByMonth.map((m: any) => m.revenue))) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                          <span className="font-medium text-gray-900 w-20 text-right">{formatPrice(month.revenue)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">No monthly data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Orders by Status */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Orders by Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analyticsData.ordersByStatus.length > 0 ? (
                    analyticsData.ordersByStatus.map((status: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{status.status}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{
                                width: `${Math.min((status.count / Math.max(...analyticsData.ordersByStatus.map((s: any) => s.count))) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                          <span className="font-medium text-gray-900 w-8 text-right">{status.count}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">No order status data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}