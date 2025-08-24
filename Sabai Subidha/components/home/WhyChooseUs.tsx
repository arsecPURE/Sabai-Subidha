
'use client';

export default function WhyChooseUs() {
  const features = [
    {
      icon: 'ri-truck-line',
      title: 'Free Delivery',
      description: 'Free delivery on orders above Rs. 2,000 across Nepal'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure Payment',
      description: 'Multiple secure payment options including COD, eSewa, and bank transfer'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you anytime'
    },
    {
      icon: 'ri-refresh-line',
      title: 'Easy Returns',
      description: '7-day easy return policy for your peace of mind'
    },
    {
      icon: 'ri-award-line',
      title: 'Quality Products',
      description: 'Authentic products from trusted brands and sellers'
    },
    {
      icon: 'ri-time-line',
      title: 'Fast Shipping',
      description: 'Quick delivery within 2-3 hours in Chitwan, Nepal'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Sabai Subhida?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best online shopping experience in Nepal with quality products and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
