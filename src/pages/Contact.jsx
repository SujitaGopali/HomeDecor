import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Building2, Calendar } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          preferredContact: 'email'
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@homedecor.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Design Avenue, Creative District, NY 10001',
      description: 'Visit us for in-person consultations'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM',
      description: 'Saturday: 10:00 AM - 4:00 PM'
    }
  ];

  const projectTypes = [
    'Residential - Living Room',
    'Residential - Kitchen',
    'Residential - Bedroom',
    'Residential - Bathroom',
    'Residential - Full Home',
    'Commercial - Office',
    'Commercial - Retail',
    'Commercial - Restaurant',
    'Consultation Only',
    'Other'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000',
    'Consultation Budget'
  ];

  const timelines = [
    'ASAP',
    '1-2 months',
    '3-6 months',
    '6-12 months',
    'More than 1 year',
    'Flexible'
  ];

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-800 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Ready to transform your space? Let's discuss your interior design project and 
            bring your vision to life with our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-6 font-display">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-dark-50" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary-800 mb-1">
                          {info.title}
                        </h4>
                        <p className="text-primary-700 mb-1">{info.details}</p>
                        <p className="text-sm text-primary-500">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-6 font-display">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-dark-50" />
                  </div>
                  <span className="text-primary-600">25+ Expert Designers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-dark-50" />
                  </div>
                  <span className="text-primary-600">500+ Projects Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-dark-50" />
                  </div>
                  <span className="text-primary-600">24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-dark-50" />
                  </div>
                  <span className="text-primary-600">Free Initial Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-primary-800 mb-6 font-display">
                Start Your Project
              </h3>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-dark-50 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-400">Message Sent Successfully!</h4>
                      <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800 placeholder-primary-500"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-primary-700 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-primary-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-primary-700 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-primary-100 text-primary-800"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors resize-none bg-primary-100 text-primary-800 placeholder-primary-500"
                    placeholder="Tell us about your project, style preferences, specific requirements, and any inspiration you have in mind..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 bg-primary-100"
                      />
                      <span className="ml-2 text-sm text-primary-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 bg-primary-100"
                      />
                      <span className="ml-2 text-sm text-primary-700">Phone</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 py-4 px-6 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 glow-on-hover"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-dark-50 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 glass-effect rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-primary-800 mb-8 text-center font-display">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary-800 mb-2">
                How long does a typical project take?
              </h4>
              <p className="text-primary-600 text-sm">
                Project timelines vary based on scope and complexity. Small room redesigns typically take 2-4 weeks, while full home renovations can take 2-6 months.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-2">
                Do you work with any budget?
              </h4>
              <p className="text-primary-600 text-sm">
                Yes! We have designers who specialize in various budget ranges. We'll match you with a consultant who can work within your specific budget constraints.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-2">
                What's included in the consultation?
              </h4>
              <p className="text-primary-600 text-sm">
                Initial consultations include space assessment, style discussion, budget planning, timeline creation, and a preliminary design concept presentation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-800 mb-2">
                Can you work with existing furniture?
              </h4>
              <p className="text-primary-600 text-sm">
                Absolutely! We love incorporating your existing pieces into new designs. We'll assess what works and suggest how to integrate them into your new space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;