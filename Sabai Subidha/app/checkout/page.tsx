
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEsewaQR, setShowEsewaQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    municipality: '',
    ward: '',
    tole: '',
    landmark: ''
  });

  const nepalProvinces = [
    'Province 1', 'Madhesh Province', 'Bagmati Province', 'Gandaki Province',
    'Lumbini Province', 'Karnali Province', 'Sudurpashchim Province'
  ];

  const allNepalDistricts = [
    // Province 1
    'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Okhaldhunga', 
    'Panchthar', 'Sankhuwasabha', 'Solukhumbu', 'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur',

    // Madhesh Province
    'Bara', 'Dhanusha', 'Mahottari', 'Parsa', 'Rautahat', 'Saptari', 'Sarlahi', 'Siraha',

    // Bagmati Province
    'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok', 'Lalitpur', 
    'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok',

    // Gandaki Province
    'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang', 'Myagdi', 
    'Nawalpur', 'Parbat', 'Syangja', 'Tanahun',

    // Lumbini Province
    'Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Gulmi', 'Kapilvastu', 'Palpa', 
    'Parasi', 'Pyuthan', 'Rolpa', 'Rupandehi', 'Rukum East',

    // Karnali Province
    'Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot', 'Mugu', 
    'Rukum West', 'Salyan', 'Surkhet',

    // Sudurpashchim Province
    'Achham', 'Baitadi', 'Bajhang', 'Bajura', 'Dadeldhura', 'Darchula', 'Doti', 
    'Kailali', 'Kanchanpur'
  ].sort();

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
    }
  }, []);

  // Load user data for delivery address
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setDeliveryAddress({
        fullName: user.fullName || '',
        phone: user.phone || '',
        email: user.email || '',
        province: '',
        district: '',
        municipality: '',
        ward: '',
        tole: '',
        landmark: ''
      });
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const sendEmailNotifications = async (orderData: any) => {
    // Calculate expected delivery date (3-5 business days)
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 3) + 3); // 3-5 days

    // Customer email content
    const customerEmailContent = `
Dear ${orderData.customerName},

Thank you for your order with Sabai Subhida!

Order Details:
- Order ID: ${orderData.orderId}
- Total Amount: ${formatPrice(orderData.total)}
- Payment Method: ${orderData.paymentMethod}
- Order Date: ${orderDate.toLocaleDateString()}
- Expected Delivery: ${deliveryDate.toLocaleDateString()}

Items Ordered:
${orderData.items.map((item: any) => `- ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('\n')}

Delivery Address:
${orderData.address.fullName}
${orderData.address.tole}, Ward ${orderData.address.ward}
${orderData.address.municipality}, ${orderData.address.district}
${orderData.address.province}
Phone: ${orderData.address.phone}

You can track your order status in your profile section. We'll send you updates via SMS.

Thank you for choosing Sabai Subhida!

Best regards,
Sabai Subhida Team
`;

    // Admin email content for kingsshnt@gmail.com
    const adminEmailContent = `
NEW ORDER RECEIVED - Sabai Subhida

Order Information:
- Order ID: ${orderData.orderId}
- Customer: ${orderData.customerName}
- Phone: ${orderData.phone}
- Email: ${orderData.email}
- Total Amount: ${formatPrice(orderData.total)}
- Payment Method: ${orderData.paymentMethod}
- Order Time: ${new Date(orderData.timestamp).toLocaleString()}
- Expected Delivery: ${deliveryDate.toLocaleDateString()}

