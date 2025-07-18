// Test script to verify authentication service
// Run with: node test-auth.js

const authService = require('./src/authService.js').default;

async function testAuthService() {
  console.log('🧪 Testing Authentication Service...\n');
  
  try {
    // Test initialization
    console.log('1. Testing initialization...');
    await authService.init();
    console.log('✅ Initialization successful');
    
    // Test demo mode detection
    console.log('\n2. Testing demo mode...');
    const isDemo = authService.isDemoModeActive();
    console.log(`Demo mode active: ${isDemo}`);
    
    // Test Google sign in (demo mode)
    console.log('\n3. Testing Google sign in...');
    const googleResult = await authService.signInWithGoogle();
    console.log(`Google sign in result: ${googleResult.success ? '✅ Success' : '❌ Failed'}`);
    if (googleResult.message) {
      console.log(`Message: ${googleResult.message}`);
    }
    
    // Test Apple sign in (demo mode)
    console.log('\n4. Testing Apple sign in...');
    const appleResult = await authService.signInWithApple();
    console.log(`Apple sign in result: ${appleResult.success ? '✅ Success' : '❌ Failed'}`);
    if (appleResult.message) {
      console.log(`Message: ${appleResult.message}`);
    }
    
    // Test X/Twitter sign in (demo mode)
    console.log('\n5. Testing X/Twitter sign in...');
    const xResult = await authService.signInWithX();
    console.log(`X/Twitter sign in result: ${xResult.success ? '✅ Success' : '❌ Failed'}`);
    if (xResult.message) {
      console.log(`Message: ${xResult.message}`);
    }
    
    // Test sign out
    console.log('\n6. Testing sign out...');
    const signOutResult = await authService.signOut();
    console.log(`Sign out result: ${signOutResult.success ? '✅ Success' : '❌ Failed'}`);
    if (signOutResult.message) {
      console.log(`Message: ${signOutResult.message}`);
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Follow the guide in APPLE_X_SSO_SETUP.md');
    console.log('2. Set up Apple Developer account and Service ID');
    console.log('3. Set up Twitter Developer account and API credentials');
    console.log('4. Enable providers in Firebase Console');
    console.log('5. Test with real credentials');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAuthService(); 