'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Sabai Subhida',
    siteDescription: 'Your trusted e-commerce platform',
    contactEmail: 'kingsshnt@gmail.com',
    supportPhone: '+977-9800000000',
    address: 'Kathmandu, Nepal',
    currency: 'NPR',
    taxRate: '13',
    shippingFee: '150',
    freeShippingThreshold: '5000',
    orderConfirmationEmail: true,
    stockAlerts: true,
    lowStockThreshold: '10'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    inventoryAlerts: true,
    customerMessages: true
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }

    const savedNotifications = localStorage.getItem('adminNotifications');
    if (savedNotifications) {
      setNotifications({ ...notifications, ...JSON.parse(savedNotifications) });
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    alert('Settings saved successfully!');
  };

  const handleExportData = (dataType: string) => {
    let data: any[] = [];
    let filename = '';
    
    switch (dataType) {
      case 'orders':
        data = JSON.parse(localStorage.getItem('userOrders') || '[]');
        filename = 'orders.json';
        break;
      case 'customers':
        data = JSON.parse(localStorage.getItem('users') || '[]');
        filename = 'customers.json';
        break;
      case 'notifications':
        data = JSON.parse(localStorage.getItem('orderNotifications') || '[]');
        filename = 'notifications.json';
        break;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClearData = (dataType: string) => {
    const confirmMessage = `Are you sure you want to clear all ${dataType}? This action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
      switch (dataType) {
        case 'orders':
          localStorage.removeItem('userOrders');
          break;
        case 'customers':
          localStorage.removeItem('users');
          break;
        case 'notifications':
          localStorage.removeItem('orderNotifications');
          break;
        case 'all':
          localStorage.clear();
          break;
      }
      
      alert(`${dataType} data cleared successfully!`);
    }
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
            <Link href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              <i className="ri-bar-chart-line w-5 h-5 flex items-center justify-center"></i>
              <span>Analytics</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
              <i className="ri-settings-line w-5 h-5 flex items-center justify-center"></i>
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Configure your store and system preferences</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-8">
            {/* Store Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Store Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  <input
                    type="tel"
                    value={settings.supportPhone}
                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    <option value="NPR">Nepali Rupee (NPR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Order & Payment Settings */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order & Payment Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Fee (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={settings.shippingFee}
                    onChange={(e) => setSettings({ ...settings, shippingFee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    id="orderConfirmation"
                    type="checkbox"
                    checked={settings.orderConfirmationEmail}
                    onChange={(e) => setSettings({ ...settings, orderConfirmationEmail: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="orderConfirmation" className="ml-2 block text-sm text-gray-900">
                    Send order confirmation emails
                  </label>
                </div>
              </div>
            </div>

            {/* Inventory Settings */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Threshold</label>
                  <input
                    type="number"
                    min="1"
                    value={settings.lowStockThreshold}
                    onChange={(e) => setSettings({ ...settings, lowStockThreshold: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Alert when product stock falls below this number</p>
                </div>

                <div className="flex items-center pt-7">
                  <input
                    id="stockAlerts"
                    type="checkbox"
                    checked={settings.stockAlerts}
                    onChange={(e) => setSettings({ ...settings, stockAlerts: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="stockAlerts" className="ml-2 block text-sm text-gray-900">
                    Enable low stock alerts
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="emailNotifications"
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotifications" className="ml-3 text-sm text-gray-900">
                    Email notifications for new orders
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="smsNotifications"
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="smsNotifications" className="ml-3 text-sm text-gray-900">
                    SMS notifications for urgent orders
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="inventoryAlerts"
                    type="checkbox"
                    checked={notifications.inventoryAlerts}
                    onChange={(e) => setNotifications({ ...notifications, inventoryAlerts: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="inventoryAlerts" className="ml-3 text-sm text-gray-900">
                    Low stock inventory alerts
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="customerMessages"
                    type="checkbox"
                    checked={notifications.customerMessages}
                    onChange={(e) => setNotifications({ ...notifications, customerMessages: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="customerMessages" className="ml-3 text-sm text-gray-900">
                    Customer inquiry notifications
                  </label>
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Export Data</h3>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleExportData('orders')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="ri-download-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Export Orders
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExportData('customers')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="ri-download-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Export Customers
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExportData('notifications')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="ri-download-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Export Notifications
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Clear Data</h3>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleClearData('orders')}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Clear Orders
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClearData('customers')}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Clear Customers
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClearData('all')}
                      className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                      Clear All Data
                    </button>
                  </div>
                  <p className="text-xs text-red-600 mt-2">⚠️ These actions cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end space-x-4">
              {saved && (
                <div className="flex items-center text-green-600">
                  <i className="ri-check-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  Settings saved!
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}