import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-400', change: '+12%' },
    { label: 'Active Projects', value: '89', icon: Briefcase, color: 'text-green-400', change: '+8%' },
    { label: 'Revenue', value: '$124.5K', icon: DollarSign, color: 'text-gold-500', change: '+15%' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-purple-400', change: '+0.2' }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Modern Living Room',
      client: 'Sarah Johnson',
      designer: 'Emma Davis',
      status: 'In Progress',
      budget: '$15,000',
      completion: 75,
      startDate: '2025-01-10'
    },
    {
      id: 2,
      name: 'Office Renovation',
      client: 'Tech Corp',
      designer: 'Michael Chen',
      status: 'Planning',
      budget: '$45,000',
      completion: 25,
      startDate: '2025-01-15'
    },
    {
      id: 3,
      name: 'Kitchen Redesign',
      client: 'David Park',
      designer: 'Lisa Thompson',
      status: 'Completed',
      budget: '$28,000',
      completion: 100,
      startDate: '2024-12-01'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Client',
      joinDate: '2024-12-15',
      projects: 3,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'Designer',
      joinDate: '2024-11-20',
      projects: 12,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'Designer',
      joinDate: '2024-10-05',
      projects: 18,
      status: 'Active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-400 bg-green-900/20';
      case 'In Progress': return 'text-blue-400 bg-blue-900/20';
      case 'Planning': return 'text-yellow-400 bg-yellow-900/20';
      case 'Active': return 'text-green-400 bg-green-900/20';
      default: return 'text-primary-400 bg-primary-900/20';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ];

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass-effect rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-dark-50" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-primary-800">
                  Admin Dashboard
                </h1>
                <p className="text-primary-600">
                  Welcome back, {user?.name}! Here's what's happening today.
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
                        <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
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
              {/* Recent Projects */}
              <div className="glass-effect p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-primary-800 font-display">Recent Projects</h3>
                  <Calendar className="w-5 h-5 text-primary-400" />
                </div>
                <div className="space-y-4">
                  {recentProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-primary-100 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-primary-800">{project.name}</div>
                        <div className="text-sm text-primary-600">Client: {project.client}</div>
                        <div className="text-sm text-primary-500">Designer: {project.designer}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <div className="text-sm text-primary-600 mt-1">{project.budget}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-primary-800 font-display mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-primary-100 rounded-lg hover:bg-primary-200 transition-colors text-left">
                    <Users className="w-6 h-6 text-gold-500 mb-2" />
                    <div className="font-medium text-primary-800">Manage Users</div>
                    <div className="text-sm text-primary-600">Add or edit users</div>
                  </button>
                  <button className="p-4 bg-primary-100 rounded-lg hover:bg-primary-200 transition-colors text-left">
                    <Briefcase className="w-6 h-6 text-gold-500 mb-2" />
                    <div className="font-medium text-primary-800">New Project</div>
                    <div className="text-sm text-primary-600">Create project</div>
                  </button>
                  <button className="p-4 bg-primary-100 rounded-lg hover:bg-primary-200 transition-colors text-left">
                    <BarChart3 className="w-6 h-6 text-gold-500 mb-2" />
                    <div className="font-medium text-primary-800">View Reports</div>
                    <div className="text-sm text-primary-600">Analytics & insights</div>
                  </button>
                  <button className="p-4 bg-primary-100 rounded-lg hover:bg-primary-200 transition-colors text-left">
                    <Star className="w-6 h-6 text-gold-500 mb-2" />
                    <div className="font-medium text-primary-800">Reviews</div>
                    <div className="text-sm text-primary-600">Manage feedback</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-800 font-display">All Projects</h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-primary-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-primary-100 text-primary-800"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-primary-300 rounded-lg hover:bg-primary-100 transition-colors text-primary-600">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary-200">
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Project</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Client</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Designer</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Budget</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Progress</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="border-b border-primary-200 hover:bg-primary-100 transition-colors">
                      <td className="py-3 px-4 text-primary-800">{project.name}</td>
                      <td className="py-3 px-4 text-primary-600">{project.client}</td>
                      <td className="py-3 px-4 text-primary-600">{project.designer}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-primary-600">{project.budget}</td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-primary-200 rounded-full h-2">
                          <div 
                            className="bg-gold-500 h-2 rounded-full" 
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-primary-600">{project.completion}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-gold-500 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-primary-600 hover:text-gold-500 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-800 font-display">User Management</h3>
              <button className="bg-gradient-to-r from-gold-500 to-gold-700 text-dark-50 px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-gold-800 transition-all duration-300">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary-200">
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Projects</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-primary-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-primary-200 hover:bg-primary-100 transition-colors">
                      <td className="py-3 px-4 text-primary-800">{user.name}</td>
                      <td className="py-3 px-4 text-primary-600">{user.email}</td>
                      <td className="py-3 px-4 text-primary-600">{user.role}</td>
                      <td className="py-3 px-4 text-primary-600">{user.joinDate}</td>
                      <td className="py-3 px-4 text-primary-600">{user.projects}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-gold-500 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-primary-600 hover:text-gold-500 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-primary-800 font-display mb-6">Revenue Analytics</h3>
                <div className="h-64 flex items-center justify-center bg-primary-100 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                    <p className="text-primary-600">Revenue chart would go here</p>
                  </div>
                </div>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-primary-800 font-display mb-6">Project Distribution</h3>
                <div className="h-64 flex items-center justify-center bg-primary-100 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                    <p className="text-primary-600">Project distribution chart would go here</p>
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

export default AdminDashboard;