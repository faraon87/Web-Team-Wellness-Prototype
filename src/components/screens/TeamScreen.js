import React, { useState } from 'react';
import { Users, Trophy, MessageCircle, Plus, Heart } from 'lucide-react';

const TeamScreen = () => {
  const [activeTab, setActiveTab] = useState('members');

  // Mock team data
  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Team Lead', wellnessScore: 92, streak: 15, avatar: null },
    { id: 2, name: 'Mike Chen', role: 'Developer', wellnessScore: 88, streak: 8, avatar: null },
    { id: 3, name: 'Emma Davis', role: 'Designer', wellnessScore: 95, streak: 22, avatar: null },
    { id: 4, name: 'Alex Rodriguez', role: 'Product Manager', wellnessScore: 85, streak: 12, avatar: null },
    { id: 5, name: 'Lisa Wang', role: 'Marketing', wellnessScore: 90, streak: 18, avatar: null },
  ];

  const teamChallenges = [
    { id: 1, title: 'Daily Breathing Challenge', description: 'Complete 5 minutes of breathing exercises daily', progress: 80, participants: 12, daysLeft: 3 },
    { id: 2, title: 'Wellness Streak', description: 'Maintain a 7-day wellness streak', progress: 65, participants: 8, daysLeft: 5 },
    { id: 3, title: 'Team Meditation', description: 'Group meditation session', progress: 45, participants: 15, daysLeft: 1 },
  ];

  const teamStats = {
    totalMembers: 12,
    averageWellnessScore: 89,
    activeChallenges: 3,
    totalBreathingSessions: 156,
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-teal-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Wellness</h1>
        <p className="text-gray-600">Collaborate and grow together</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Team Stats */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{teamStats.totalMembers}</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{teamStats.averageWellnessScore}%</div>
              <div className="text-sm text-gray-600">Avg. Wellness Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.activeChallenges}</div>
              <div className="text-sm text-gray-600">Active Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{teamStats.totalBreathingSessions}</div>
              <div className="text-sm text-gray-600">Sessions This Week</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex space-x-2">
            <TabButton id="members" label="Members" icon={Users} />
            <TabButton id="challenges" label="Challenges" icon={Trophy} />
            <TabButton id="chat" label="Chat" icon={MessageCircle} />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Team Members</h3>
              <button className="bg-teal-500 text-white px-3 py-1 rounded-lg flex items-center space-x-1 hover:bg-teal-600 transition-colors">
                <Plus size={16} />
                <span>Invite</span>
              </button>
            </div>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Heart className="text-red-500" size={16} />
                      <span className="font-semibold text-gray-800">{member.wellnessScore}%</span>
                    </div>
                    <div className="text-sm text-gray-600">{member.streak} day streak</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Challenges</h3>
              <button className="bg-teal-500 text-white px-3 py-1 rounded-lg flex items-center space-x-1 hover:bg-teal-600 transition-colors">
                <Plus size={16} />
                <span>Create</span>
              </button>
            </div>
            <div className="space-y-4">
              {teamChallenges.map((challenge) => (
                <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                    <span className="text-sm text-gray-500">{challenge.daysLeft} days left</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{challenge.participants} participants</span>
                      <button className="text-teal-600 hover:text-teal-800 font-medium">
                        Join Challenge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Chat</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-semibold text-sm">SJ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-700">Just completed my breathing session! Feeling much more focused for the afternoon. Anyone else want to join the 4-7-8 challenge?</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">MC</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">Mike Chen</span>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-gray-700">Count me in! The box breathing technique has been amazing for my concentration during coding sessions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamScreen; 