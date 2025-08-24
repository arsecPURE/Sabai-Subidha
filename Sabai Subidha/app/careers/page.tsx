'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CareersPage() {
  const positions = [
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Join our team to build amazing user experiences for Nepal\'s leading e-commerce platform.',
      requirements: ['React/Next.js experience', 'TypeScript proficiency', 'UI/UX understanding']
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Kathmandu, Nepal', 
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Lead marketing campaigns and grow our brand presence across Nepal.',
      requirements: ['Digital marketing experience', 'Data-driven approach', 'Creative thinking']
    },
    {
      title: 'Customer Support Specialist',
      department: 'Customer Service',
      location: 'Remote',
      type: 'Full-time',
      experience: '1-2 years',
      description: 'Help our customers have the best shopping experience possible.',
      requirements: ['Excellent communication', 'Problem-solving skills', 'Nepali & English fluency']
    },
    {
      title: 'Warehouse Operations Manager',
      department: 'Operations',
      location: 'Pokhara, Nepal',
      type: 'Full-time', 
      experience: '4-6 years',
      description: 'Oversee warehouse operations and ensure efficient product distribution.',
      requirements: ['Operations management', 'Team leadership', 'Process optimization']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Help us revolutionize e-commerce in Nepal. Build your career with a company that values innovation, growth, and making a positive impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#positions" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                View Open Positions
              </a>
              <a href="#culture" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
                Our Culture
              </a>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section id="culture" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're building the future of e-commerce in Nepal, and we want passionate people to join us on this journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-team-line text-blue-600 w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Great Team</h3>
                <p className="text-gray-600 text-sm">Work with talented, passionate people who care about making a difference.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-rocket-line text-green-600 w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Growth</h3>
                <p className="text-gray-600 text-sm">Continuous learning opportunities and clear career advancement paths.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-line text-purple-600 w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                <p className="text-gray-600 text-sm">Competitive salary, health insurance, flexible hours, and more.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lightbulb-line text-orange-600 w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">Work on cutting-edge projects and bring your creative ideas to life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
              <p className="text-gray-600">Find your next opportunity with us</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {positions.map((position, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <i className="ri-building-line w-4 h-4 flex items-center justify-center mr-1"></i>
                          {position.department}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-1"></i>
                          {position.type}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-graduation-cap-line w-4 h-4 flex items-center justify-center mr-1"></i>
                          {position.experience}
                        </span>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer mt-4 md:mt-0">
                      Apply Now
                    </button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{position.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Process</h2>
              <p className="text-gray-600">Simple steps to join our team</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Apply Online</h3>
                <p className="text-gray-600 text-sm">Submit your application and resume through our online portal.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Interview</h3>
                <p className="text-gray-600 text-sm">Meet with our team to discuss your experience and goals.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Join Us</h3>
                <p className="text-gray-600 text-sm">Start your journey with Sabai Subhida and make an impact.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}