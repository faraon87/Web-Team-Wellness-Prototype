# Secure Firebase Setup for Team Welly Mobile App

## 🚀 Firebase Setup Guide (No Secrets in Code)

### **Strategy: Firebase for App + Emergent Auth for Website**

This setup uses **Firebase Authentication** for your mobile app while keeping **Emergent Auth** for your website. All sensitive credentials are stored in environment variables.

---

## 📱 Step-by-Step Setup

### **Step 1: Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `team-welly-mobile-app`
4. Enable Google Analytics (optional)
5. Click "Create project"

### **Step 2: Add Web App to Firebase**
1. In your Firebase project dashboard, click the web icon (</>) 
2. Register app with name: "Team Welly Mobile App"
3. Copy the Firebase config object (you'll need this for .env file)

### **Step 3: Configure Google OAuth**
1. Go to "Authentication" → "Sign-in method"
2. Click "Google" → "Enable"
3. **Use your existing credentials:**
   - **Client ID**: `[YOUR_GOOGLE_CLIENT_ID]`
   - **Client Secret**: `[YOUR_GOOGLE_CLIENT_SECRET]`
4. Click "Save"

### **Step 4: Create .env File**
Create `.env` file in your project root:

```bash
# Firebase Configuration for Mobile App
REACT_APP_FIREBASE_API_KEY=[YOUR_FIREBASE_API_KEY]
REACT_APP_FIREBASE_AUTH_DOMAIN=[YOUR_PROJECT_ID].firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=[YOUR_PROJECT_ID]
REACT_APP_FIREBASE_STORAGE_BUCKET=[YOUR_PROJECT_ID].firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=[YOUR_SENDER_ID]
REACT_APP_FIREBASE_APP_ID=[YOUR_APP_ID]
REACT_APP_FIREBASE_MEASUREMENT_ID=[YOUR_MEASUREMENT_ID]

# Your Google OAuth credentials
REACT_APP_GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
REACT_APP_GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
```

### **Step 5: Configure Authorized Domains**
1. In Firebase Console → Authentication → Settings
2. Add your domains to "Authorized domains":
   - `localhost` (for development)
   - Your app deployment domain
   - Your website domain (for potential integration)

---

## 🔧 Integration Strategy

### **Mobile App (Firebase)**
- ✅ Google SSO
- ✅ Apple SSO (iOS)
- ✅ X/Twitter SSO
- ✅ Email/password authentication
- ✅ Real-time user state
- ✅ Cross-platform consistency

### **Website (Emergent Auth)**
- ✅ Keep existing Emergent Auth setup
- ✅ Maintain current user experience
- ✅ No changes needed initially

### **Future Integration Options**
1. **Unified User Management**: Sync user data between systems
2. **Single Sign-On**: Allow users to sign in once across platforms
3. **Shared User Profiles**: Common user data structure

---

## 📱 Testing Your Mobile App

### **Local Development**
```bash
npm start
```

### **Test Google SSO**
1. Click "Continue with Google" button
2. Should open Google OAuth popup
3. After authentication, user profile should display
4. Check browser console for Firebase status

### **Mobile Testing**
1. Deploy to Vercel/Netlify
2. Test on mobile devices
3. Verify responsive design
4. Test SSO flows on mobile browsers

---

## 🚀 Next Steps

### **Immediate (After Firebase Setup)**
1. ✅ Test Google SSO functionality
2. ✅ Verify user profile display
3. ✅ Test sign-out functionality
4. ✅ Deploy to staging environment

### **Short Term**
1. 🔄 Add Apple SSO for iOS users
2. 🔄 Add X/Twitter SSO
3. 🔄 Implement email/password auth
4. 🔄 Add user profile management

### **Long Term**
1. 🔄 Integrate with Emergent Auth website
2. 🔄 Unified user management system
3. 🔄 Cross-platform user synchronization
4. 🔄 Advanced user analytics

---

## 🔒 Security Features

### **Firebase Security**
- ✅ Secure OAuth flows
- ✅ Token management
- ✅ Domain restrictions
- ✅ HTTPS enforcement
- ✅ Environment variable protection

### **Integration Security**
- 🔄 Secure API endpoints for user sync
- 🔄 Encrypted user data transmission
- 🔄 Proper session management
- 🔄 Audit logging

---

## 📞 Support

- **Firebase Issues**: Check Firebase Console logs
- **Integration Questions**: Review integration strategy above
- **Mobile App Issues**: Check browser console for errors

**Your mobile app Firebase setup is ready to go!** 🎉 