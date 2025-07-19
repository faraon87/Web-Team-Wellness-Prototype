import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Users, User, Settings } from 'lucide-react';

const Navigation = ({ user }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/wellness', icon: Heart, label: 'Wellness' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  if (!user) return null; // Don't show navigation if user is not logged in

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive 
                  ? 'text-teal-600' 
                  : 'text-gray-500 hover:text-teal-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-1 bg-teal-600 rounded-t-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation; 