import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Briefcase, 
  Star, 
  Bell, 
  Settings,
  Plus,
  MessageSquare,
  FileText,
  TrendingUp,
  Heart,
  Eye,
  Download
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = [
    {
      id: 1,
      designer: 'Sarah Mitchell',
      date: '2025-01-15',
      time: '2:00 PM',
      type: 'Initial Consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      designer: 'Michael Chen',
      date: '2025-01-18',
      time: '10:00 AM',
      type: 'Design Review',
      status: 'pending'
    },
    {
      id: 3,
      designer: 'Emma Davis',
      date: '2025-01-22',
      time: '3:30 PM',
      type: 'Final Presentation',
      status: 'confirmed'
    }
  ];

  const activeProjects = [
    {
      id: 1,
      name: 'Living Room Redesign',
      designer: 'Sarah Mitchell',
      progress: 75,
      status: 'In Progress',
      dueDate: '2025-02-15',
      budget: '$5,000',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Kitchen Renovation',
      designer: 'Michael Chen',
      progress: 45,
      status: 'Planning',
      dueDate: '2025-03-01',
      budget: '$12,000',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Home Office Setup',
      designer: 'Emma Davis',
      progress: 90,
      status: 'Near Completion',
      dueDate: '2025-01-30',
      budget: '$3,500',
      image: 'https://images.pexels.com/photos/4458420/pexels-photo-4458420.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'message',
      content: 'New message from Sarah Mitchell',
      time: '2 hours ago',
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'appointment',
      content: 'Appointment confirmed for Jan 18',
      time: '1 day ago',
      icon: Calendar
    },
    {
      id: 3,
      type: 'project',
      content: 'Living Room project updated',
      time: '2 days ago',
      icon: Briefcase
    },
    {
      id: 4,
      type: 'review',
      content: 'You left a review for Emma Davis',
      time: '3 days ago',
      icon: Star
    }
  ];

  const favoriteDesigns = [
    {
      id: 1,
      title: 'Modern Minimalist Living Room',
      designer: 'Sarah Mitchell',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 124
    },
    {
      id: 2,
      title: 'Scandinavian Kitchen Design',
      designer: 'Michael Chen',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 89
    },
    {
      id: 3,
      title: 'Contemporary Office Space',
      designer: 'Emma Davis',
      image: 'https://images.pexels.com/photos/4458420/pexels-photo-4458420.jpeg?auto=compress&cs=tinysrgb&w=300',
      likes: 156
    }
  ];

  const stats = [
    { label: 'Active Projects', value: '3', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Completed Projects', value: '8', icon: Star, color: 'text-green-400' },
    { label: 'Total Spent', value: '$18.5K', icon: TrendingUp, color: 'text-gold-500' },
    { label: 'Saved Designs', value: '24', icon: Heart, color: 'text-red-400' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-900/20';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20';
      case 'In Progress': return 'text-blue-400 bg-blue-900/20';
      case 'Planning': return 'text-purple-400 bg-purple-900/20';
      case 'Near Completion': return 'text-green-400 bg-green-900/20';
      default: return 'text-primary-400 bg-primary-900/20';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'projects', label: 'My Projects', icon: Briefcase },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-dark-50" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-primary-800">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-primary-600">
                  Manage your interior design projects and discover new inspirations
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-6 py-3 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300 flex items-center space-x-2 glow-on-hover">
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="glass-effect rounded-xl mb-8">
          <div className="border-b border-primary-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-gold-500 text-gold-500'
                        : 'border-transparent text-primary-500 hover:text-primary-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass-effect p-6 rounded-xl glow-on-hover">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-primary-800">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-primary-100`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Appointments */}
              <div className="glass-effect p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-primary-800 font-display">Upcoming Appointments</h3>
                  <Calendar className="w-5 h-5 text-primary-400" />
                </div>
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-primary-100 rounded-lg">
                      <div>
                        <div className="font-medium text-primary-800">{appointment.designer}</div>
                        <div className="text-sm text-primary-600">{appointment.type}</div>
                        <div className="text-sm text-primary-500">
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-effect p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-primary-800 font-display">Recent Activity</h3>
                  <Bell className="w-5 h-5 text-primary-400" />
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-dark-50" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-primary-800">{activity.content}</p>
                          <p className="text-xs text-primary-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {activeProjects.map((project) => (
              <div key={project.id} className="glass-effect rounded-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-800 font-display">{project.name}</h3>
                        <p className="text-primary-600">with {project.designer}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-primary-600">Progress</span>
                        <span className="text-primary-800">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-primary-200 rounded-full h-2">
                        <div 
                          className="bg-gold-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-primary-600">
                        <span>Due: {project.dueDate}</span>
                        <span className="ml-4">Budget: {project.budget}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-primary-600 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="text-primary-600 hover:text-gold-500 transition-colors p-2 rounded-lg hover:bg-primary-100">
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

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-800 font-display">All Appointments</h3>
              <button className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300">
                Schedule New
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-primary-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-primary-800">{appointment.designer}</h4>
                      <p className="text-sm text-primary-600">{appointment.type}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-primary-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <button className="text-gold-500 hover:text-gold-400 text-sm font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDesigns.map((design) => (
              <div key={design.id} className="glass-effect rounded-xl overflow-hidden glow-on-hover">
                <div className="relative">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary-800 mb-1">{design.title}</h3>
                  <p className="text-sm text-primary-600 mb-2">by {design.designer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-primary-600">{design.likes}</span>
                    </div>
                    <button className="text-gold-500 hover:text-gold-400 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="glass-effect p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-primary-800 font-display mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-primary-100 text-primary-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-primary-100 text-primary-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-primary-100 text-primary-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Preferences
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 rounded bg-primary-100" />
                    <span className="ml-2 text-sm text-primary-600">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 rounded bg-primary-100" />
                    <span className="ml-2 text-sm text-primary-600">SMS notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-primary-300 rounded bg-primary-100" />
                    <span className="ml-2 text-sm text-primary-600">Marketing updates</span>
                  </label>
                </div>
              </div>
              <button className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-6 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;