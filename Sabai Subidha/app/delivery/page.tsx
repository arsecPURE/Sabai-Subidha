'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DeliveryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const deliveryStatuses = [
    'Shipped',
    'Out for Delivery', 
    'Delivered',
    'Failed Delivery',
    'Returned to Warehouse'
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery]);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    // Filter orders that are relevant for delivery (shipped or out for delivery)
    const deliveryOrders = savedOrders.filter((order: any) => {
      const status = order.status || order.trackingStatus || 'Order Confirmed';
      return ['Processing', 'Shipped', 'Out for Delivery'].includes(status);
    });
    setOrders(deliveryOrders);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (searchQuery.trim()) {
      filtered = filtered.filter(order => 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery) ||
        order.address?.municipality?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Failed Delivery': return 'bg-red-100 text-red-800 border-red-200';
      case 'Returned to Warehouse': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusUpdate = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status || order.trackingStatus || 'Shipped');
    setDeliveryNote('');
    setShowUpdateModal(true);
  };

  const updateOrderStatus = () => {
    if (!selectedOrder || !newStatus) return;

    // Update order in localStorage
    const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const updatedOrders = allOrders.map((order: any) => {
      if (order.orderId === selectedOrder.orderId) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          trackingStatus: newStatus,
          lastUpdated: new Date().toISOString(),
          updateHistory: [
            ...(order.updateHistory || []),
            {
              status: newStatus,
              note: deliveryNote,
              timestamp: new Date().toISOString(),
              updatedBy: 'Delivery Partner'
            }
          ]
        };

        // Add delivery timestamp for delivered orders
        if (newStatus === 'Delivered' && !order.deliveredAt) {
          updatedOrder.deliveredAt = new Date().toISOString();
        }

        return updatedOrder;
      }
      return order;
    });

    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));

    // Send notification
    sendDeliveryUpdateNotification(selectedOrder, newStatus, deliveryNote);

    // Refresh orders list
    loadOrders();

    setShowUpdateModal(false);
    setSelectedOrder(null);
    alert(`Order ${selectedOrder.orderId} status updated to: ${newStatus}`);
  };

  const sendDeliveryUpdateNotification = (order: any, status: string, note: string) => {
    const notifications = JSON.parse(localStorage.getItem('orderNotifications') || '[]');
    notifications.push({
      id: Date.now(),
      orderId: order.orderId,
      customerName: order.customerName,
      phone: order.phone,
      email: order.email,
      status: status,
      note: note,
      timestamp: new Date().toISOString(),
      type: 'delivery_update'
    });
    localStorage.setItem('orderNotifications', JSON.stringify(notifications));

    // Simulate customer SMS/email notification
    const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    let message = '';
    
    switch (status) {
      case 'Out for Delivery':
        message = `Dear ${order.customerName}, your order ${order.orderId} is out for delivery and will arrive shortly. Please be available at your delivery address.`;
        break;
      case 'Delivered':
        message = `Dear ${order.customerName}, your order ${order.orderId} has been successfully delivered. Thank you for choosing Sabai Subhida!`;
        break;
      case 'Failed Delivery':
        message = `Dear ${order.customerName}, we were unable to deliver your order ${order.orderId}. ${note || 'We will attempt delivery again soon.'}`;
        break;
      default:
        message = `Dear ${order.customerName}, your order ${order.orderId} status has been updated to: ${status}`;
    }

    emailRecords.push({
      to: order.email,
      subject: `Delivery Update: ${order.orderId} - ${status}`,
      content: message + `

${note ? `Delivery Note: ${note}` : ''}

Track your order in your profile section.

Sabai Subhida Team`,
      timestamp: new Date().toISOString(),
      status: 'simulated'
    });
    localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));
  };

  const getDeliveryPriority = (order: any) => {
    const orderDate = new Date(order.timestamp);
    const daysSinceOrder = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceOrder >= 3) return 'High';
    if (daysSinceOrder >= 1) return 'Medium';
    return 'Low';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Dashboard</h1>
            <p className="text-gray-600">Manage deliveries and update order statuses</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-truck-line w-6 h-6 flex items-center justify-center text-blue-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                  <div className="text-sm text-gray-600">Active Deliveries</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-time-line w-6 h-6 flex items-center justify-center text-orange-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => (o.status || o.trackingStatus) === 'Out for Delivery').length}
                  </div>
                  <div className="text-sm text-gray-600">Out for Delivery</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-alert-line w-6 h-6 flex items-center justify-center text-yellow-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {orders.filter(o => getDeliveryPriority(o) === 'High').length}
                  </div>
                  <div className="text-sm text-gray-600">High Priority</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {[...new Set(orders.map(o => o.address?.municipality))].filter(Boolean).length}
                  </div>
                  <div className="text-sm text-gray-600">Delivery Areas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, Phone, or Area..."
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
              <button
                onClick={loadOrders}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                <i className="ri-refresh-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                Refresh
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <i className="ri-truck-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active deliveries</h3>
                <p className="text-gray-600">All orders are either not ready for delivery or already completed</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.orderId} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">#{order.orderId}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status || order.trackingStatus || 'Processing')}`}>
                          {order.status || order.trackingStatus || 'Processing'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(getDeliveryPriority(order))}`}>
                          {getDeliveryPriority(order)} Priority
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><i className="ri-user-line w-4 h-4 flex items-center justify-center inline mr-2"></i>{order.customerName}</p>
                            <p><i className="ri-phone-line w-4 h-4 flex items-center justify-center inline mr-2"></i>{order.phone}</p>
                            <p><i className="ri-money-dollar-circle-line w-4 h-4 flex items-center justify-center inline mr-2"></i>{formatPrice(order.total)} ({order.paymentMethod})</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                          <div className="text-sm text-gray-600">
                            <p><i className="ri-map-pin-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                              {order.address?.tole}, Ward {order.address?.ward}<br/>
                              {order.address?.municipality}, {order.address?.district}<br/>
                              {order.address?.province}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4 lg:mt-0 lg:ml-6">
                      <button
                        onClick={() => handleStatusUpdate(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        Update Status
                      </button>
                      <a
                        href={`tel:${order.phone}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors whitespace-nowrap"
                      >
                        <i className="ri-phone-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
                        Call Customer
                      </a>
                    </div>
                  </div>

                  {/* Order Items Summary */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                    <div className="text-sm text-gray-600">
                      {order.items.slice(0, 3).map((item: any, index: number) => (
                        <span key={index}>
                          {item.name} x{item.quantity}
                          {index < Math.min(order.items.length, 3) - 1 && ', '}
                        </span>
                      ))}
                      {order.items.length > 3 && ` +${order.items.length - 3} more`}
                    </div>
                  </div>

                  {/* Latest Update */}
                  {order.updateHistory && order.updateHistory.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Latest Update</h4>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {order.updateHistory[order.updateHistory.length - 1].note || 'Status updated'}
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(order.updateHistory[order.updateHistory.length - 1].timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Update Status Modal */}
      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Update Delivery Status</h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Order:</strong> {selectedOrder.orderId}<br/>
                  <strong>Customer:</strong> {selectedOrder.customerName}<br/>
                  <strong>Current Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedOrder.status || selectedOrder.trackingStatus || 'Processing')}`}>
                    {selectedOrder.status || selectedOrder.trackingStatus || 'Processing'}
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  required
                >
                  {deliveryStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Note</label>
                <textarea
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Add delivery notes, customer feedback, or any issues..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  maxLength={500}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{deliveryNote.length}/500 characters</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={updateOrderStatus}
                  disabled={!newStatus}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}