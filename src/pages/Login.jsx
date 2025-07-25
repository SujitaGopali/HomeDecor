import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || (formData.userType === 'admin' ? '/admin-dashboard' : '/user-dashboard');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password, formData.userType);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-dark-100 to-dark-200"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-5 bg-cover bg-center"></div>
      
      <div className="relative max-w-md w-full space-y-8">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-dark-50" />
            </div>
            <h2 className="text-3xl font-display font-bold text-primary-800">
              Welcome Back
            </h2>
            <p className="mt-2 text-primary-600">
              Sign in to your Home Decor account
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
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center space-x-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="block w-full pl-10 pr-3 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500"
                  placeholder="Enter your email"
                />
              </div>
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
                  className="block w-full pl-10 pr-12 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500"
                  placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 rounded bg-primary-100"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-primary-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-gold-500 hover:text-gold-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-dark-50 bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-600 hover:to-gold-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 glow-on-hover"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-dark-50 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-primary-100 rounded-lg">
            <p className="text-sm text-primary-700 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-primary-600">Use any email and password to sign in</p>
          </div>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-100 text-primary-500">Don't have an account?</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <Link
              to="/signup"
              className="font-medium text-gold-500 hover:text-gold-400 transition-colors"
            >
              Create your account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;