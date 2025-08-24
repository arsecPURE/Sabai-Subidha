
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ForgotPasswordContent() {
  const [step, setStep] = useState(1); // 1: Email, 2: Reset Password
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for reset token in URL on component mount
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Verify token exists and is valid
      const savedToken = localStorage.getItem(`resetToken_${token}`);
      if (savedToken) {
        const tokenData = JSON.parse(savedToken);
        if (Date.now() < tokenData.expires && !tokenData.used) {
          setResetToken(token);
          setFormData(prev => ({ ...prev, email: tokenData.email }));
          setStep(2);
          setSuccess('Reset link verified successfully!');
        } else {
          setError('Reset link has expired or already been used. Please request a new one.');
          localStorage.removeItem(`resetToken_${token}`);
        }
      } else {
        setError('Invalid reset link. Please request a new one.');
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    setSuccess('');

    // Check password strength
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength('');
    } else if (password.length < 6) {
      setPasswordStrength('Too short');
    } else if (password.length < 8) {
      setPasswordStrength('Weak');
    } else if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Medium');
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'Too short': return 'text-red-500';
      case 'Weak': return 'text-orange-500';
      case 'Medium': return 'text-yellow-500';
      case 'Strong': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const generateResetToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const sendPasswordResetEmail = (email: string, resetLink: string, userName: string) => {
    const emailContent = `
Dear ${userName},

We received a request to reset your password for your Sabai Subhida account.

To reset your password, please click on the following link:

${resetLink}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, please ignore this email and your password will remain unchanged.

For security reasons, never share this link with anyone.

Security Tips:
✓ Use a strong, unique password
✓ Enable two-factor authentication when available
✓ Never share your login credentials
✓ Log out from public devices

Need help? Contact us:
📧 support@sabaisubhida.com  
📞 +977- 9765630494
💬 Live Chat: Available 24/7 on our website

Best regards,
Sabai Subhida Security Team
Nepal's Premier E-commerce Platform

---
This is an automated message. Please do not reply to this email.
    `;

    // Store email record
    const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    emailRecords.push({
      to: email,
      subject: '🔐 Reset Your Password - Sabai Subhida',
      content: emailContent,
      timestamp: new Date().toISOString(),
      status: 'simulated',
      type: 'password_reset',
      resetLink: resetLink
    });
    localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setError('Email address is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email.toLowerCase() === formData.email.toLowerCase());
      
      if (!existingUser) {
        setError('No account found with this email address. Please check your email or create a new account.');
        return;
      }

      // Generate reset token
      const token = generateResetToken();
      
      // Create reset link
      const resetLink = `${window.location.origin}/auth/forgot-password?token=${token}`;
      
      // Store token with timestamp and email
      const tokenData = {
        email: formData.email.toLowerCase(),
        token: token,
        timestamp: Date.now(),
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
        used: false,
        userId: existingUser.id
      };
      localStorage.setItem(`resetToken_${token}`, JSON.stringify(tokenData));
      
      // Send password reset email with link
      sendPasswordResetEmail(formData.email, resetLink, existingUser.fullName || 'User');
      
      setSuccess(`Password reset link has been sent to ${formData.email}. Please check your email and click the link to reset your password.`);
      
      // Show success message with demo link for development
      alert(`Password reset link sent to ${formData.email}!\n\n🔗 Demo Link (for testing):\n${resetLink}\n\nIn production, users would receive this link via email.`);
      
    } catch (err) {
      setError('Failed to send reset link. Please try again or contact support if the problem persists.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    
    // Check password strength
    if (passwordStrength === 'Too short') {
      setError('Please choose a stronger password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Verify token is still valid
      const savedToken = localStorage.getItem(`resetToken_${resetToken}`);
      if (!savedToken) {
        setError('Reset link is invalid or has expired. Please request a new reset link.');
        return;
      }

      const tokenData = JSON.parse(savedToken);
      if (Date.now() > tokenData.expires) {
        setError('Reset link has expired. Please request a new reset link.');
        localStorage.removeItem(`resetToken_${resetToken}`);
        return;
      }

      if (tokenData.used) {
        setError('This reset link has already been used. Please request a new reset link if needed.');
        localStorage.removeItem(`resetToken_${resetToken}`);
        return;
      }

      // Update user password
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === tokenData.email.toLowerCase());
      
      if (userIndex > -1) {
        // Update password and related fields
        users[userIndex].password = formData.newPassword;
        users[userIndex].passwordUpdated = new Date().toISOString();
        users[userIndex].lastPasswordReset = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Mark token as used
        tokenData.used = true;
        tokenData.usedAt = new Date().toISOString();
        localStorage.setItem(`resetToken_${resetToken}`, JSON.stringify(tokenData));
        
        // Remove token after a short delay
        setTimeout(() => {
          localStorage.removeItem(`resetToken_${resetToken}`);
        }, 5000);
        
        // Send confirmation email
        const confirmationEmail = `
Dear ${users[userIndex].fullName || 'User'},

Your password for Sabai Subhida has been successfully reset.

Password Reset Details:
- Date & Time: ${new Date().toLocaleString()}
- IP Address: [Hidden for privacy]
- Device: Web Browser

If you did not make this change, please contact our support team immediately:
📧 support@sabaisubhida.com
📞 +977- 9765630494
💬 Live Chat: Available 24/7 on our website

For your account security:
✓ Never share your password with anyone
✓ Use a strong, unique password
✓ Enable two-factor authentication when available
✓ Log out from public or shared devices
✓ Monitor your account for suspicious activity

You can now log in with your new password.

Thank you for using Sabai Subhida!

Best regards,
Sabai Subhida Security Team
Nepal's Premier E-commerce Platform

---
This is an automated security notification.
        `;
        
        const emailRecords = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
        emailRecords.push({
          to: tokenData.email,
          subject: '✅ Password Reset Successful - Sabai Subhida',
          content: confirmationEmail,
          timestamp: new Date().toISOString(),
          status: 'simulated',
          type: 'password_reset_confirmation'
        });
        localStorage.setItem('emailNotifications', JSON.stringify(emailRecords));
        
        setSuccess('Password reset successfully! You will be redirected to the login page.');
        
        // Redirect to login page after success
        setTimeout(() => {
          router.push('/auth/login?message=password_reset_success');
        }, 3000);
      } else {
        setError('User account not found. Please contact support for assistance.');
      }
    } catch (err) {
      setError('Password reset failed. Please try again or contact support if the problem persists.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendResetLink = () => {
    setStep(1);
    setError('');
    setSuccess('');
    setFormData({ email: formData.email, newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="flex justify-center">
            <div className="font-['Pacifico'] text-3xl text-blue-600">Sabai Subhida</div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {step === 1 ? 'Reset your password' : 'Create new password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 ? (
              <>
                Remember your password?{' '}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </>
            ) : (
              'Enter your new password below'
            )}
          </p>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleSendResetLink}>
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
                placeholder="Enter your registered email address"
              />
              <p className="mt-2 text-sm text-gray-600">
                We'll send a secure password reset link to this email address
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  {success}
                </div>
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
                  Sending reset link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <i className="ri-information-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                  <h4 className="font-medium text-blue-900">What happens next?</h4>
                </div>
                <ul className="text-sm text-blue-800 text-left space-y-1">
                  <li>• You'll receive an email with a secure reset link</li>
                  <li>• The link expires in 1 hour for security</li>
                  <li>• Click the link to set your new password</li>
                  <li>• Check your spam folder if you don't see the email</li>
                </ul>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Reset Password */}
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            {success && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <i className="ri-check-line w-5 h-5 flex items-center justify-center text-green-600 mr-2"></i>
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center text-blue-600 mr-2"></i>
                <p className="text-sm text-blue-600">
                  Reset link verified for {formData.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password (minimum 6 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} w-5 h-5 flex items-center justify-center`}></i>
                  </button>
                </div>
                {passwordStrength && (
                  <p className={`mt-1 text-sm ${getPasswordStrengthColor()}`}>
                    Password strength: {passwordStrength}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} w-5 h-5 flex items-center justify-center`}></i>
                  </button>
                </div>
                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  {error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || formData.newPassword !== formData.confirmPassword}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin mr-2"></i>
                  Resetting password...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                After resetting, you'll be redirected to the login page.
              </p>
              <button
                type="button"
                onClick={resendResetLink}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Need a new reset link?
              </button>
            </div>

            {/* Security Tips */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <i className="ri-shield-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Security Tips
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use a unique password you haven't used before</li>
                <li>• Include uppercase, lowercase, numbers, and symbols</li>
                <li>• Avoid personal information like names or birthdates</li>
                <li>• Consider using a password manager</li>
              </ul>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading password reset...</p>
        </div>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}
