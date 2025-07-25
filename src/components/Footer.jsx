import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-primary-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mr-3">
                <Home className="w-6 h-6 text-dark-50" />
              </div>
              <span className="font-display text-2xl font-bold gradient-text">Home Decor</span>
            </div>
            <p className="text-primary-500 text-sm leading-relaxed">
              Transform your living spaces with our premium interior design solutions. 
              Creating beautiful, functional homes that reflect your unique style and personality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-700 font-display">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-700 font-display">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-500 text-sm">Residential Design</li>
              <li className="text-primary-500 text-sm">Commercial Spaces</li>
              <li className="text-primary-500 text-sm">Space Planning</li>
              <li className="text-primary-500 text-sm">Color Consultation</li>
              <li className="text-primary-500 text-sm">Furniture Selection</li>
              <li className="text-primary-500 text-sm">Custom Solutions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-700 font-display">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-primary-500 text-sm">
                  123 Design Avenue, Creative District, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-primary-500 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-primary-500 text-sm">hello@homedecor.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-500 text-sm flex items-center">
            © 2025 Home Decor. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for beautiful spaces.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-primary-500 hover:text-gold-500 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;