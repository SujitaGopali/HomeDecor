import React, { useState } from 'react';
import { Check, ArrowRight, Star, Users, Clock, Award } from 'lucide-react';

const Services = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const services = [
    {
      icon: '🏠',
      title: 'Residential Design',
      description: 'Complete home interior design solutions for living rooms, bedrooms, kitchens, and more.',
      features: ['Space Planning', 'Color Consultation', 'Furniture Selection', '3D Visualization']
    },
    {
      icon: '🏢',
      title: 'Commercial Spaces',
      description: 'Professional office and retail space design that enhances productivity and customer experience.',
      features: ['Office Layout', 'Brand Integration', 'Lighting Design', 'Ergonomic Solutions']
    },
    {
      icon: '🎨',
      title: 'Custom Design',
      description: 'Personalized design solutions tailored to your unique style and specific requirements.',
      features: ['Bespoke Furniture', 'Art Curation', 'Custom Lighting', 'Unique Layouts']
    },
    {
      icon: '🌿',
      title: 'Sustainable Design',
      description: 'Eco-friendly interior solutions using sustainable materials and energy-efficient designs.',
      features: ['Green Materials', 'Energy Efficiency', 'Waste Reduction', 'Healthy Living']
    },
    {
      icon: '💡',
      title: 'Consultation Services',
      description: 'Expert advice and guidance for your interior design projects and space optimization.',
      features: ['Design Consultation', 'Style Assessment', 'Budget Planning', 'Project Timeline']
    },
    {
      icon: '🔧',
      title: 'Project Management',
      description: 'End-to-end project coordination ensuring timely completion and quality execution.',
      features: ['Timeline Management', 'Vendor Coordination', 'Quality Control', 'Progress Tracking']
    }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Basic Consultation',
      price: '$299',
      period: 'per room',
      description: 'Perfect for single room makeovers and quick design guidance.',
      features: [
        'Initial consultation (2 hours)',
        'Design concept presentation',
        'Color palette recommendation',
        'Furniture layout suggestions',
        'Shopping list with links',
        'Email support for 30 days'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Design',
      price: '$899',
      period: 'per room',
      description: 'Comprehensive design service with detailed planning and 3D visualization.',
      features: [
        'Everything in Basic',
        '3D room visualization',
        'Detailed floor plans',
        'Custom mood boards',
        'Vendor sourcing assistance',
        'Two revision rounds',
        'Phone & email support for 60 days',
        'Installation guidance'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Full Service',
      price: '$1,899',
      period: 'per room',
      description: 'Complete white-glove service with project management and installation.',
      features: [
        'Everything in Professional',
        'Dedicated project manager',
        'Full installation service',
        'Custom furniture design',
        'Unlimited revisions',
        'Priority support',
        '90-day post-completion support',
        'Maintenance recommendations',
        'Seasonal refresh consultation'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'The professional design service exceeded our expectations. Our living room transformation was absolutely stunning!',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'Home Decor helped us create an office space that truly reflects our company culture. Highly recommended!',
      rating: 5,
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: Award },
    { number: '98%', label: 'Client Satisfaction', icon: Star },
    { number: '25+', label: 'Expert Designers', icon: Users },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-800 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Transform your space with our comprehensive interior design services. 
            From consultation to completion, we bring your vision to life.
          </p>
        </div>

        {/* Services Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 animate-slide-up glow-on-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3 font-display">
                  {service.title}
                </h3>
                <p className="text-primary-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-primary-600">
                      <Check className="w-4 h-4 text-gold-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-primary-600">
              Select the perfect service level for your interior design needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`glass-effect rounded-xl p-8 relative transition-all duration-300 glow-on-hover ${
                  plan.popular ? 'ring-2 ring-gold-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-primary-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gold-500">{plan.price}</span>
                    <span className="text-primary-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-primary-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-primary-600">
                      <Check className="w-4 h-4 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 hover:from-gold-600 hover:to-gold-800'
                      : 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-dark-50'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="glass-effect rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-dark-50" />
                    </div>
                    <div className="text-3xl font-bold text-primary-800 mb-2">{stat.number}</div>
                    <div className="text-primary-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-primary-600">
              Real feedback from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-xl animate-slide-up glow-on-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-primary-600 mb-6 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gold-500"
                  />
                  <div>
                    <div className="font-semibold text-primary-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-primary-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="glass-effect rounded-xl p-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-primary-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something beautiful together. 
              Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-800 transition-all duration-300 glow-on-hover">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold-500 text-gold-500 rounded-lg font-semibold hover:bg-gold-500 hover:text-dark-50 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;