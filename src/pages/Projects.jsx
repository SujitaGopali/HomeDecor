import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, User, Eye, Download, Share2 } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Modern Living Room Redesign',
      consultant: 'Sarah Mitchell',
      status: 'completed',
      startDate: '2024-08-15',
      endDate: '2024-10-30',
      budget: 5000,
      spent: 4750,
      description: 'Complete transformation of living room with modern furniture and color scheme.',
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      progress: 100
    },
    {
      id: 2,
      name: 'Kitchen Renovation',
      consultant: 'Michael Chen',
      status: 'in-progress',
      startDate: '2024-11-01',
      endDate: '2025-02-15',
      budget: 12000,
      spent: 6200,
      description: 'Full kitchen renovation with new cabinets, countertops, and appliances.',
      images: [
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      progress: 65
    },
    {
      id: 3,
      name: 'Home Office Setup',
      consultant: 'Emma Davis',
      status: 'in-progress',
      startDate: '2024-12-01',
      endDate: '2025-01-30',
      budget: 3500,
      spent: 2100,
      description: 'Creating a productive and inspiring home office space.',
      images: [
        'https://images.pexels.com/photos/4458420/pexels-photo-4458420.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      progress: 80
    },
    {
      id: 4,
      name: 'Master Bedroom Makeover',
      consultant: 'Lisa Thompson',
      status: 'planned',
      startDate: '2025-02-01',
      endDate: '2025-04-15',
      budget: 7500,
      spent: 0,
      description: 'Transforming the master bedroom into a serene retreat.',
      images: [
        'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      progress: 10
    },
    {
      id: 5,
      name: 'Dining Room Redesign',
      consultant: 'James Rodriguez',
      status: 'completed',
      startDate: '2024-06-01',
      endDate: '2024-08-30',
      budget: 8500,
      spent: 8200,
      description: 'Elegant dining room with custom furniture and lighting.',
      images: [
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      progress: 100
    },
    {
      id: 6,
      name: 'Bathroom Renovation',
      consultant: 'David Park',
      status: 'on-hold',
      startDate: '2024-10-15',
      endDate: '2025-01-30',
      budget: 9000,
      spent: 2500,
      description: 'Luxury bathroom renovation with modern fixtures.',
      images: [
        'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      progress: 25
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-purple-100 text-purple-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      case 'on-hold': return 'On Hold';
      default: return status;
    }
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.status === activeFilter;
  });

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
    { id: 'in-progress', label: 'In Progress', count: projects.filter(p => p.status === 'in-progress').length },
    { id: 'planned', label: 'Planned', count: projects.filter(p => p.status === 'planned').length },
    { id: 'on-hold', label: 'On Hold', count: projects.filter(p => p.status === 'on-hold').length }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">
            Your Design Projects
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Track the progress of your interior design projects and see your space transformations
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Project Images */}
              <div className="relative h-48 overflow-hidden">
                <div className="flex space-x-2">
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.name} ${index + 1}`}
                      className="w-full h-48 object-cover"
                      style={{ 
                        width: project.images.length === 1 ? '100%' : '50%',
                        minWidth: project.images.length === 1 ? '100%' : '50%'
                      }}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-neutral-600">
                      <User className="w-4 h-4" />
                      <span>{project.consultant}</span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Clock className="w-4 h-4" />
                    <span>{project.endDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <DollarSign className="w-4 h-4" />
                    <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="text-neutral-600">
                    <span className="font-medium">
                      {Math.round((project.spent / project.budget) * 100)}% of budget
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              No projects found
            </h3>
            <p className="text-neutral-600 mb-6">
              {activeFilter === 'all' 
                ? "You haven't started any projects yet. Get started by finding a consultant!"
                : `No ${activeFilter.replace('-', ' ')} projects found.`
              }
            </p>
            <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Start New Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;