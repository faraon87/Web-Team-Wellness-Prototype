import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const WellnessScreen = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionTime] = useState(300); // 5 minutes default
  const [breathCount, setBreathCount] = useState(0);

  const breathingPatterns = [
    { name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8, description: 'Calming technique for stress relief' },
    { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, hold2: 4, description: 'Improves focus and concentration' },
    { name: 'Deep Breathing', inhale: 6, hold: 2, exhale: 8, description: 'Relaxation and mindfulness' },
  ];

  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);

  useEffect(() => {
    let interval;
    if (isBreathing && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, timeLeft]);

  useEffect(() => {
    let breathInterval;
    if (isBreathing) {
      const cycle = selectedPattern.inhale + (selectedPattern.hold || 0) + selectedPattern.exhale + (selectedPattern.hold2 || 0);
      let phaseTime = 0;
      
      breathInterval = setInterval(() => {
        phaseTime++;
        
        if (phaseTime <= selectedPattern.inhale) {
          setBreathPhase('inhale');
        } else if (phaseTime <= selectedPattern.inhale + (selectedPattern.hold || 0)) {
          setBreathPhase('hold');
        } else if (phaseTime <= selectedPattern.inhale + (selectedPattern.hold || 0) + selectedPattern.exhale) {
          setBreathPhase('exhale');
        } else if (phaseTime <= cycle) {
          setBreathPhase('hold2');
        } else {
          phaseTime = 0;
          setBreathCount(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(breathInterval);
  }, [isBreathing, selectedPattern]);

  const startBreathing = () => {
    setIsBreathing(true);
    setTimeLeft(sessionTime);
    setBreathCount(0);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setBreathPhase('inhale');
  };

  const resetSession = () => {
    setIsBreathing(false);
    setTimeLeft(0);
    setBreathCount(0);
    setBreathPhase('inhale');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathPhaseColor = () => {
    switch (breathPhase) {
      case 'inhale': return 'bg-green-500';
      case 'hold': return 'bg-yellow-500';
      case 'exhale': return 'bg-red-500';
      case 'hold2': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getBreathPhaseText = () => {
    switch (breathPhase) {
      case 'inhale': return 'Inhale';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold2': return 'Hold';
      default: return 'Ready';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800">Wellness Center</h1>
        <p className="text-gray-600">Restore your aura one breath at a time</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Breathing Pattern Selector */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Breathing Pattern</h2>
          <div className="space-y-2">
            {breathingPatterns.map((pattern, index) => (
              <button
                key={index}
                onClick={() => setSelectedPattern(pattern)}
                className={`w-full p-3 rounded-lg border-2 transition-colors ${
                  selectedPattern.name === pattern.name
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">{pattern.name}</h3>
                  <p className="text-sm text-gray-600">{pattern.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Breathing Circle */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-48 h-48 rounded-full ${getBreathPhaseColor()} flex items-center justify-center transition-all duration-1000 ${
              isBreathing ? 'scale-110' : 'scale-100'
            }`}>
              <div className="text-white text-center">
                <div className="text-2xl font-bold">{getBreathPhaseText()}</div>
                <div className="text-sm opacity-90">
                  {isBreathing ? `${selectedPattern[breathPhase] || 0}s` : 'Ready'}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{breathCount}</div>
              <div className="text-sm text-gray-600">Breaths completed</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-center space-x-4">
            {!isBreathing ? (
              <button
                onClick={startBreathing}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-teal-600 transition-colors"
              >
                <Play size={20} />
                <span>Start Session</span>
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors"
              >
                <Pause size={20} />
                <span>Pause</span>
              </button>
            )}
            
            <button
              onClick={resetSession}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Session Timer */}
        {isBreathing && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="text-gray-600" size={20} />
                <span className="text-lg font-semibold text-gray-800">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Wellness Tips */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Wellness Tips</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Practice breathing exercises daily for best results</p>
            <p>• Find a quiet, comfortable space</p>
            <p>• Focus on the rhythm of your breath</p>
            <p>• Start with shorter sessions and gradually increase</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessScreen; 