
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Details
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    dateOfBirth: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPEmail = (email: string, otp: string) => {
    const emailContent = `
Dear User,

Welcome to Sabai Subhida!

Your email verification code is: ${otp}

This code will expire in 10 minutes. Please enter this code to complete your registration.

If you didn't request this code, please ignore this email.

Thank you for choosing Sabai Subhida - Nepal's premier e-commerce platform!

Best regards,
Sabai Subhida Team
support@sabaisubhida.com
+977- 9765630494
    `;

    // Simulate email sending
    console.log('📧 OTP EMAIL TO:', email);
    console.log('📧 EMAIL CONTENT:', emailContent);

    // Store email record
    const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    emailRecords.push({
      to: email,
      subject: 'Email Verification Code - Sabai Subhida',
      content: emailContent,
      timestamp: new Date().toISOString(),
      status: 'simulated',
      type: 'otp'
    });
    localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if user already exists - normalize email to lowercase for consistency
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email.toLowerCase() === formData.email.toLowerCase());

      if (existingUser) {
        setError('User with this email already exists');
        return;
      }

      // Generate and send OTP
      const otp = generateOTP();
      setGeneratedOTP(otp);

      // Send OTP email
      sendOTPEmail(formData.email, otp);

      // Store OTP with timestamp - normalize email
      const otpData = {
        email: formData.email.toLowerCase(),
        otp: otp,
        timestamp: Date.now(),
        expires: Date.now() + 10 * 60 * 1000 // 10 minutes
      };
      localStorage.setItem('pendingOTP', JSON.stringify(otpData));

      setOtpSent(true);
      setStep(2);
      alert(`OTP sent to ${formData.email}!\nFor demo: ${otp}`);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const savedOTP = localStorage.getItem('pendingOTP');
      if (!savedOTP) {
        setError('OTP expired. Please request a new one.');
        return;
      }

      const otpData = JSON.parse(savedOTP);

      // Check if OTP expired
      if (Date.now() > otpData.expires) {
        setError('OTP expired. Please request a new one.');
        localStorage.removeItem('pendingOTP');
        setStep(1);
        setOtpSent(false);
        return;
      }

      // Verify OTP
      if (formData.otp !== otpData.otp) {
        setError('Invalid OTP. Please try again.');
        return;
      }

      // OTP verified, proceed to details
      setStep(3);
      localStorage.removeItem('pendingOTP');
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some((u: any) => u.email.toLowerCase() === formData.email.toLowerCase())) {
        setError('An account with this email already exists');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'user',  // Default role is 'user', not 'admin'
        status: 'active',
        createdAt: new Date().toISOString(),
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Send welcome email with company branding
      const welcomeEmail = `
Dear ${formData.fullName},

Welcome to Sabai Subhida - Nepal's Premier E-commerce Platform!

Your account has been successfully created. You can now start shopping for quality products from electronics to everyday essentials, all delivered right to your doorstep across Nepal.

Account Details:
- Email: ${formData.email.toLowerCase()}
- Phone: ${formData.phone}
- Registration Date: ${new Date().toLocaleDateString()}

What's Next:
✓ Explore our wide range of products
✓ Enjoy fast delivery across Nepal
✓ Get exclusive deals and offers
✓ Track your orders in real-time

Start exploring our categories: Electronics, Fashion, Home & Kitchen, Beauty, Books, and much more!

For any assistance, contact us:
📧 support@sabaisubhida.com
📞 +977- 9765630494

Thank you for joining Sabai Subhida family!

Best regards,
Sabai Subhida Team
Nepal's Trusted E-commerce Platform
      `;

      const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
      emailRecords.push({
        to: formData.email.toLowerCase(),
        subject: 'Welcome to Sabai Subhida!',
        content: welcomeEmail,
        timestamp: new Date().toISOString(),
        status: 'simulated',
        type: 'welcome'
      });
      localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));

      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Create new user - normalize email to lowercase for consistency
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email.toLowerCase(), // Normalize email to lowercase
        phone: formData.phone,
        password: formData.password,
        emailVerified: true,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');

      // Send welcome email with company branding
      const welcomeEmail = `
Dear ${formData.fullName},

Welcome to Sabai Subhida - Nepal's Premier E-commerce Platform!

Your account has been successfully created. You can now start shopping for quality products from electronics to everyday essentials, all delivered right to your doorstep across Nepal.

Account Details:
- Email: ${formData.email.toLowerCase()}
- Phone: ${formData.phone}
- Registration Date: ${new Date().toLocaleDateString()}

What's Next:
✓ Explore our wide range of products
✓ Enjoy fast delivery across Nepal
✓ Get exclusive deals and offers
✓ Track your orders in real-time

Start exploring our categories: Electronics, Fashion, Home & Kitchen, Beauty, Books, and much more!

For any assistance, contact us:
📧 support@sabaisubhida.com
📞 +977- 9765630494

Thank you for joining Sabai Subhida family!

Best regards,
Sabai Subhida Team
Nepal's Trusted E-commerce Platform
      `;

      const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
      emailRecords.push({
        to: formData.email.toLowerCase(),
        subject: 'Welcome to Sabai Subhida!',
        content: welcomeEmail,
        timestamp: new Date().toISOString(),
        status: 'simulated',
        type: 'welcome'
      });
      localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));

      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    const otp = generateOTP();
    setGeneratedOTP(otp);
    sendOTPEmail(formData.email, otp);

    const otpData = {
      email: formData.email.toLowerCase(), // Normalize email
      otp: otp,
      timestamp: Date.now(),
      expires: Date.now() + 10 * 60 * 1000
    };
    localStorage.setItem('pendingOTP', JSON.stringify(otpData));

    alert(`New OTP sent to ${formData.email}!\nFor demo: ${otp}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="flex justify-center">
            <div className="font-[\'Pacifico\'] text-3xl text-blue-600">Sabai Subhida</div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {step === 1 ? 'Create your account' : 
             step === 2 ? 'Verify your email' : 
             'Complete registration'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step !== 3 ? (
              <>
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </>
            ) : (
              'Almost done! Fill in your details'
            )}
          </p>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
              />
              <p className="mt-2 text-sm text-gray-600">
                We'll send a verification code to this email
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin mr-2"></i>
                  Sending OTP...
                </div>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                value={formData.otp}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-semibold tracking-widest"
                placeholder="Enter 6-digit code"
              />
              <p className="mt-2 text-sm text-gray-600">
                Enter the 6-digit code sent to {formData.email}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin mr-2"></i>
                  Verifying...
                </div>
              ) : (
                'Verify Code'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={resendOTP}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Complete Details */}
        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your date of birth"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin mr-2"></i>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