Items:
${orderData.items.map((item: any) => `- ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('\n')}

Delivery Address:
${orderData.address.fullName}
${orderData.address.tole}, Ward ${orderData.address.ward}
${orderData.address.municipality}, ${orderData.address.district}
${orderData.address.province}
Phone: ${orderData.address.phone}

Please process this order promptly.

Sabai Subhida System
`;

    // Store email records
    const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    emailRecords.push({
      to: orderData.email,
      subject: `Order Confirmation - ${orderData.orderId} - Sabai Subhida`,
      content: customerEmailContent,
      timestamp: new Date().toISOString(),
      status: 'simulated'
    });
    emailRecords.push({
      to: 'kingsshnt@gmail.com',
      subject: `NEW ORDER ${orderData.orderId} - Sabai Subhida`,
      content: adminEmailContent,
      timestamp: new Date().toISOString(),
      status: 'simulated'
    });
    localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));

    alert(`Order confirmed! Email notifications sent to:
- Customer: ${orderData.email}
- Admin: kingsshnt@gmail.com
Expected delivery: ${deliveryDate.toLocaleDateString()}`);
  };

  const sendNotification = (orderData: any) => {
    const customerMessage = `Order Confirmed! 
Order ID: ${orderData.orderId}
Total: ${formatPrice(orderData.total)}
Payment: ${orderData.paymentMethod}
Email confirmation sent to ${orderData.email}`;

    alert(customerMessage);

    const notifications = JSON.parse(localStorage.getItem('orderNotifications') || '[]');
    notifications.push({
      id: Date.now(),
      orderId: orderData.orderId,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      items: orderData.items,
      timestamp: new Date().toISOString(),
      type: 'new_order'
    });
    localStorage.setItem('orderNotifications', JSON.stringify(notifications));

    sendEmailNotifications(orderData);
  };

  const generateOrderId = () => {
    return 'ORD-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleEsewaPayment = () => {
    setShowEsewaQR(true);
  };

  const handleEsewaQRPayment = () => {
    setIsProcessing(true);

    // Simulate eSewa QR payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo

      if (success) {
        const orderId = generateOrderId();
        const orderData = {
          orderId,
          customerName: deliveryAddress.fullName,
          phone: deliveryAddress.phone,
          email: deliveryAddress.email,
          total,
          paymentMethod: 'eSewa QR',
          items: cartItems,
          address: deliveryAddress,
          timestamp: new Date().toISOString()
        };

        // Save order
        const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        orders.push(orderData);
        localStorage.setItem('userOrders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cart');

        // Send notifications
        sendNotification(orderData);

        setShowEsewaQR(false);

        // Redirect to success page or reset form
        setTimeout(() => {
          window.location.href = '/profile?tab=orders';
        }, 2000);
      } else {
        alert('Payment failed. Please try again or contact eSewa support.');
      }
      setIsProcessing(false);
    }, 3000);
  };

  const handleBankTransfer = () => {
    setShowPaymentModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: deliveryAddress.fullName,
      phone: deliveryAddress.phone,
      email: deliveryAddress.email,
      total,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' :
                   paymentMethod === 'esewa' ? 'eSewa Digital Payment' : 'Bank Transfer',
      items: cartItems,
      address: deliveryAddress,
      timestamp: new Date().toISOString(),
      status: 'Processing'
    };

    if (paymentMethod === 'cod') {
      // Calculate expected delivery date
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);

      // Save order with delivery date
      const orderWithDelivery = {
        ...orderData,
        expectedDelivery: deliveryDate.toISOString(),
        trackingStatus: 'Order Confirmed'
      };

      const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      orders.push(orderWithDelivery);
      localStorage.setItem('userOrders', JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem('cart');

      // Send notifications
      sendNotification(orderWithDelivery);

      // Redirect after success
      setTimeout(() => {
        window.location.href = '/profile?tab=orders';
      }, 2000);
    } else if (paymentMethod === 'esewa') {
      handleEsewaPayment();
    } else if (paymentMethod === 'bank') {
      handleBankTransfer();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <i className="ri-shopping-cart-line w-16 h-16 flex items-center justify-center text-gray-300 mx-auto mb-4 text-6xl"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to proceed with checkout</p>
              <a 
                href="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order details</p>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text"
                      name="fullName"
                      required
                      value={deliveryAddress.fullName}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, fullName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel"
                      name="phone"
                      required
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="98XXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={deliveryAddress.email}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                    <div className="relative">
                      <select
                        name="province"
                        required
                        value={deliveryAddress.province}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, province: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Select Province</option>
                        {nepalProvinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                    <div className="relative">
                      <select
                        name="district"
                        required
                        value={deliveryAddress.district}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, district: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Select District</option>
                        {allNepalDistricts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Municipality/VDC *</label>
                    <input 
                      type="text"
                      name="municipality"
                      required
                      value={deliveryAddress.municipality}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, municipality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Municipality or VDC name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ward No. *</label>
                    <input 
                      type="number"
                      name="ward"
                      required
                      min="1"
                      max="35"
                      value={deliveryAddress.ward}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, ward: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ward number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tole/Street *</label>
                    <input 
                      type="text"
                      name="tole"
                      required
                      value={deliveryAddress.tole}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, tole: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tole or street name"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                  <input 
                    type="text"
                    name="landmark"
                    value={deliveryAddress.landmark}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, landmark: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Near temple, school, etc."
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center space-x-3">
                      <i className="ri-money-dollar-circle-line w-6 h-6 flex items-center justify-center text-green-500"></i>
                      <div>
                        <span className="font-medium">Cash on Delivery (COD)</span>
                        <p className="text-sm text-gray-600">Pay when your order arrives</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio"
                      name="payment"
                      value="esewa"
                      checked={paymentMethod === 'esewa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center space-x-3">
                      <i className="ri-smartphone-line w-6 h-6 flex items-center justify-center text-purple-500"></i>
                      <div>
                        <span className="font-medium">eSewa QR Payment</span>
                        <p className="text-sm text-gray-600">Scan QR code with eSewa app</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center space-x-3">
                      <i className="ri-bank-line w-6 h-6 flex items-center justify-center text-blue-500"></i>
                      <div>
                        <span className="font-medium">Bank Transfer</span>
                        <p className="text-sm text-gray-600">Direct bank account transfer</p>
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'esewa' && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <i className="ri-qr-code-line w-5 h-5 flex items-center justify-center text-purple-600"></i>
                      <h4 className="font-medium text-purple-900">eSewa QR Payment</h4>
                    </div>
                    <p className="text-sm text-purple-800 mb-3">
                      Click "Pay with eSewa QR" to generate a QR code. Scan with your eSewa mobile app to complete payment instantly.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-purple-700">
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                      <span>Instant payment confirmation</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <i className="ri-bank-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                      <h4 className="font-medium text-blue-900">Bank Transfer Details</h4>
                    </div>
                    <p className="text-sm text-blue-800 mb-3">
                      Transfer the total amount to our bank account and upload the receipt for verification.
                    </p>
                    <div className="bg-white p-3 rounded border text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div><strong>Bank:</strong> Nepal Investment Bank</div>
                        <div><strong>A/C Name:</strong> Sabai Subhida Pvt. Ltd.</div>
                        <div><strong>A/C Number:</strong> 01234567890</div>
                        <div><strong>Branch:</strong> Thamel, Kathmandu</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold mt-6 transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'cod' && 'Place Order'}
                      {paymentMethod === 'esewa' && 'Pay with eSewa QR'}
                      {paymentMethod === 'bank' && 'Proceed to Payment'}
                    </>
                  )}
                </button>

                {paymentMethod !== 'cod' && (
                  <p className="text-xs text-gray-600 text-center mt-3">
                    <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center inline mr-1"></i>
                    Your payment is secured with industry-standard encryption
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* eSewa QR Code Modal */}
      {showEsewaQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">eSewa QR Payment</h3>
              <button 
                onClick={() => setShowEsewaQR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <img 
                  src="https://readdy.ai/api/search-image?query=eSewa%20QR%20code%20for%20payment%2C%20black%20and%20white%20QR%20code%20pattern%2C%20digital%20payment%20barcode%2C%20mobile%20payment%20scan%20code&width=200&height=200&seq=esewaQR1&orientation=squarish"
                  alt="eSewa QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Payment Amount</h4>
                  <div className="text-2xl font-bold text-purple-600">{formatPrice(total)}</div>
                </div>

                <div className="text-left space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <i className="ri-smartphone-line w-4 h-4 flex items-center justify-center text-purple-500"></i>
                    <span>Open eSewa mobile app</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-qr-scan-line w-4 h-4 flex items-center justify-center text-purple-500"></i>
                    <span>Tap on "Scan QR" or "QR Pay"</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-camera-line w-4 h-4 flex items-center justify-center text-purple-500"></i>
                    <span>Scan this QR code</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-purple-500"></i>
                    <span>Confirm payment in eSewa app</span>
                  </div>
                </div>

                <button 
                  onClick={handleEsewaQRPayment}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying Payment...
                    </>
                  ) : (
                    'I have completed the payment'
                  )}
                </button>

                <p className="text-xs text-gray-500">
                  Click above button after completing payment in eSewa app
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bank Transfer Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Transfer Details</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Amount:</strong> {formatPrice(total)}</div>
                  <div><strong>Bank:</strong> Nepal Investment Bank</div>
                  <div><strong>Account:</strong> 01234567890</div>
                  <div><strong>Account Name:</strong> Sabai Subhida Pvt. Ltd.</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Payment Receipt *
                </label>
                <input 
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">
                  Upload bank receipt or transfer screenshot
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Reference (Optional)
                </label>
                <input 
                  type="text"
                  placeholder="Enter transaction ID or reference number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const orderId = generateOrderId();
                    const orderData = {
                      orderId,
                      customerName: deliveryAddress.fullName,
                      phone: deliveryAddress.phone,
                      email: deliveryAddress.email,
                      total,
                      paymentMethod: 'Bank Transfer',
                      items: cartItems,
                      address: deliveryAddress,
                      timestamp: new Date().toISOString(),
                      status: 'Pending Verification'
                    };

                    // Save order
                    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
                    orders.push(orderData);
                    localStorage.setItem('userOrders', JSON.stringify(orders));

                    // Clear cart
                    localStorage.removeItem('cart');

                    // Send notifications
                    sendNotification(orderData);

                    setShowPaymentModal(false);

                    setTimeout(() => {
                      window.location.href = '/profile?tab=orders';
                    }, 2000);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  Submit Payment
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
