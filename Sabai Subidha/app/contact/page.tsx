
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert(
        'Thank you for your message! We will get back to you within 24 hours.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: 'ri-phone-line',
      title: 'Phone',
      details: ['+977- 9765630494', '+977-9801234567'],
      description: 'Call us Mon-Sat, 9 AM - 6 PM'
    },
    {
      icon: 'ri-mail-line',
      title: 'Email',
      details: ['support@sabaisubhida.com', 'orders@sabaisubhida.com'],
      description: 'We reply within 2 hours'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Address',
      details: ['Putalisadak, Kathmandu 44600', 'Nepal'],
      description: 'Visit our office'
    },
    {
      icon: 'ri-time-line',
      title: 'Business Hours',
      details: ['Monday - Saturday: 9 AM - 6 PM', 'Sunday: 10 AM - 4 PM'],
      description: 'Nepal Standard Time (NPT)'
    }
  ];

  const faqs = [
    {
      question: 'How long does delivery take?',
      answer:
        'Delivery within Kathmandu Valley takes 1-2 days, while other districts take 3-7 days depending on location.'
    },
    {
      question: 'Do you accept returns?',
      answer:
        'Yes, we accept returns within 7 days of delivery for unopened items in original packaging.'
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept Cash on Delivery, eSewa, Bank Transfer, and major credit/debit cards.'
    },
    {
      question: 'Is there a minimum order amount?',
      answer:
        'No minimum order amount. However, free delivery is available for orders above Rs. 2,000.'
    },
    {
      question: 'Can I track my order?',
      answer:
        'Yes, you will receive SMS updates and can track your order status in your account.'
    }
  ];

  const handleSocialClick = (platform: string) => {
    let url = '';
    let message = '';

    switch (platform) {
      case 'twitter':
        url = 'https://twitter.com/sabaisubhida';
        message = 'Opening Twitter page...';
        break;
      case 'youtube':
        url = 'https://youtube.com/@sabaisubhida';
        message = 'Opening YouTube channel...';
        break;
      case 'whatsapp':
        const whatsappNumber = '9779801234567';
        const whatsappMessage = 'Hello! I have a question about Sabai Subhida.';
        url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`;
        // Fixed syntax error: removed stray parenthesis
        message = 'Opening WhatsApp chat...';
        break;
      default:
        return;
    }

    // Optional visual feedback (currently a no‑op placeholder)
    if (url) {
      try {
        // Show the chosen message in console for debugging / UX purposes
        console.log(message);
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch (error) {
        // Graceful fallback if pop‑up blocker or other error occurs
        console.error('Failed to open social link:', error);
        alert('Unable to open the link. Please check your pop‑up blocker.');
      }

      // A tiny timeout placeholder for potential future UI feedback
      const tempAlert = setTimeout(() => {
        // This creates a brief visual feedback – currently empty
        clearTimeout(tempAlert);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions? We're here to help! Reach out to us anytime and
              we'll get back to you quickly.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i
                      className={`${info.icon} w-8 h-8 flex items-center justify-center text-2xl text-blue-600`}
                    ></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="98XXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="return">Return/Exchange</option>
                        <option value="payment">Payment Problem</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      maxLength={500}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <i className="ri-loader-4-line w-5 h-5 flex items-center justify-center animate-spin mr-2"></i>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Find Us
                  </h3>
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.204447067059!2d85.31398931506102!3d27.705057682790854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a2fb9e2d%3A0x9e2b7a8f6f1b8c9!2sPutalisadak%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1635789123456!5m2!1sen!2snp"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Sabai Subhida Office Location"
                    ></iframe>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">
                    Quick Response Guarantee
                  </h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
                      Email replies within 2 hours (business hours)
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
                      Phone support available 6 days a week
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
                      Multi-language support (Nepali, English, Hindi)
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
                      Emergency support for urgent order issues
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">Quick answers to common questions</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-md">
                  <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    <span className="flex items-center">
                      <i className="ri-question-line w-5 h-5 flex items-center justify-center text-blue-600 mr-3"></i>
                      {faq.question}
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com/sabaisubhida"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <i className="ri-facebook-fill w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a
                href="https://instagram.com/sabaisubhida"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <i className="ri-instagram-line w-6 h-6 flex items-center justify-center"></i>
              </a>
              <button
                onClick={() => handleSocialClick('twitter')}
                className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer"
              >
                <i className="ri-twitter-fill w-6 h-6 flex items-center justify-center"></i>
              </button>
              <button
                onClick={() => handleSocialClick('youtube')}
                className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer"
              >
                <i className="ri-youtube-fill w-6 h-6 flex items-center justify-center"></i>
              </button>
              <button
                onClick={() => handleSocialClick('whatsapp')}
                className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
              >
                <i className="ri-whatsapp-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
