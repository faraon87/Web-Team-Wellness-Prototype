import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';

// Firebase configuration - will use environment variables or demo config
const getFirebaseConfig = () => {
  // Check if we have real Firebase config in environment variables
  if (process.env.REACT_APP_FIREBASE_API_KEY && 
      process.env.REACT_APP_FIREBASE_API_KEY !== 'your-firebase-api-key-here') {
    return {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };
  }
  
  // Demo config for development/testing
  return {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "demo-app-id"
  };
};

class AuthService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.authStateListeners = [];
    this.isInitialized = false;
    this.isDemoMode = false;
  }

  async init() {
    try {
      const config = getFirebaseConfig();
      
      // Check if we're in demo mode
      if (config.apiKey === "demo-api-key") {
        this.isDemoMode = true;
        console.log("🔧 Running in DEMO MODE - Firebase not configured");
        console.log("💡 To enable real authentication, set up your .env file with Firebase credentials");
        return;
      }

      // Initialize Firebase
      this.app = initializeApp(config);
      this.auth = getAuth(this.app);
      
      // Set up auth state listener
      onAuthStateChanged(this.auth, (user) => {
        this.authStateListeners.forEach(listener => listener(user));
      });
      
      this.isInitialized = true;
      console.log("✅ Firebase initialized successfully");
      console.log(`🔗 Connected to project: ${config.projectId}`);
      console.log("🌐 Auth domain:", config.authDomain);
      
      // Check if we're connected to real Firebase
      if (config.apiKey && config.apiKey.length > 20) {
        console.log("🎉 Real Firebase configuration detected!");
        console.log("📱 SSO providers should be functional");
      }
      
    } catch (error) {
      console.error("❌ Firebase initialization failed:", error);
      this.isDemoMode = true;
      console.log("🔄 Falling back to demo mode");
      throw new Error('Failed to initialize Firebase');
    }
  }

  addAuthStateListener(listener) {
    this.authStateListeners.push(listener);
  }

  removeAuthStateListener(listener) {
    this.authStateListeners = this.authStateListeners.filter(l => l !== listener);
  }

  async signInWithGoogle() {
    if (this.isDemoMode) {
      // Demo mode - simulate successful Google sign in
      const demoUser = {
        uid: 'demo-user-id',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: 'https://via.placeholder.com/150',
        providerId: 'google.com'
      };
      
      // Notify listeners
      this.authStateListeners.forEach(listener => listener(demoUser));
      
      return {
        success: true,
        user: demoUser,
        message: 'Demo mode: Google sign in simulated'
      };
    }

    if (!this.auth) {
      return {
        success: false,
        message: 'Firebase not initialized'
      };
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      
      return {
        success: true,
        user: result.user,
        message: 'Successfully signed in with Google'
      };
    } catch (error) {
      console.error('Google sign in error:', error);
      
      let message = 'Failed to sign in with Google';
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign in was cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Pop-up was blocked. Please allow pop-ups for this site.';
      } else if (error.code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized for Google sign in.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  async signInWithApple() {
    if (this.isDemoMode) {
      // Demo mode - simulate successful Apple sign in
      const demoUser = {
        uid: 'demo-apple-user-id',
        displayName: 'Demo Apple User',
        email: 'demo.apple@example.com',
        photoURL: 'https://via.placeholder.com/150',
        providerId: 'apple.com'
      };
      
      this.authStateListeners.forEach(listener => listener(demoUser));
      
      return {
        success: true,
        user: demoUser,
        message: 'Demo mode: Apple sign in simulated'
      };
    }

    if (!this.auth) {
      return {
        success: false,
        message: 'Firebase not initialized'
      };
    }

    try {
      const provider = new OAuthProvider('apple.com');
      
      // Configure Apple provider with additional scopes if needed
      provider.addScope('email');
      provider.addScope('name');
      
      // Set custom parameters for Apple Sign in
      provider.setCustomParameters({
        // You can add custom parameters here if needed
      });
      
      const result = await signInWithPopup(this.auth, provider);
      
      return {
        success: true,
        user: result.user,
        message: 'Successfully signed in with Apple'
      };
    } catch (error) {
      console.error('Apple sign in error:', error);
      
      let message = 'Failed to sign in with Apple';
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign in was cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Pop-up was blocked. Please allow pop-ups for this site.';
      } else if (error.code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized for Apple sign in. Please configure your domain in Firebase Console.';
      } else if (error.code === 'auth/operation-not-allowed') {
        message = 'Apple sign in is not enabled. Please enable it in Firebase Console → Authentication → Sign-in methods.';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Apple sign in configuration is invalid. Please check your Apple Developer settings.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  async signInWithX() {
    if (this.isDemoMode) {
      // Demo mode - simulate successful X/Twitter sign in
      const demoUser = {
        uid: 'demo-x-user-id',
        displayName: 'Demo X User',
        email: 'demo.x@example.com',
        photoURL: 'https://via.placeholder.com/150',
        providerId: 'twitter.com'
      };
      
      this.authStateListeners.forEach(listener => listener(demoUser));
      
      return {
        success: true,
        user: demoUser,
        message: 'Demo mode: X/Twitter sign in simulated'
      };
    }

    if (!this.auth) {
      return {
        success: false,
        message: 'Firebase not initialized'
      };
    }

    try {
      const provider = new TwitterAuthProvider();
      
      // Configure Twitter provider with additional scopes if needed
      provider.addScope('email');
      
      // Set custom parameters for Twitter/X sign in
      provider.setCustomParameters({
        // You can add custom parameters here if needed
      });
      
      const result = await signInWithPopup(this.auth, provider);
      
      return {
        success: true,
        user: result.user,
        message: 'Successfully signed in with X'
      };
    } catch (error) {
      console.error('X/Twitter sign in error:', error);
      
      let message = 'Failed to sign in with X';
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign in was cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        message = 'Pop-up was blocked. Please allow pop-ups for this site.';
      } else if (error.code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized for X sign in. Please configure your domain in Firebase Console.';
      } else if (error.code === 'auth/operation-not-allowed') {
        message = 'X/Twitter sign in is not enabled. Please enable it in Firebase Console → Authentication → Sign-in methods.';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'X/Twitter sign in configuration is invalid. Please check your Twitter Developer settings.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'An account already exists with the same email address but different sign-in credentials.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  async signOut() {
    if (this.isDemoMode) {
      // Demo mode - simulate sign out
      this.authStateListeners.forEach(listener => listener(null));
      
      return {
        success: true,
        message: 'Demo mode: Sign out simulated'
      };
    }

    if (!this.auth) {
      return {
        success: false,
        message: 'Firebase not initialized'
      };
    }

    try {
      await firebaseSignOut(this.auth);
      
      return {
        success: true,
        message: 'Successfully signed out'
      };
    } catch (error) {
      console.error('Sign out error:', error);
      
      return {
        success: false,
        message: 'Failed to sign out'
      };
    }
  }

  getCurrentUser() {
    if (this.isDemoMode) {
      return null; // Demo mode doesn't persist user state
    }
    
    return this.auth ? this.auth.currentUser : null;
  }

  isDemoModeActive() {
    return this.isDemoMode;
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService; 