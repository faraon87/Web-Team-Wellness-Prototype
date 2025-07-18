import { useState, useEffect } from 'react';
import authService from './authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize auth service and listen for auth state changes
    const initAuth = async () => {
      try {
        await authService.init();
        setLoading(false);
      } catch (error) {
        setError('Failed to initialize authentication');
        setLoading(false);
      }
    };

    initAuth();

    // Add listener for auth state changes
    const handleAuthStateChange = (user) => {
      setUser(user);
      setError(null);
    };

    authService.addAuthStateListener(handleAuthStateChange);

    // Cleanup listener on unmount
    return () => {
      authService.removeAuthStateListener(handleAuthStateChange);
    };
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    const result = await authService.signInWithGoogle();
    if (!result.success) {
      setError(result.message);
    }
    return result;
  };

  const signInWithApple = async () => {
    setError(null);
    const result = await authService.signInWithApple();
    if (!result.success) {
      setError(result.message);
    }
    return result;
  };

  const signInWithX = async () => {
    setError(null);
    const result = await authService.signInWithX();
    if (!result.success) {
      setError(result.message);
    }
    return result;
  };

  const signOut = async () => {
    setError(null);
    const result = await authService.signOut();
    if (!result.success) {
      setError(result.message);
    }
    return result;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithApple,
    signInWithX,
    signOut,
    clearError
  };
};