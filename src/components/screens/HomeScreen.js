import React from 'react';
import { Heart, Users, TrendingUp, Calendar } from 'lucide-react';

const HomeScreen = ({ user }) => {
  const wellnessStats = {
    streak: 7,
    teamMembers: 12,
    weeklyProgress: 85,
    nextSession: '2:30 PM'
  };

  const quickActions = [
    { icon: Heart, label: 'Start Breathing', color: 'bg-teal-500', path: '/wellness' },
    { icon: Users, label: 'Team Check-in', color: 'bg-blue-500', path: '/team' },
    { icon: TrendingUp, label: 'View Progress', color: 'bg-green-500', path: '/profile' },
    { icon: Calendar, label: 'Schedule', color: 'bg-purple-500', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
            <p className="text-gray-600">{user?.displayName || user?.email}</p>
          </div>
          {user?.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-12 h-12 rounded-full"
            />
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Wellness Stats</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-teal-600">{wellnessStats.streak} days</p>
              </div>
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Heart className="text-teal-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-blue-600">{wellnessStats.teamMembers}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Progress</p>
                <p className="text-2xl font-bold text-green-600">{wellnessStats.weeklyProgress}%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Session</p>
                <p className="text-lg font-bold text-purple-600">{wellnessStats.nextSession}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`${action.color} text-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon size={24} />
                  <span className="font-medium">{action.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 