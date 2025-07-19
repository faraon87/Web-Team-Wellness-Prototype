import React, { useState } from 'react';
import { User, Edit, LogOut } from 'lucide-react';

const ProfileScreen = ({ user, onSignOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    team: 'Engineering',
    role: 'Developer',
    wellnessGoal: 'Improve focus and reduce stress',
  });

  // Mock progress data
  const progressData = {
    currentStreak: 7,
    longestStreak: 15,
    totalSessions: 45,
    weeklyGoal: 5,
    weeklyCompleted: 4,
    monthlyProgress: 85,
  };

  const achievements = [
    { id: 1, title: 'First Breath', description: 'Completed your first breathing session', icon: '🌱', unlocked: true },
    { id: 2, title: 'Week Warrior', description: '7-day breathing streak', icon: '🔥', unlocked: true },
    { id: 3, title: 'Team Player', description: 'Participated in 5 team challenges', icon: '👥', unlocked: true },
    { id: 4, title: 'Zen Master', description: '30-day breathing streak', icon: '🧘', unlocked: false },
    { id: 5, title: 'Wellness Guru', description: 'Achieved 90% wellness score', icon: '⭐', unlocked: false },
  ];

  const weeklyStats = [
    { day: 'Mon', sessions: 2, goal: 1 },
    { day: 'Tue', sessions: 1, goal: 1 },
    { day: 'Wed', sessions: 3, goal: 1 },
    { day: 'Thu', sessions: 2, goal: 1 },
    { day: 'Fri', sessions: 1, goal: 1 },
    { day: 'Sat', sessions: 0, goal: 1 },
    { day: 'Sun', sessions: 1, goal: 1 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to Firebase
  };

  const handleSignOut = async () => {
    try {
      await onSignOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-1"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="text-teal-600" size={32} />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.displayName || 'User'}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-teal-600 hover:text-teal-800 transition-colors"
            >
              <Edit size={20} />
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                <input
                  type="text"
                  value={profileData.team}
                  onChange={(e) => setProfileData({...profileData, team: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wellness Goal</label>
                <textarea
                  value={profileData.wellnessGoal}
                  onChange={(e) => setProfileData({...profileData, wellnessGoal: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows="2"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Team:</strong> {profileData.team}</p>
              <p><strong>Role:</strong> {profileData.role}</p>
              <p><strong>Wellness Goal:</strong> {profileData.wellnessGoal}</p>
            </div>
          )}
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{progressData.currentStreak}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progressData.longestStreak}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{progressData.totalSessions}</div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{progressData.monthlyProgress}%</div>
              <div className="text-sm text-gray-600">Monthly Progress</div>
            </div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Goal</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Breathing Sessions</span>
            <span className="text-sm font-semibold text-gray-800">
              {progressData.weeklyCompleted}/{progressData.weeklyGoal}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progressData.weeklyCompleted / progressData.weeklyGoal) * 100}%` }}
            ></div>
          </div>
          
          {/* Weekly Chart */}
          <div className="mt-4 flex justify-between">
            {weeklyStats.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                <div className="w-6 h-6 bg-teal-100 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold text-teal-600">{day.sessions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 ${
                  achievement.unlocked
                    ? 'border-teal-200 bg-teal-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className="font-medium text-gray-800">{achievement.title}</div>
                    <div className="text-xs text-gray-600">{achievement.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen; 