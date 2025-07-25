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
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = [
    {
      id: 1,
      consultant: 'Sarah Mitchell',
      date: '2025-01-15',
      time: '2:00 PM',
      type: 'Initial Consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      consultant: 'Michael Chen',
      date: '2025-01-18',
      time: '10:00 AM',
      type: 'Design Review',
      status: 'pending'
    },
    {
      id: 3,
      consultant: 'Emma Davis',
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
      consultant: 'Sarah Mitchell',
      progress: 75,
      status: 'In Progress',
      dueDate: '2025-02-15',
      budget: '$5,000'
    },
    {
      id: 2,
      name: 'Kitchen Renovation',
      consultant: 'Michael Chen',
      progress: 45,
      status: 'Planning',
      dueDate: '2025-03-01',
      budget: '$12,000'
    },
    {
      id: 3,
      name: 'Home Office Setup',
      consultant: 'Emma Davis',
      progress: 90,
      status: 'Near Completion',
      dueDate: '2025-01-30',
      budget: '$3,500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'message',
      content: 'New message from Sarah Mitchell',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'appointment',
      content: 'Appointment confirmed for Jan 18',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'project',
      content: 'Living Room project updated',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'review',
      content: 'You left a review for Emma Davis',
      time: '3 days ago'
    }
  ];

  const stats = [
    { label: 'Active Projects', value: '3', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Completed Projects', value: '12', icon: Star, color: 'text-green-600' },
    { label: 'Total Spent', value: '$24.5K', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Consultations', value: '18', icon: MessageSquare, color: 'text-orange-600' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Planning': return 'text-purple-600 bg-purple-50';
      case 'Near Completion': return 'text-green-600 bg-green-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-neutral-600">
                  Manage your interior design projects and consultations
                </p>
              </div>
            </div>
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-neutral-500 hover:text-neutral-700'
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
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-800">Upcoming Appointments</h3>
                  <Calendar className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <div className="font-medium text-neutral-800">{appointment.consultant}</div>
                        <div className="text-sm text-neutral-600">{appointment.type}</div>
                        <div className="text-sm text-neutral-500">
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
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-neutral-800">Recent Activity</h3>
                  <Bell className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-800">{activity.content}</p>
                        <p className="text-xs text-neutral-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-800">Active Projects</h3>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                New Project
              </button>
            </div>
            <div className="space-y-6">
              {activeProjects.map((project) => (
                <div key={project.id} className="border border-neutral-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-800">{project.name}</h4>
                      <p className="text-sm text-neutral-600">with {project.consultant}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Due: {project.dueDate}</span>
                    <span>Budget: {project.budget}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-800">All Appointments</h3>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                Schedule New
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-800">{appointment.consultant}</h4>
                      <p className="text-sm text-neutral-600">{appointment.type}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-neutral-500">
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
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6">Messages</h3>
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-neutral-600 mb-2">No messages yet</h4>
              <p className="text-neutral-500">Your conversations with designers will appear here</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;