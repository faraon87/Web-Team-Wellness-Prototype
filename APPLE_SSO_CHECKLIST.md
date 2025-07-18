# Apple SSO Configuration Checklist

## 🍎 Complete Setup Verification

### **Current Status:**
- ✅ Apple Developer Account: Confirmed
- ✅ Apple Credentials: Available
- ❌ Apple SSO: "Invalid client id or web redirect url" error

---

## 📋 **Step 1: Apple Developer Console Setup**

### **1.1 Service ID Configuration**
Go to: https://developer.apple.com/account/resources/identifiers/list/serviceId

- [ ] **Service ID exists** (e.g., `com.teamwelly.webapp`)
- [ ] **Sign In with Apple**: Enabled
- [ ] **Domains and Subdomains**: `localhost` added
- [ ] **Return URLs**: These URLs added:
  - [ ] `https://team-welly-mobile-app.firebaseapp.com/__/auth/handler`
  - [ ] `https://localhost:3000/__/auth/handler`
  - [ ] `http://localhost:3000/__/auth/handler`

### **1.2 Private Key Configuration**
Go to: https://developer.apple.com/account/resources/authkeys/list

- [ ] **Private Key exists** with "Sign in with Apple" enabled
- [ ] **Key ID** noted (you'll need this for Firebase)
- [ ] **.p8 file downloaded** (you'll need this for Firebase)

### **1.3 Team ID**
Go to: https://developer.apple.com/account/membership/

- [ ] **Team ID copied** (10-character code like `ABC123DEF4`)

---

## 🔧 **Step 2: Firebase Console Configuration**

Go to: https://console.firebase.google.com/project/team-welly-mobile-app/authentication/providers

### **2.1 Apple Provider Settings**
- [ ] **Apple provider**: Enabled
- [ ] **Service ID**: Matches your Apple Service ID exactly
- [ ] **Team ID**: Your Apple Team ID (10 characters)
- [ ] **Private Key ID**: Your Apple Private Key ID
- [ ] **Private Key**: .p8 file uploaded or content pasted
- [ ] **Save**: Configuration saved

---

## 🧪 **Step 3: Testing**

### **3.1 Browser Testing**
- [ ] **Clear browser cache and cookies**
- [ ] **Refresh app**: http://localhost:3000
- [ ] **Open Developer Tools** (F12)
- [ ] **Click "Continue with Apple"**
- [ ] **Check for popup**: Apple Sign in should open
- [ ] **Test authentication**: Enter Apple ID credentials

### **3.2 Error Checking**
- [ ] **No "Invalid client id" error**
- [ ] **No "Invalid web redirect url" error**
- [ ] **No "Service ID not found" error**
- [ ] **No "Team ID invalid" error**

---

## 🚨 **Common Issues & Solutions**

### **Issue: "Invalid client id"**
**Solution:**
- Verify Service ID in Firebase matches Apple Developer Console exactly
- Check for extra spaces or characters
- Ensure Service ID is in correct format: `com.company.appname`

### **Issue: "Invalid web redirect url"**
**Solution:**
- Add `localhost` to Apple Service ID domains
- Add Firebase auth handler URLs to return URLs
- Verify URLs are exactly: `https://team-welly-mobile-app.firebaseapp.com/__/auth/handler`

### **Issue: "Service ID not found"**
**Solution:**
- Verify Service ID exists in Apple Developer Console
- Check Team ID is correct
- Ensure Service ID has "Sign In with Apple" enabled

### **Issue: "Team ID invalid"**
**Solution:**
- Team ID should be exactly 10 characters
- Copy from Apple Developer Console → Membership
- No extra spaces or characters

---

## 📱 **Step 4: Browser-Specific Testing**

### **4.1 Safari (Recommended)**
- [ ] Test on Safari browser
- [ ] Apple SSO works best on Safari
- [ ] Check for any Safari-specific errors

### **4.2 Chrome/Firefox**
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Check for cross-browser compatibility

### **4.3 Mobile Testing**
- [ ] Test on mobile Safari
- [ ] Test on mobile Chrome
- [ ] Verify responsive design

---

## ✅ **Success Indicators**

When Apple SSO is working correctly:
- ✅ Apple Sign in popup opens
- ✅ Can enter Apple ID credentials
- ✅ Authorization screen appears
- ✅ After approval, popup closes
- ✅ User profile displays in app
- ✅ No console errors
- ✅ Works across different browsers

---

## 🔄 **If Still Not Working**

### **4.1 Debugging Steps**
1. **Check browser console** for specific error messages
2. **Verify all credentials** match exactly
3. **Test in incognito/private mode**
4. **Clear all browser data**
5. **Try different browser**

### **4.2 Alternative Approach**
If Apple SSO continues to have issues:
- **Focus on Google and X/Twitter** (which are working)
- **Apple SSO can be added later** when you have more time
- **Most users** can use Google or X/Twitter authentication

---

## 🎯 **Final Verification**

- [ ] All checklist items completed
- [ ] Apple SSO popup opens
- [ ] Authentication flow works
- [ ] User profile displays after sign in
- [ ] Sign out functionality works
- [ ] No console errors

**Your Apple SSO will be fully functional!** 🍎 