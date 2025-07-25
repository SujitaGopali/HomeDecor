import React, { useState } from 'react';
import { Star, MapPin, Clock, Filter, Search, Heart } from 'lucide-react';

const Consultants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const consultants = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      specialty: 'Modern Residential',
      location: 'New York, NY',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 120,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Specializing in contemporary design with a focus on clean lines and functional spaces.',
      experience: '8 years',
      projects: 156,
      responseTime: '2 hours'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Commercial Spaces',
      location: 'Los Angeles, CA',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 150,
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Expert in creating productive and inspiring commercial environments.',
      experience: '12 years',
      projects: 203,
      responseTime: '1 hour'
    },
    {
      id: 3,
      name: 'Emma Davis',
      specialty: 'Minimalist Design',
      location: 'Seattle, WA',
      rating: 4.9,
      reviews: 94,
      hourlyRate: 110,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Creating serene, clutter-free spaces that promote well-being and mindfulness.',
      experience: '6 years',
      projects: 98,
      responseTime: '3 hours'
    },
    {
      id: 4,
      name: 'James Rodriguez',
      specialty: 'Luxury Design',
      location: 'Miami, FL',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 200,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'High-end residential and commercial projects with attention to luxury details.',
      experience: '15 years',
      projects: 245,
      responseTime: '4 hours'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      specialty: 'Sustainable Design',
      location: 'Portland, OR',
      rating: 4.8,
      reviews: 73,
      hourlyRate: 135,
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Eco-friendly design solutions that are both beautiful and environmentally conscious.',
      experience: '9 years',
      projects: 134,
      responseTime: '2 hours'
    },
    {
      id: 6,
      name: 'David Park',
      specialty: 'Traditional Style',
      location: 'Boston, MA',
      rating: 4.6,
      reviews: 112,
      hourlyRate: 125,
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Classic and timeless designs with a focus on traditional craftsmanship.',
      experience: '11 years',
      projects: 187,
      responseTime: '3 hours'
    }
  ];

  const specialties = [
    'Modern Residential',
    'Commercial Spaces',
    'Minimalist Design',
    'Luxury Design',
    'Sustainable Design',
    'Traditional Style'
  ];

  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Seattle, WA',
    'Miami, FL',
    'Portland, OR',
    'Boston, MA'
  ];

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || consultant.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || consultant.location === selectedLocation;
    const matchesPrice = !priceRange || 
                        (priceRange === 'under100' && consultant.hourlyRate < 100) ||
                        (priceRange === '100-150' && consultant.hourlyRate >= 100 && consultant.hourlyRate <= 150) ||
                        (priceRange === 'over150' && consultant.hourlyRate > 150);
    
    return matchesSearch && matchesSpecialty && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">
            Find Your Perfect Designer
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Browse our network of professional interior designers and find the perfect match for your project
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-neutral-600" />
            <h3 className="text-lg font-semibold text-neutral-800">Filter Consultants</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Specialty Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Price Ranges</option>
              <option value="under100">Under $100/hr</option>
              <option value="100-150">$100-150/hr</option>
              <option value="over150">Over $150/hr</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredConsultants.length} of {consultants.length} consultants
          </p>
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConsultants.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-scale-in"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 transition-colors">
                  <Heart className="w-4 h-4 text-neutral-600" />
                </button>
                <div className="absolute bottom-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${consultant.hourlyRate}/hr
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    {consultant.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent-500 fill-current" />
                    <span className="text-sm font-medium text-neutral-700">
                      {consultant.rating}
                    </span>
                    <span className="text-sm text-neutral-500">
                      ({consultant.reviews})
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <span className="font-medium">{consultant.specialty}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4" />
                    <span>{consultant.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Clock className="w-4 h-4" />
                    <span>Responds in {consultant.responseTime}</span>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {consultant.bio}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-neutral-800">
                      {consultant.experience}
                    </div>
                    <div className="text-xs text-neutral-600">Experience</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-neutral-800">
                      {consultant.projects}
                    </div>
                    <div className="text-xs text-neutral-600">Projects</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-neutral-800">
                      {consultant.rating}
                    </div>
                    <div className="text-xs text-neutral-600">Rating</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                    Book Consultation
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredConsultants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              No consultants found
            </h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('');
                setSelectedLocation('');
                setPriceRange('');
              }}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultants;