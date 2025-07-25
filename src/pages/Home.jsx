import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Briefcase, Award, CheckCircle, Play, Sparkles, Palette, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Palette,
      title: 'Custom Design Solutions',
      description: 'Tailored interior designs that reflect your unique style and personality.',
    },
    {
      icon: Users,
      title: 'Expert Designers',
      description: 'Work with certified professionals who bring years of experience to your project.',
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description: 'Seamless coordination from concept to completion with our dedicated team.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'High-end materials and finishes that ensure lasting beauty and durability.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'Home Decor transformed our living space into something truly magical. The attention to detail and quality of work exceeded all our expectations.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'The team created an inspiring workspace that has significantly improved our productivity and client impressions. Absolutely professional service.',
      rating: 5,
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Emma Davis',
      role: 'Interior Enthusiast',
      content: 'Working with Home Decor was a dream come true. They understood our vision perfectly and brought it to life with stunning results.',
      rating: 5,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '25+', label: 'Expert Designers' },
    { number: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-dark-100 to-dark-200"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-10 bg-cover bg-center"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-gold-500 animate-pulse" />
                <span className="text-gold-500 font-medium">Premium Interior Design</span>
                <Sparkles className="w-6 h-6 text-gold-500 animate-pulse" />
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                <span className="text-primary-800">Transform Your</span>
                <br />
                <span className="gradient-text">Living Space</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-500 leading-relaxed max-w-3xl mx-auto">
                Create stunning interiors that reflect your personality with our expert design team. 
                From concept to completion, we bring your vision to life.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-800 transition-all duration-300 shadow-lg glow-on-hover"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold-500 text-gold-500 rounded-lg font-semibold hover:bg-gold-500 hover:text-dark-50 transition-all duration-300">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <span className="text-primary-600 font-medium">4.9/5 Rating</span>
              </div>
              <div className="text-primary-600">
                <span className="font-semibold">500+</span> Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-800 mb-6">
              Why Choose Home Decor?
            </h2>
            <p className="text-xl text-primary-500 max-w-3xl mx-auto">
              We combine creativity, expertise, and attention to detail to create spaces that inspire and delight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-effect p-8 rounded-xl hover:shadow-2xl transition-all duration-300 animate-slide-up glow-on-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-dark-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-primary-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-800">
                  Bringing Dreams to Reality
                </h2>
                <p className="text-xl text-primary-500 leading-relaxed">
                  Our team of expert designers works closely with you to understand your vision and transform it into a stunning reality. Every project is unique, just like you.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-500" />
                  <span className="text-primary-600">Personalized design consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-500" />
                  <span className="text-primary-600">3D visualization and planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-500" />
                  <span className="text-primary-600">Premium materials and finishes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-gold-500" />
                  <span className="text-primary-600">Complete project management</span>
                </div>
              </div>

              <Link
                to="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-800 transition-all duration-300 glow-on-hover"
              >
                View Our Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="relative animate-fade-in">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beautiful interior design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-effect p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                    <HomeIcon className="w-6 h-6 text-dark-50" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-800">Project Completed</div>
                    <div className="text-sm text-primary-600">Modern Living Space</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-800 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-primary-500">
              Real stories from real people who transformed their spaces with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <p className="text-primary-600 mb-6 leading-relaxed">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-50 mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-dark-100 mb-8">
              Join hundreds of satisfied clients who have created their dream spaces with our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-50 text-gold-600 rounded-lg font-semibold hover:bg-primary-900 transition-all duration-300 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-dark-50 text-dark-50 rounded-lg font-semibold hover:bg-dark-50 hover:text-gold-600 transition-all duration-300"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;