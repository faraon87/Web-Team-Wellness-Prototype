# Team Welly - Complete Setup Guide
## Firebase Authentication & Deployment Configuration

### 🎯 **Overview**
This is the consolidated setup guide for the Team Welly wellness platform - a production-ready React web app designed for iOS migration. The current React implementation serves as the foundation for a future React Native iOS app, with all components and patterns chosen for cross-platform compatibility.

**Migration Strategy**: Web-first development → React Native conversion → iOS App Store deployment

## 🚀 **iOS Migration Preparation**

### **Current iOS-Ready Architecture:**

#### **Component Compatibility:**
- **Functional Components**: All screens use React hooks (React Native compatible)
- **Navigation Pattern**: Bottom tab navigation maps directly to iOS tab bar
- **State Management**: Hook-based patterns work identically in React Native
- **Authentication**: Firebase Auth has React Native SDK with same API

#### **UI/UX Migration Readiness:**
- **Mobile-First Design**: Already optimized for mobile interaction patterns
- **Touch Interfaces**: Button sizes and touch targets iOS-compliant
- **Screen Components**: Component structure translates directly to React Native
- **Visual Design**: Teal/emerald color scheme and typography ready for iOS

#### **Technical Migration Path:**
```bash
# Future iOS Migration Steps (Reference Only)
# Phase 1: React Native Setup
npx react-native init TeamWellyIOS
cd TeamWellyIOS

# Phase 2: Component Migration
# - Copy screen components from src/components/screens/
# - Convert Tailwind classes to StyleSheet objects
# - Replace React Router with React Navigation

# Phase 3: Authentication Migration  
npm install @react-native-firebase/app @react-native-firebase/auth
# - Firebase config remains identical
# - Authentication flows work without modification

# Phase 4: iOS-Specific Features
npm install @react-native-community/push-notification-ios
npm install react-native-biometrics
# - Add push notifications, biometric auth, Health Kit
```

### **iOS Development Considerations:**

#### **Preserved Web Features:**
- All current functionality will be maintained in iOS version
- Authentication flows remain identical
- User data and profiles sync across platforms
- Wellness features and team collaboration preserved

#### **iOS Enhancements Planned:**
- **Native Performance**: Faster rendering and animations
- **Push Notifications**: Real-time wellness reminders and team updates
- **Biometric Security**: Face ID/Touch ID for secure authentication
- **Health Kit Integration**: Native iOS health data synchronization
- **Offline Functionality**: Local data storage for offline wellness tracking

---

## 🚀 **Quick Start (5 Minutes)**

### **Option 1: Demo Mode (No Configuration Required)**
- Clone repository and run `npm start`
- App runs in demo mode with simulated authentication
- Perfect for UI testing and development

### **Option 2: Full Production Setup**
- Follow Firebase setup below (15 minutes)
- Enable real SSO authentication
- Deploy to Railway or Vercel

---

## 🔧 **Firebase Authentication Setup**

### **Step 1: Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" → Name: `team-welly-mobile-app`
3. Enable Google Analytics (optional) → "Create project"

### **Step 2: Add Web App**
1. Click the web icon (</>) in Firebase dashboard
2. Register app name: "Team Welly Mobile App"
3. Copy the Firebase config object (needed for .env)

### **Step 3: Enable Authentication Providers**

#### **Google SSO (Required):**
1. Authentication → Sign-in method → Google → Enable
2. Use your Google OAuth credentials
3. Add authorized domains: `localhost`, your deployment domain

