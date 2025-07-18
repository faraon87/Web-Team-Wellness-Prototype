# Apple & X/Twitter SSO Setup Guide

## 🚀 Complete Setup for Apple and X/Twitter Authentication

### **Current Status:**
- ✅ Google SSO is working
- ✅ Firebase is configured
- ✅ UI components are ready
- 🔄 Apple SSO needs configuration
- 🔄 X/Twitter SSO needs configuration

---

## 📱 **Step 1: Apple Sign in with Apple Setup**

### **1.1 Apple Developer Account Setup**
1. **Get Apple Developer Account** ($99/year)
   - Go to [Apple Developer](https://developer.apple.com/)
   - Sign up for Apple Developer Program
   - Complete verification process

### **1.2 Create Service ID**
1. Go to [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** → **Services IDs**
4. **Configure your Service ID:**
   - Description: `Team Welly Web App`
   - Identifier: `com.teamwelly.webapp` (or your domain)
   - Check **Sign In with Apple**
   - Add your domain to **Domains and Subdomains**
   - Add callback URL: `https://your-project-id.firebaseapp.com/__/auth/handler`

### **1.3 Create Private Key**
1. In Apple Developer Console → **Keys**
2. Click **+** → **Sign in with Apple**
3. **Configure the key:**
   - Key Name: `Team Welly Sign in with Apple`
   - Check **Sign in with Apple**
   - Select your Service ID
4. **Download the key file** (.p8 format)
5. **Note the Key ID** (you'll need this)

### **1.4 Enable Apple Auth in Firebase**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your Project → **Authentication** → **Sign-in method**
3. Click **Apple** → **Enable**
4. **Configure Apple settings:**
   - **Service ID**: `com.teamwelly.webapp` (from step 1.2)
   - **Team ID**: Your Apple Developer Team ID
   - **Private Key ID**: Key ID from step 1.3
   - **Private Key**: Upload the .p8 file from step 1.3
5. Click **Save**

---

## 🐦 **Step 2: X/Twitter Authentication Setup**

### **2.1 Twitter Developer Account**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. **Apply for a Developer Account** (free)
3. Complete the application process
4. Wait for approval (usually 1-2 days)

### **2.2 Create Twitter App**
1. In Twitter Developer Portal → **Projects & Apps**
2. Click **+ Create App**
3. **Configure your app:**
   - App name: `Team Welly Web App`
   - App description: `Team Welly corporate wellness platform`
   - Website URL: Your app URL
   - Callback URLs: `https://your-project-id.firebaseapp.com/__/auth/handler`
   - Enable **OAuth 1.0a**
   - Enable **OAuth 2.0**

### **2.3 Get API Credentials**
1. In your Twitter App → **Keys and tokens**
2. **Copy these values:**
   - API Key (Consumer Key)
   - API Secret (Consumer Secret)
   - Bearer Token (for OAuth 2.0)

### **2.4 Enable Twitter Auth in Firebase**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your Project → **Authentication** → **Sign-in method**
3. Click **Twitter** → **Enable**
4. **Enter your credentials:**
   - **API Key**: Your Twitter API Key
   - **API Secret**: Your Twitter API Secret
5. Click **Save**

---

## 🔧 **Step 3: Environment Variables**

### **3.1 Create/Update `.env` File**
Create a `.env` file in your project root with these variables:

```bash
# Firebase Configuration (you already have these)
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Apple Sign in with Apple (new)
REACT_APP_APPLE_SERVICE_ID=com.teamwelly.webapp
REACT_APP_APPLE_TEAM_ID=your-apple-team-id
REACT_APP_APPLE_PRIVATE_KEY_ID=your-apple-private-key-id

# X/Twitter API (new)
REACT_APP_TWITTER_API_KEY=your-twitter-api-key
REACT_APP_TWITTER_API_SECRET=your-twitter-api-secret
```

### **3.2 Restart Development Server**
```bash
npm start
```

---

## 🧪 **Step 4: Testing**

### **4.1 Test Apple SSO**
1. Click "Continue with Apple" button
2. Should open Apple Sign in popup
3. Enter Apple ID credentials
4. Grant permissions
5. User profile should display

### **4.2 Test X/Twitter SSO**
1. Click "Continue with X" button
2. Should open Twitter OAuth popup
3. Authorize the app
4. User profile should display

### **4.3 Common Issues & Solutions**

#### **Apple SSO Issues:**
- **"Domain not authorized"**: Add your domain to Apple Service ID
- **"Invalid configuration"**: Check Team ID and Private Key
- **"Service ID not found"**: Verify Service ID in Firebase

#### **X/Twitter SSO Issues:**
- **"API key invalid"**: Check API Key and Secret in Firebase
- **"Callback URL mismatch"**: Verify callback URL in Twitter app
- **"App not approved"**: Wait for Twitter Developer approval

---

## 🚀 **Step 5: Production Deployment**

### **5.1 Update Authorized Domains**
1. Firebase Console → **Authentication** → **Settings**
2. Add your production domain to **Authorized domains**
3. Update Apple Service ID with production domain
4. Update Twitter app callback URLs

### **5.2 Environment Variables for Production**
- Set environment variables in your hosting platform (Vercel/Netlify)
- Never commit `.env` file to Git
- Use platform-specific environment variable management

---

## 📋 **Checklist**

### **Apple SSO:**
- [ ] Apple Developer Account created
- [ ] Service ID configured
- [ ] Private Key generated
- [ ] Firebase Apple auth enabled
- [ ] Domain authorized
- [ ] Test successful

### **X/Twitter SSO:**
- [ ] Twitter Developer Account approved
- [ ] Twitter app created
- [ ] API credentials obtained
- [ ] Firebase Twitter auth enabled
- [ ] Callback URLs configured
- [ ] Test successful

### **General:**
- [ ] Environment variables set
- [ ] Development testing complete
- [ ] Production domains configured
- [ ] Error handling verified

---

## 🆘 **Support**

### **Apple Issues:**
- [Apple Developer Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Firebase Apple Auth Guide](https://firebase.google.com/docs/auth/web/apple)

### **Twitter Issues:**
- [Twitter Developer Documentation](https://developer.twitter.com/en/docs/authentication)
- [Firebase Twitter Auth Guide](https://firebase.google.com/docs/auth/web/twitter)

### **Firebase Issues:**
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)

---

## 🎉 **Success Indicators**

When everything is working correctly:
- ✅ Apple SSO button opens Apple Sign in popup
- ✅ X/Twitter SSO button opens Twitter OAuth popup
- ✅ User profiles display after successful authentication
- ✅ Sign out functionality works for all providers
- ✅ No console errors during authentication flow
- ✅ Responsive design works on mobile and desktop

**Your Apple and X/Twitter SSO will be fully functional!** 🚀 