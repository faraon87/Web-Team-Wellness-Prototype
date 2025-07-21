# Apple SSO Fix Guide

## 🍎 Fixing "Invalid client id or web redirect url" Error

### **Current Status:**
- ✅ Google SSO: Working
- ✅ X/Twitter SSO: Working  
- ❌ Apple SSO: "Invalid client id or web redirect url" error

---

## 🔧 **Step 1: Check Firebase Apple Configuration**

### **1.1 Verify Firebase Console Settings**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `team-welly-mobile-app`
3. Go to **Authentication** → **Sign-in method**
4. Click on **Apple** provider
5. **Check these settings:**

#### **Required Fields:**
- ✅ **Service ID**: Should be your Apple Service ID (e.g., `com.teamwelly.webapp`)
- ✅ **Team ID**: Your Apple Developer Team ID
- ✅ **Private Key ID**: Your Apple Private Key ID
- ✅ **Private Key**: Your Apple Private Key (.p8 file content)

### **1.2 Common Issues & Solutions**

#### **Issue: "Invalid client id"**
**Solution:**
- Verify your **Service ID** matches exactly what's in Apple Developer Console
- Service ID should be in format: `com.yourcompany.appname`
- Make sure there are no extra spaces or characters

#### **Issue: "Invalid web redirect url"**
**Solution:**
- The redirect URL should be: `https://team-welly-mobile-app.firebaseapp.com/__/auth/handler`
- Make sure this URL is added to your Apple Service ID configuration

---

## 🍎 **Step 2: Apple Developer Console Configuration**

### **2.1 Check Service ID Settings**
1. Go to [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → Find your Service ID
4. **Verify these settings:**

#### **Service ID Configuration:**
- ✅ **Identifier**: Should match what's in Firebase
- ✅ **Sign In with Apple**: Enabled
- ✅ **Domains and Subdomains**: Should include `localhost` for development
- ✅ **Return URLs**: Should include Firebase auth handler URL

### **2.2 Add Required URLs**
In your Apple Service ID, add these URLs:

#### **For Development:**
```
https://localhost:3000/__/auth/handler
http://localhost:3000/__/auth/handler
```

#### **For Production:**
```
https://team-welly-mobile-app.firebaseapp.com/__/auth/handler
https://your-production-domain.com/__/auth/handler
```

---

## 🔍 **Step 3: Debugging Steps**

### **3.1 Check Browser Console**
1. Open Developer Tools (F12)
2. Go to Console tab
3. Try Apple SSO
4. Look for specific error messages

### **3.2 Common Error Messages:**

#### **"Invalid client id"**
- Check Service ID in Firebase matches Apple Developer Console
- Verify no typos or extra characters

#### **"Invalid web redirect url"**
- Add `localhost:3000` to Apple Service ID domains
- Verify Firebase auth handler URL is correct

#### **"Service ID not found"**
- Verify Service ID exists in Apple Developer Console
- Check Team ID is correct

---

## 🚀 **Step 4: Quick Fix Checklist**

### **Firebase Console:**
- [ ] Apple provider is enabled
- [ ] Service ID is correct
- [ ] Team ID is correct
- [ ] Private Key ID is correct
- [ ] Private Key is uploaded

### **Apple Developer Console:**
- [ ] Service ID exists and is configured
- [ ] Sign In with Apple is enabled
- [ ] `localhost` is in domains list
- [ ] Firebase auth handler URL is in return URLs

### **Testing:**
- [ ] Clear browser cache and cookies
- [ ] Try in incognito/private mode
- [ ] Test on different browsers (Safari works best)

---

## 🎯 **Step 5: Alternative Solutions**

### **5.1 If Apple SSO Still Doesn't Work:**
1. **Temporarily disable Apple SSO** in Firebase
2. **Focus on Google and X/Twitter** (which are working)
3. **Revisit Apple setup** later when you have more time

### **5.2 For Production:**
- Apple SSO requires a paid Apple Developer account ($99/year)
- Consider if Apple SSO is essential for your user base
- Google and X/Twitter cover most users

---

## 📞 **Support Resources**

### **Apple Developer Support:**
- [Apple Developer Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Apple Developer Forums](https://developer.apple.com/forums/)

### **Firebase Support:**
- [Firebase Apple Auth Guide](https://firebase.google.com/docs/auth/web/apple)
- [Firebase Console](https://console.firebase.google.com/)

---

## ✅ **Success Indicators**

When Apple SSO is working correctly:
- ✅ Apple Sign in popup opens
- ✅ Can enter Apple ID credentials
- ✅ Authorization screen appears
- ✅ After approval, popup closes
- ✅ User profile displays in app
- ✅ No "Invalid client id" or "Invalid web redirect url" errors

**Your Apple SSO will be fully functional!** 🍎 