#### **Apple SSO (iOS/Safari):**
1. **Prerequisites**: Apple Developer Account ($99/year)
2. Create Apple Service ID in [Apple Developer Console](https://developer.apple.com/account/)
3. Configure Service ID with your domains and Firebase callback URL
4. Generate Private Key (.p8 file) for Sign in with Apple
5. In Firebase: Authentication → Apple → Enable
   - Service ID: Your Apple Service ID
   - Team ID: Apple Developer Team ID  
   - Private Key ID: From Apple Developer Console
   - Private Key: Upload .p8 file

#### **X/Twitter SSO:**
1. **Prerequisites**: Twitter Developer Account (free, approval required)
2. Create app in [Twitter Developer Portal](https://developer.twitter.com/)
3. Get API Key and API Secret from Twitter app settings
4. In Firebase: Authentication → Twitter → Enable
   - API Key: Your Twitter API Key
   - API Secret: Your Twitter API Secret

### **Step 4: Configure Environment Variables**
Create `.env` file in project root:

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### **Step 5: Update Authorized Domains**
1. Firebase Console → Authentication → Settings → Authorized domains
2. Add your domains:
   - `localhost` (development)
   - Your Railway/Vercel domain (production)

---

## 🌐 **Deployment Configuration**

### **Railway Deployment (Recommended)**

#### **Why Railway:**
- Easy environment variable management
- Automatic HTTPS and custom domains
- Better React app support
- Simplified configuration

#### **Setup Steps:**
1. **Repository Setup:**
   ```bash
   git add .
   git commit -m "Add Railway deployment configuration"
   git push origin main
   ```

2. **Deploy to Railway:**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Environment Variables:**
   Add in Railway dashboard → Variables tab:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   NODE_ENV=production
   PORT=3000
   ```

4. **Update Firebase Domains:**
   - Add your Railway domain to Firebase authorized domains
   - Update Apple Service ID with Railway domain (if using Apple SSO)

### **Vercel Deployment (Alternative)**

#### **Setup Steps:**
1. **Fix package.json:**
   ```json
   {
     // Remove homepage field for Vercel deployment
     // "homepage": "...", // ← Remove this line
   }
   ```

2. **Deploy to Vercel:**
   - Connect GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy with automatic build detection

3. **Configuration Files:**
   - `vercel.json` already configured
   - Build command: `npm run build`
   - Output directory: `build`

---

## 🧪 **Testing Your Setup**

### **Authentication Testing Checklist:**

#### **Google SSO:**
- [ ] Click "Continue with Google" opens OAuth popup
- [ ] Can select Google account and authorize
- [ ] User profile displays after successful sign-in
- [ ] Sign out button works correctly

#### **Apple SSO:**
- [ ] Click "Continue with Apple" opens Apple Sign in
- [ ] Can enter Apple ID credentials
- [ ] Authorization completes successfully
- [ ] Works on Safari browser (Apple's preference)

#### **X/Twitter SSO:**
- [ ] Click "Continue with X" opens Twitter OAuth
- [ ] Can authorize app permissions
- [ ] User profile displays after authorization
- [ ] Works across different browsers

### **Cross-Platform Testing:**
- [ ] Desktop browsers (Chrome, Safari, Firefox)
- [ ] Mobile browsers (iOS Safari, Android Chrome)
- [ ] Responsive design works properly
- [ ] Touch interactions work on mobile

### **Performance Testing:**
- [ ] App loads within 3 seconds
- [ ] No console errors in browser
- [ ] Authentication flows complete quickly
- [ ] Memory usage remains stable

---

## 🚨 **Troubleshooting Guide**

### **Common Issues:**

#### **"Demo Mode" Still Showing:**
- Check `.env` file exists in project root
- Verify Firebase config values are correct (no quotes)
- Restart development server: `npm start`

#### **Google SSO Not Working:**
- Verify Firebase Google provider is enabled
- Check authorized domains include `localhost`
- Ensure Google OAuth credentials are correct

#### **Apple SSO Errors:**
- "Invalid client id": Check Service ID matches Firebase
- "Invalid web redirect url": Add localhost to Apple Service ID
- "Domain not authorized": Verify domains in Apple Developer Console

#### **X/Twitter SSO Issues:**
- "API key invalid": Check API credentials in Firebase
- "App not approved": Wait for Twitter Developer approval
- "Callback URL mismatch": Verify callback URLs in Twitter app

#### **Build/Deployment Errors:**
- **Vercel white page**: Remove `homepage` field from package.json
- **Railway build fails**: Check environment variables are set
- **Font loading issues**: Fonts moved to `src/assets/fonts/`

---

## 📋 **Development Workflow**

### **Local Development:**
```bash
# Clone repository
git clone [your-repository-url]
cd team-wellness-web-prototype

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

### **Making Changes:**
1. **Follow governance rules** in `DEVELOPMENT_GOVERNANCE.md`
2. **Run compliance check**: `node COMPLIANCE_CHECKER.js`
3. **Test authentication** after any auth-related changes
4. **Update changelog** with modifications
5. **Deploy to staging** before production

### **Git Workflow:**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of your changes"

# Push and create pull request
git push origin feature/your-feature-name
```

---

## 🔒 **Security Best Practices**

### **Environment Variables:**
- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- Prefix React variables with `REACT_APP_`
- Validate all environment variables exist

### **Firebase Security:**
- Use Firebase Security Rules for database access
- Implement proper user authorization
- Monitor Firebase Console for suspicious activity
- Regularly rotate API keys and secrets

### **Code Security:**
- No hardcoded secrets in source code
- Proper input validation on all forms
- HTTPS enforced in production
- Regular dependency updates

---

## 📊 **Performance Optimization**

### **Current Performance:**
- Bundle size: ~102KB gzipped
- First contentful paint: <1.5 seconds
- Interactive: <3 seconds
- Mobile performance: 95+ score

### **Optimization Techniques:**
- Lazy loading for screen components
- Font optimization with `font-display: swap`
- Tree shaking for unused code
- Proper caching headers

---

## 📞 **Support & Resources**

### **Documentation:**
- `DEVELOPMENT_GOVERNANCE.md` - Development rules and guidelines
- `COMPLIANCE_CHECKER.md` - Code compliance validation
- `CHANGELOG.md` - Project change history

### **External Resources:**
- [Firebase Console](https://console.firebase.google.com/)
- [Apple Developer Console](https://developer.apple.com/account/)
- [Twitter Developer Portal](https://developer.twitter.com/)
- [Railway Dashboard](https://railway.app/dashboard)
- [Vercel Dashboard](https://vercel.com/dashboard)

### **Contact:**
- **Project Lead**: Drchriszeiter@gmail.com
- **Technical Issues**: Check browser console for errors
- **Authentication Issues**: Review Firebase Console logs

---

## ✅ **Success Checklist**

### **Setup Complete When:**
- [ ] App loads without "Demo Mode" message
- [ ] All desired SSO providers work correctly
- [ ] User profiles display after authentication
- [ ] Sign out functionality works
- [ ] Mobile responsiveness verified
- [ ] Production deployment successful
- [ ] Performance benchmarks met
- [ ] Security compliance validated

---

**Last Updated**: January 20, 2025  
**Version**: 2.0 (Consolidated from multiple setup documents)  
**Status**: Production Ready

*This guide consolidates all setup information for the Team Welly platform. For development standards and compliance requirements, refer to `DEVELOPMENT_GOVERNANCE.md`.*