'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');

  const orderStatuses = [
    'Order Confirmed',
    'Processing', 
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Pending Verification'
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, searchQuery]);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(savedOrders);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => 
        (order.status || order.trackingStatus || 'Order Confirmed').toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(order => 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery)
      );
    }

    setFilteredOrders(filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Order Confirmed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending Verification': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusUpdate = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status || order.trackingStatus || 'Order Confirmed');
    setUpdateNote('');
    setShowUpdateModal(true);
  };

  const updateOrderStatus = () => {
    if (!selectedOrder || !newStatus) return;

    const updatedOrders = orders.map(order => {
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
              note: updateNote,
              timestamp: new Date().toISOString(),
              updatedBy: 'Admin'
            }
          ]
        };

        // Calculate delivery date for delivered orders
        if (newStatus === 'Delivered' && !order.deliveredAt) {
          updatedOrder.deliveredAt = new Date().toISOString();
        }

        return updatedOrder;
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));

    // Send notification to customer
    sendStatusUpdateNotification(selectedOrder, newStatus, updateNote);

    setShowUpdateModal(false);
    setSelectedOrder(null);
    alert(`Order ${selectedOrder.orderId} status updated to: ${newStatus}`);
  };

  const sendStatusUpdateNotification = (order: any, status: string, note: string) => {
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
      type: 'status_update'
    });
    localStorage.setItem('orderNotifications', JSON.stringify(notifications));

    // Simulate email notification
    const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    emailRecords.push({
      to: order.email,
      subject: `Order Update: ${order.orderId} - ${status}`,
      content: `Dear ${order.customerName},

Your order ${order.orderId} status has been updated to: ${status}

${note ? `Update Note: ${note}` : ''}

You can track your order in your profile section.

Thank you for choosing Sabai Subhida!

Best regards,
Sabai Subhida Team`,
      timestamp: new Date().toISOString(),
      status: 'simulated'
    });
    localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));
  };

  const getStatusCounts = () => {
    const counts: { [key: string]: number } = {};
    orders.forEach(order => {
      const status = order.status || order.trackingStatus || 'Order Confirmed';
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Manage and update order statuses</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            {orderStatuses.map(status => (
              <div key={status} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{statusCounts[status] || 0}</div>
                <div className="text-sm text-gray-600">{status}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="all">All Orders</option>
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
                <input
                  type="text"
                  placeholder="Order ID, Customer name, Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <i className="ri-shopping-bag-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more orders</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.orderId} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Order {order.orderId}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status || order.trackingStatus || 'Order Confirmed')}`}>
                          {order.status || order.trackingStatus || 'Order Confirmed'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><strong>Customer:</strong> {order.customerName}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                        </div>
                        <div>
                          <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                          <p><strong>Total Amount:</strong> <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 mt-4 lg:mt-0">
                      <button
                        onClick={() => handleStatusUpdate(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center text-sm py-2 px-3 bg-gray-50 rounded">
                          <span className="text-gray-700">{item.name} x {item.quantity}</span>
                          <span className="text-gray-900 font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.address && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <p>{order.address.fullName}</p>
                        <p>{order.address.tole}, Ward {order.address.ward}</p>
                        <p>{order.address.municipality}, {order.address.district}</p>
                        <p>{order.address.province}</p>
                        <p>Phone: {order.address.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Update History */}
                  {order.updateHistory && order.updateHistory.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Update History</h4>
                      <div className="space-y-2">
                        {order.updateHistory.slice(-3).reverse().map((update: any, index: number) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-medium">Status: {update.status}</span>
                                {update.note && <p className="text-gray-500 mt-1">{update.note}</p>}
                              </div>
                              <span className="text-xs text-gray-400">
                                {new Date(update.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
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
              <h3 className="text-lg font-semibold text-gray-900">Update Order Status</h3>
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
                  <strong>Current Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedOrder.status || selectedOrder.trackingStatus || 'Order Confirmed')}`}>
                    {selectedOrder.status || selectedOrder.trackingStatus || 'Order Confirmed'}
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
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Note (Optional)</label>
                <textarea
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  placeholder="Add any notes about this status update..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  maxLength={500}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{updateNote.length}/500 characters</p>
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