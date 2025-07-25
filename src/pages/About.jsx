import React from 'react';
import { Users, Award, Target, Heart, Star, CheckCircle } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Lead Interior Designer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'With over 10 years of experience in residential design, Sarah specializes in creating modern, functional spaces that reflect her clients\' personalities.',
      specialties: ['Modern Design', 'Space Planning', 'Color Theory']
    },
    {
      name: 'Michael Chen',
      role: 'Commercial Design Director',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Michael brings 12 years of commercial design expertise, focusing on creating productive and inspiring work environments for businesses.',
      specialties: ['Commercial Spaces', 'Workplace Design', 'Brand Integration']
    },
    {
      name: 'Emma Davis',
      role: 'Sustainable Design Specialist',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Emma is passionate about eco-friendly design solutions, combining sustainability with beautiful aesthetics in every project.',
      specialties: ['Sustainable Materials', 'Green Design', 'Wellness Spaces']
    },
    {
      name: 'James Rodriguez',
      role: 'Luxury Design Consultant',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'James specializes in high-end residential and commercial projects, bringing luxury and sophistication to every design.',
      specialties: ['Luxury Interiors', 'Custom Furniture', 'Art Curation']
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring the highest quality in design and execution.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for design drives us to create spaces that truly inspire and transform lives.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients, listening to their needs and bringing their vision to life.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace new trends and technologies to deliver cutting-edge design solutions.'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '25+', label: 'Design Awards' },
    { number: '8', label: 'Years of Excellence' }
  ];

  const milestones = [
    {
      year: '2017',
      title: 'Company Founded',
      description: 'Home Decor was established with a vision to make premium interior design accessible to everyone.'
    },
    {
      year: '2019',
      title: 'First Design Award',
      description: 'Received our first industry recognition for innovative residential design solutions.'
    },
    {
      year: '2021',
      title: 'Commercial Expansion',
      description: 'Expanded our services to include commercial and office space design projects.'
    },
    {
      year: '2023',
      title: 'Sustainability Focus',
      description: 'Launched our sustainable design initiative, focusing on eco-friendly materials and practices.'
    },
    {
      year: '2025',
      title: 'Digital Innovation',
      description: 'Introduced advanced 3D visualization and virtual reality design consultation services.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-800 mb-6">
            About Home Decor
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            We are passionate interior designers dedicated to transforming spaces and creating beautiful, 
            functional environments that reflect your unique style and enhance your quality of life.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="glass-effect rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-display font-bold text-primary-800 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-primary-600 mb-6 leading-relaxed">
                  At Home Decor, we believe that great design has the power to transform not just spaces, 
                  but lives. Our mission is to create beautiful, functional interiors that reflect our 
                  clients' personalities and enhance their daily experiences.
                </p>
                <p className="text-lg text-primary-600 leading-relaxed">
                  We combine creativity, expertise, and attention to detail to deliver exceptional 
                  design solutions that exceed expectations and stand the test of time.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gold-500" />
                    <span className="text-primary-600">Personalized design approach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gold-500" />
                    <span className="text-primary-600">Sustainable and eco-friendly solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gold-500" />
                    <span className="text-primary-600">Exceptional customer service</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Beautiful interior design"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-primary-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="glass-effect p-6 rounded-xl text-center animate-slide-up glow-on-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-dark-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-3 font-display">
                    {value.title}
                  </h3>
                  <p className="text-primary-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-20">
          <div className="glass-effect rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
                Our Achievements
              </h2>
              <p className="text-xl text-primary-600">
                Numbers that reflect our commitment to excellence
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-primary-600 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-primary-600">
              Talented designers passionate about creating beautiful spaces
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl overflow-hidden animate-slide-up glow-on-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-800 mb-1 font-display">
                    {member.name}
                  </h3>
                  <p className="text-gold-500 font-medium mb-3">{member.role}</p>
                  <p className="text-primary-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mr-1"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-primary-600">
              Key milestones in our company's growth and evolution
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gold-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="glass-effect p-6 rounded-xl">
                      <div className="text-2xl font-bold text-gold-500 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-primary-800 mb-2 font-display">
                        {milestone.title}
                      </h3>
                      <p className="text-primary-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gold-500 rounded-full border-4 border-dark-50"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="glass-effect rounded-xl p-12">
            <h2 className="text-4xl font-display font-bold text-primary-800 mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-primary-600 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create the space of your dreams. Our team is ready to 
              bring your vision to life with creativity, expertise, and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-800 transition-all duration-300 glow-on-hover">
                Start Your Project
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold-500 text-gold-500 rounded-lg font-semibold hover:bg-gold-500 hover:text-dark-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;