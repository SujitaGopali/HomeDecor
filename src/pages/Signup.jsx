import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    return requirements;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordCheck = validatePassword(formData.password);
      if (!Object.values(passwordCheck).every(Boolean)) {
        newErrors.password = 'Password does not meet requirements';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password, formData.userType);
      navigate(formData.userType === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = validatePassword(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-dark-100 to-dark-200"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-5 bg-cover bg-center"></div>
      
      <div className="relative max-w-md w-full space-y-8">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-dark-50" />
            </div>
            <h2 className="text-3xl font-display font-bold text-primary-800">
              Join Home Decor
            </h2>
            <p className="mt-2 text-primary-600">
              Create your account and start designing
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <div className="flex rounded-lg bg-primary-100 p-1">
              <button
                type="button"
                onClick={() => setFormData({...formData, userType: 'user'})}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  formData.userType === 'user'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 shadow-lg'
                    : 'text-primary-600 hover:text-primary-800'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                User
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, userType: 'admin'})}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  formData.userType === 'admin'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 shadow-lg'
                    : 'text-primary-600 hover:text-primary-800'
                }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center space-x-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm">{errors.submit}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-primary-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500 ${
                    errors.name ? 'border-red-500' : 'border-primary-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500 ${
                    errors.email ? 'border-red-500' : 'border-primary-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500 ${
                    errors.password ? 'border-red-500' : 'border-primary-300'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary-400 hover:text-primary-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-primary-600 mb-1">Password must contain:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className={`flex items-center space-x-1 ${passwordRequirements.length ? 'text-green-400' : 'text-red-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordRequirements.uppercase ? 'text-green-400' : 'text-red-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>Uppercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordRequirements.lowercase ? 'text-green-400' : 'text-red-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>Lowercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordRequirements.number ? 'text-green-400' : 'text-red-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>Number</span>
                    </div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-primary-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary-400 hover:text-primary-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className={`h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 rounded bg-primary-100 ${
                  errors.terms ? 'border-red-500' : ''
                }`}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-primary-600">
                I agree to the{' '}
                <a href="#" className="text-gold-500 hover:text-gold-400">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-gold-500 hover:text-gold-400">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-400">{errors.terms}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-dark-50 bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-600 hover:to-gold-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 glow-on-hover"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-dark-50 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-100 text-primary-500">Already have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-gold-500 hover:text-gold-400 transition-colors"
            >
              Sign in to your account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;