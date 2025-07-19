import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

// Import components
import Navigation from './components/Navigation';
import LandingScreen from './components/screens/LandingScreen';
import HomeScreen from './components/screens/HomeScreen';
import WellnessScreen from './components/screens/WellnessScreen';
import TeamScreen from './components/screens/TeamScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import SettingsScreen from './components/screens/SettingsScreen';

const App = () => {
  const { user, signInWithGoogle, signInWithApple, signInWithX, signOut, isDemoMode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Handle SSO Sign In
  const handleSSOSignIn = async (provider) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'apple':
          result = await signInWithApple();
          break;
        case 'x':
          result = await signInWithX();
          break;
        default:
          throw new Error('Unknown provider');
      }
      
      if (result.success) {
        // Successfully signed in - user will be redirected to home
        console.log(`Welcome ${result.user.displayName || result.user.email}!`);
      } else {
        setAuthError(result.message);
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      setAuthError('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing/Auth Route */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/home" replace />
              ) : (
                <LandingScreen
                  user={user}
                  onSSOSignIn={handleSSOSignIn}
                  onSignOut={handleSignOut}
                  isLoading={isLoading}
                  authError={authError}
                  setAuthError={setAuthError}
                  isDemoMode={isDemoMode}
                />
              )
            } 
          />

          {/* Protected App Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomeScreen user={user} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/wellness" 
            element={
              <ProtectedRoute>
                <WellnessScreen />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/team" 
            element={
              <ProtectedRoute>
                <TeamScreen />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfileScreen user={user} onSignOut={handleSignOut} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsScreen />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route - redirect to home if authenticated, landing if not */}
          <Route 
            path="*" 
            element={
              user ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
            } 
          />
        </Routes>

        {/* Bottom Navigation - only show when user is authenticated */}
        {user && <Navigation user={user} />}
      </div>
    </Router>
  );
};

export default App;
