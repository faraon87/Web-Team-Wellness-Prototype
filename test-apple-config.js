// Apple SSO Configuration Test
// This script helps verify your Apple SSO setup

console.log('🍎 Apple SSO Configuration Test\n');

console.log('📋 Required Apple Developer Credentials:');
console.log('1. Team ID (10-character code like ABC123DEF4)');
console.log('2. Service ID (like com.teamwelly.webapp)');
console.log('3. Private Key ID (from your .p8 file)');
console.log('4. Private Key (.p8 file content)\n');

console.log('🔧 Firebase Console Configuration:');
console.log('Go to: https://console.firebase.google.com/project/team-welly-mobile-app/authentication/providers');
console.log('Click on "Apple" provider and verify:\n');

console.log('✅ Service ID: [Your Apple Service ID]');
console.log('✅ Team ID: [Your Apple Team ID]');
console.log('✅ Private Key ID: [Your Apple Private Key ID]');
console.log('✅ Private Key: [Your .p8 file uploaded]\n');

console.log('🍎 Apple Developer Console Configuration:');
console.log('Go to: https://developer.apple.com/account/');
console.log('Navigate to: Certificates, Identifiers & Profiles → Identifiers\n');

console.log('✅ Find your Service ID');
console.log('✅ Sign In with Apple: Enabled');
console.log('✅ Domains: localhost added');
console.log('✅ Return URLs: Firebase auth handler URLs added\n');

console.log('🧪 Testing Steps:');
console.log('1. Refresh your app: http://localhost:3000');
console.log('2. Click "Continue with Apple"');
console.log('3. Should open Apple Sign in popup');
console.log('4. Enter Apple ID credentials');
console.log('5. Should redirect back to your app\n');

console.log('🚨 Common Issues:');
console.log('- "Invalid client id": Check Service ID matches exactly');
console.log('- "Invalid web redirect url": Add localhost to Apple Service ID domains');
console.log('- "Service ID not found": Verify Service ID exists in Apple Developer Console');
console.log('- "Team ID invalid": Check Team ID is correct (10 characters)\n');

console.log('📞 If still having issues:');
console.log('1. Clear browser cache and cookies');
console.log('2. Try in incognito/private mode');
console.log('3. Test on Safari (Apple\'s preferred browser)');
console.log('4. Check browser console for specific error messages'); 