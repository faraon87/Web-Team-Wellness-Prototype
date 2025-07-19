import React, { useState } from 'react';
import { Bell, Sun, Volume2, Smartphone, Globe, Shield, HelpCircle, Info } from 'lucide-react';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    sound: true,
    autoStart: false,
    reminderTime: '09:00',
    sessionDuration: 5,
    language: 'English',
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          description: 'Receive reminders for breathing sessions',
          type: 'toggle',
        },
        {
          key: 'reminderTime',
          label: 'Daily Reminder Time',
          description: 'Time for daily wellness reminders',
          type: 'time',
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Sun,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Switch between light and dark themes',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Audio',
      icon: Volume2,
      settings: [
        {
          key: 'sound',
          label: 'Session Sounds',
          description: 'Play sounds during breathing sessions',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Session',
      icon: Smartphone,
      settings: [
        {
          key: 'autoStart',
          label: 'Auto-start Sessions',
          description: 'Automatically start breathing sessions',
          type: 'toggle',
        },
        {
          key: 'sessionDuration',
          label: 'Default Session Duration',
          description: 'Default length for breathing sessions',
          type: 'select',
          options: [
            { value: 3, label: '3 minutes' },
            { value: 5, label: '5 minutes' },
            { value: 10, label: '10 minutes' },
            { value: 15, label: '15 minutes' },
          ],
        },
      ],
    },
    {
      title: 'General',
      icon: Globe,
      settings: [
        {
          key: 'language',
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select',
          options: [
            { value: 'English', label: 'English' },
            { value: 'Spanish', label: 'Español' },
            { value: 'French', label: 'Français' },
            { value: 'German', label: 'Deutsch' },
          ],
        },
      ],
    },
  ];

  const infoSections = [
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Manage your data and privacy settings',
      action: 'View',
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      description: 'Get help and contact support',
      action: 'Contact',
    },
    {
      title: 'About Team Welly',
      icon: Info,
      description: 'Version 1.0.0 - Learn more about the app',
      action: 'Learn More',
    },
  ];

  const renderSetting = (setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-gray-800">{setting.label}</div>
              <div className="text-sm text-gray-600">{setting.description}</div>
            </div>
            <button
              onClick={() => handleSettingChange(setting.key, !settings[setting.key])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings[setting.key] ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        );
      
      case 'time':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-gray-800">{setting.label}</div>
              <div className="text-sm text-gray-600">{setting.description}</div>
            </div>
            <input
              type="time"
              value={settings[setting.key]}
              onChange={(e) => handleSettingChange(setting.key, e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        );
      
      case 'select':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-gray-800">{setting.label}</div>
              <div className="text-sm text-gray-600">{setting.description}</div>
            </div>
            <select
              value={settings[setting.key]}
              onChange={(e) => handleSettingChange(setting.key, e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {setting.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Customize your wellness experience</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Settings Groups */}
        {settingGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <group.icon className="text-teal-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">{group.title}</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {group.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="py-2">
                  {renderSetting(setting)}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Sections */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Information</h2>
          </div>
          <div className="p-4 space-y-4">
            {infoSections.map((section, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <section.icon className="text-teal-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{section.title}</div>
                    <div className="text-sm text-gray-600">{section.description}</div>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-800 font-medium">
                  {section.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Export/Import Data */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
          <div className="space-y-3">
            <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
              Export Wellness Data
            </button>
            <button className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors">
              Import Wellness Data
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500">
          Team Welly v1.0.0
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen; 