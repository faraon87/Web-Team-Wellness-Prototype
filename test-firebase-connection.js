// Test Firebase Connection and Authentication
// This script will help verify your Firebase setup

console.log('🔥 Testing Firebase Connection...\n');

// Check if environment variables are set
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

console.log('📋 Environment Variables Check:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== 'your-firebase-api-key-here' && !value.includes('demo')) {
    console.log(`✅ ${varName}: Set (${value.substring(0, 10)}...)`);
  } else {
    console.log(`❌ ${varName}: Not set or using demo values`);
  }
});

console.log('\n🔧 To test the authentication:');
console.log('1. Open http://localhost:3000 in your browser');
console.log('2. Open browser developer tools (F12)');
console.log('3. Go to Console tab');
console.log('4. Look for Firebase initialization messages');
console.log('5. Try clicking the SSO buttons');

console.log('\n📱 Expected Behavior:');
console.log('- Google SSO: Should open Google OAuth popup');
console.log('- Apple SSO: Should open Apple Sign in popup');
console.log('- X/Twitter SSO: Should open Twitter OAuth popup');
console.log('- No "demo mode" messages in console');
console.log('- Firebase connection success messages');

console.log('\n🚨 If you see issues:');
console.log('- Check Firebase Console → Authentication → Sign-in methods');
console.log('- Verify all providers are enabled');
console.log('- Check authorized domains include localhost');
console.log('- Ensure .env file has correct Firebase config');

console.log('\n🎯 Next Steps:');
console.log('1. Test each SSO provider in browser');
console.log('2. Verify user profiles display after sign in');
console.log('3. Test sign out functionality');
console.log('4. Check mobile responsiveness');
console.log('5. Deploy to production when ready'); 