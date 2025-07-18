# Railway Deployment Guide

## 🚀 Deploy Team Welly to Railway

### **Why Railway?**
- ✅ **Easy environment variable management**
- ✅ **Automatic HTTPS**
- ✅ **Custom domains**
- ✅ **Better for React apps**
- ✅ **Simpler configuration than Vercel**

---

## 📋 **Step 1: Prepare Your Repository**

### **1.1 Files Already Added:**
- ✅ `railway.json` - Railway configuration
- ✅ `serve` dependency - For production serving
- ✅ Updated `package.json` scripts

### **1.2 Commit and Push:**
```bash
git add .
git commit -m "Add Railway deployment configuration"
git push origin main
```

---

## 🔧 **Step 2: Deploy to Railway**

### **2.1 Connect to Railway:**
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `Web-Team-Wellness-Prototype`

### **2.2 Configure Build Settings:**
Railway will automatically detect it's a React app and use the correct build settings.

---

## 🔑 **Step 3: Set Environment Variables**

### **3.1 Add Firebase Configuration:**
In Railway dashboard → Your project → **Variables** tab, add:

```bash
REACT_APP_FIREBASE_API_KEY=AIzaSyDV1VHjgWVM3eIEvB1ZlCFX1g80Uz4bgkM
REACT_APP_FIREBASE_AUTH_DOMAIN=team-welly-mobile-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=team-welly-mobile-app
REACT_APP_FIREBASE_STORAGE_BUCKET=team-welly-mobile-app.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=875398026839
REACT_APP_FIREBASE_APP_ID=1:875398026839:web:9d29479d24eb7f3183b512
REACT_APP_FIREBASE_MEASUREMENT_ID=G-77Y9K6TRZV
```

### **3.2 Railway-Specific Variables:**
```bash
NODE_ENV=production
PORT=3000
```

---

## 🌐 **Step 4: Update Domain Configuration**

### **4.1 Firebase Authorized Domains:**
Go to Firebase Console → Authentication → Settings → Authorized domains
Add your Railway domain:
```
your-app-name.railway.app
```

### **4.2 Apple Service ID (Optional):**
If you want Apple SSO on Railway, add to Apple Developer Console:
- **Domains**: `your-app-name.railway.app`
- **Return URLs**: `https://your-app-name.railway.app/__/auth/handler`

---

## 🚀 **Step 5: Deploy and Test**

### **5.1 Automatic Deployment:**
Railway will automatically:
- Build your React app
- Deploy to production
- Provide a URL like: `https://your-app-name.railway.app`

### **5.2 Test Your App:**
1. Visit your Railway URL
2. Test all 3 SSO providers:
   - ✅ Google SSO
   - ✅ Apple SSO
   - ✅ X/Twitter SSO
3. Verify no "Demo Mode" message
4. Test user authentication flow

---

## 🎯 **Step 6: Custom Domain (Optional)**

### **6.1 Add Custom Domain:**
1. In Railway dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

### **6.2 Update Firebase/Apple:**
Add your custom domain to:
- Firebase authorized domains
- Apple Service ID domains and return URLs

---

## 📊 **Step 7: Monitor and Scale**

### **7.1 Railway Features:**
- **Logs**: View real-time deployment logs
- **Metrics**: Monitor performance and usage
- **Scaling**: Auto-scale based on traffic
- **Rollbacks**: Easy deployment rollbacks

### **7.2 Environment Management:**
- **Production**: Your live app
- **Preview**: Automatic preview deployments for PRs
- **Development**: Local development with Railway CLI

---

## 🔄 **Migration from Vercel**

### **Benefits of Railway:**
- ✅ **Better environment variable management**
- ✅ **Simpler configuration**
- ✅ **More reliable deployments**
- ✅ **Better for React apps**
- ✅ **Cost-effective**

### **Steps:**
1. Deploy to Railway (steps above)
2. Test thoroughly
3. Update DNS to point to Railway
4. Remove Vercel deployment (optional)

---

## ✅ **Success Indicators**

When Railway deployment is successful:
- ✅ App loads without "Demo Mode" message
- ✅ All 3 SSO providers work
- ✅ User authentication flows work
- ✅ Responsive design works
- ✅ No console errors
- ✅ HTTPS enabled automatically

---

## 🆘 **Troubleshooting**

### **Common Issues:**
- **Build fails**: Check Railway logs for errors
- **Environment variables**: Verify all Firebase variables are set
- **SSO not working**: Check domain configuration in Firebase/Apple
- **Demo mode still showing**: Verify environment variables are correct

### **Railway Support:**
- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)
- [Railway Status](https://status.railway.app/)

---

## 🎉 **Your Team Welly App is Now Live on Railway!**

**Benefits:**
- 🚀 **Faster deployments**
- 🔧 **Easier configuration**
- 💰 **Cost-effective**
- 📊 **Better monitoring**
- 🔒 **Automatic HTTPS**

**Your SSO authentication system is production-ready on Railway!** 🎉 