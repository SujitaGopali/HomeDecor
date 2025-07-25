import React, { useState } from 'react';
import { Heart, Eye, Download, Share2, Filter, Grid3X3, List, Star } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    'all',
    'living-room',
    'kitchen',
    'bedroom',
    'bathroom',
    'office',
    'commercial'
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern Minimalist Living Room',
      category: 'living-room',
      designer: 'Sarah Mitchell',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'A contemporary living space featuring clean lines, neutral tones, and carefully curated furniture pieces.',
      likes: 243,
      views: 1420,
      tags: ['modern', 'minimalist', 'neutral'],
      rating: 4.9
    },
    {
      id: 2,
      title: 'Luxury Kitchen Design',
      category: 'kitchen',
      designer: 'Michael Chen',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-end kitchen with custom cabinetry, premium appliances, and sophisticated lighting design.',
      likes: 189,
      views: 956,
      tags: ['luxury', 'modern', 'custom'],
      rating: 4.8
    },
    {
      id: 3,
      title: 'Serene Master Bedroom',
      category: 'bedroom',
      designer: 'Emma Davis',
      image: 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Peaceful bedroom design focused on comfort, natural materials, and calming color palette.',
      likes: 167,
      views: 823,
      tags: ['serene', 'natural', 'comfort'],
      rating: 4.9
    },
    {
      id: 4,
      title: 'Contemporary Office Space',
      category: 'office',
      designer: 'James Rodriguez',
      image: 'https://images.pexels.com/photos/4458420/pexels-photo-4458420.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern office design promoting productivity and creativity with ergonomic furniture and inspiring decor.',
      likes: 134,
      views: 672,
      tags: ['contemporary', 'productive', 'ergonomic'],
      rating: 4.7
    },
    {
      id: 5,
      title: 'Spa-Like Bathroom Retreat',
      category: 'bathroom',
      designer: 'Lisa Thompson',
      image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Luxurious bathroom featuring marble finishes, modern fixtures, and spa-inspired elements.',
      likes: 198,
      views: 1105,
      tags: ['spa', 'luxury', 'marble'],
      rating: 4.8
    },
    {
      id: 6,
      title: 'Cozy Reading Corner',
      category: 'living-room',
      designer: 'Sarah Mitchell',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Perfect reading nook with built-in shelving, comfortable seating, and warm lighting.',
      likes: 156,
      views: 784,
      tags: ['cozy', 'reading', 'built-in'],
      rating: 4.6
    },
    {
      id: 7,
      title: 'Industrial Chic Kitchen',
      category: 'kitchen',
      designer: 'David Park',
      image: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Industrial-style kitchen with exposed brick, steel accents, and vintage-inspired fixtures.',
      likes: 211,
      views: 1234,
      tags: ['industrial', 'brick', 'vintage'],
      rating: 4.7
    },
    {
      id: 8,
      title: 'Elegant Master Suite',
      category: 'bedroom',
      designer: 'Emma Davis',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Luxurious master bedroom with walk-in closet, ensuite bathroom, and sophisticated decor.',
      likes: 289,
      views: 1567,
      tags: ['elegant', 'luxury', 'master'],
      rating: 4.9
    },
    {
      id: 9,
      title: 'Corporate Headquarters Lobby',
      category: 'commercial',
      designer: 'Michael Chen',
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Professional lobby design that makes a strong first impression with modern furniture and branding.',
      likes: 145,
      views: 892,
      tags: ['corporate', 'professional', 'branding'],
      rating: 4.8
    }
  ];

  const filteredItems = portfolioItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const getCategoryLabel = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-800 mb-6">
            Design Gallery
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Explore our stunning portfolio of interior design projects and get inspired for your own space transformation
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-primary-600">
            Showing {filteredItems.length} {selectedCategory === 'all' ? 'designs' : getCategoryLabel(selectedCategory).toLowerCase() + ' designs'}
          </p>
        </div>

        {/* Gallery Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-effect rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in group glow-on-hover"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelectedImage(item)}
                        className="bg-white text-primary-800 p-2 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="bg-white text-primary-800 p-2 rounded-full hover:bg-primary-100 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="bg-white text-primary-800 p-2 rounded-full hover:bg-primary-100 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-primary-800 font-display">
                      {item.title}
                    </h3>
                    <span className="px-2 py-1 bg-gold-500 text-dark-50 text-xs font-medium rounded-full">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-primary-600 mb-3">
                    by {item.designer}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-gold-500 fill-current' : 'text-primary-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-primary-600 ml-2">{item.rating}</span>
                  </div>
                  
                  <p className="text-primary-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-primary-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <button className="text-gold-500 hover:text-gold-400 font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-effect rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-800 mb-1 font-display">
                          {item.title}
                        </h3>
                        <p className="text-primary-600">by {item.designer}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-gold-500 fill-current' : 'text-primary-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-primary-600 ml-2">{item.rating}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gold-500 text-dark-50 text-sm font-medium rounded-full">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    
                    <p className="text-primary-600 mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-primary-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views} views</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedImage(item)}
                          className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300"
                        >
                          View Details
                        </button>
                        <button className="border border-primary-300 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-primary-800 mb-2">
              No designs found
            </h3>
            <p className="text-primary-600 mb-6">
              No designs match your current filter. Try selecting a different category.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-6 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300"
            >
              View All Designs
            </button>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-xl max-w-4xl max-h-full overflow-auto">
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white text-primary-800 p-2 rounded-full hover:bg-primary-100 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary-800 mb-2 font-display">
                  {selectedImage.title}
                </h3>
                <p className="text-primary-600 mb-4">by {selectedImage.designer}</p>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(selectedImage.rating) ? 'text-gold-500 fill-current' : 'text-primary-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-primary-600 ml-2">{selectedImage.rating}</span>
                </div>
                <p className="text-primary-600 mb-6">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-1 mb-6">
                  {selectedImage.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-5 h-5 text-primary-500" />
                      <span className="text-primary-600">{selectedImage.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-5 h-5 text-primary-500" />
                      <span className="text-primary-600">{selectedImage.views} views</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300">
                      Contact Designer
                    </button>
                    <button className="border border-primary-300 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-100 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;