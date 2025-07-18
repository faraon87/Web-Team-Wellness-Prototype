import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, twitterProvider, appleProvider, isFirebaseEnabled } from './firebase';

class AuthService {
  constructor() {
    this.user = null;
    this.listeners = [];
    this.demoMode = !isFirebaseEnabled;
  }

  // Initialize auth state listener
  init() {
    return new Promise((resolve) => {
      if (this.demoMode) {
        console.log('Running in demo mode - Firebase not configured');
        resolve(null);
        return;
      }

      if (!auth) {
        console.error('Firebase auth not initialized');
        resolve(null);
        return;
      }

      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.notifyListeners(user);
        resolve(user);
      });
    });
  }

  // Demo mode simulation
  simulateAuthResult(provider) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'demo-mode',
          message: `Demo mode: ${provider} authentication requires Firebase setup. Please follow the setup guide in FIREBASE_SETUP.md`
        });
      }, 1000);
    });
  }

  // Google Sign In
  async signInWithGoogle() {
    if (this.demoMode) {
      return this.simulateAuthResult('Google');
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: result.user,
        message: 'Successfully signed in with Google'
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // Apple Sign In
  async signInWithApple() {
    if (this.demoMode) {
      return this.simulateAuthResult('Apple');
    }

    try {
      const result = await signInWithPopup(auth, appleProvider);
      return {
        success: true,
        user: result.user,
        message: 'Successfully signed in with Apple'
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // X (Twitter) Sign In
  async signInWithX() {
    if (this.demoMode) {
      return this.simulateAuthResult('X');
    }

    try {
      const result = await signInWithPopup(auth, twitterProvider);
      return {
        success: true,
        user: result.user,
        message: 'Successfully signed in with X'
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // Sign Out
  async signOut() {
    if (this.demoMode) {
      return {
        success: true,
        message: 'Demo mode: Sign out simulated'
      };
    }

    try {
      await signOut(auth);
      return {
        success: true,
        message: 'Successfully signed out'
      };
    } catch (error) {
      return {
        success: false,
        error: error.code,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Add auth state listener
  addAuthStateListener(callback) {
    this.listeners.push(callback);
  }

  // Remove auth state listener
  removeAuthStateListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners
  notifyListeners(user) {
    this.listeners.forEach(callback => callback(user));
  }

  // Get user-friendly error messages
  getErrorMessage(errorCode) {
    if (errorCode === 'demo-mode') {
      return 'Demo mode: Please set up Firebase configuration to enable authentication';
    }

    const errorMessages = {
      'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
      'auth/popup-blocked': 'Pop-up was blocked. Please allow pop-ups and try again.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
      'auth/network-request-failed': 'Network error. Please check your connection and try again.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/user-disabled': 'This account has been disabled. Please contact support.',
      'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
      'auth/invalid-credential': 'Invalid credentials. Please try again.',
      'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials.',
      'auth/credential-already-in-use': 'This credential is already associated with a different user account.',
      'auth/unauthorized-domain': 'This domain is not authorized for OAuth operations.',
      'auth/web-storage-unsupported': 'This browser does not support web storage or is running in private mode.',
      'auth/invalid-api-key': 'Firebase configuration is invalid. Please check your API key.'
    };

    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  }
}

export const authService = new AuthService();
export default authService;