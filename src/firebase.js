import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, TwitterAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  const requiredEnvVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID'
  ];
  
  const isConfigured = requiredEnvVars.every(envVar => {
    const value = process.env[envVar];
    return value && value !== 'demo-api-key' && value !== 'team-welly-demo.firebaseapp.com' && value !== 'team-welly-demo';
  });
  
  if (!isConfigured) {
    console.log('Firebase not configured - missing environment variables:', requiredEnvVars.filter(envVar => {
      const value = process.env[envVar];
      return !value || value === 'demo-api-key' || value === 'team-welly-demo.firebaseapp.com' || value === 'team-welly-demo';
    }));
  }
  
  return isConfigured;
};

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if properly configured
let app = null;
let auth = null;
let analytics = null;
let googleProvider = null;
let twitterProvider = null;
let appleProvider = null;

export const isFirebaseEnabled = isFirebaseConfigured();

if (isFirebaseEnabled) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Auth
    auth = getAuth(app);
    
    // Initialize Analytics (optional)
    try {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    } catch (error) {
      console.log('Analytics not available (likely development environment)');
    }
    
    // Initialize Auth Providers
    googleProvider = new GoogleAuthProvider();
    twitterProvider = new TwitterAuthProvider();
    appleProvider = new OAuthProvider('apple.com');
    
    // Configure providers with environment variables
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    appleProvider.setCustomParameters({
      locale: 'en'
    });
    
    console.log('Firebase initialized successfully');
    console.log('Firebase Auth ready for mobile app integration');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.log('Firebase not configured - running in demo mode');
}

export { auth, analytics, googleProvider, twitterProvider, appleProvider };
export default app;