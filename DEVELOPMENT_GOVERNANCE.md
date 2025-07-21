# Team Welly Development Governance
## AI Coding Assistance & Team Developer Guidelines

### 🎯 **Document Purpose**
This document establishes boundaries, rules, and best practices for AI coding assistance and human developers working on the Team Welly wellness platform to maintain code quality, consistency, and prevent breaking changes.

---

## 📋 **Project Overview**

### **Current Tech Stack:**
- **Frontend**: React 18.3.1, React Router DOM v6, Tailwind CSS
- **Authentication**: Firebase Auth with SSO (Google, Apple, X/Twitter)
- **Icons**: Lucide React
- **Deployment**: Railway, GitHub Pages, Vercel
- **Status**: Production-ready React web app designed for iOS migration
- **Migration Target**: React Native for iOS App Store deployment

### **Core Architecture:**
- Mobile-first responsive design (iOS-ready patterns)
- Protected routes with authentication (compatible with React Navigation)
- Bottom navigation pattern (native iOS translation ready)
- Component-based architecture (React Native compatible)
- Environment variable configuration (cross-platform ready)
- iOS-optimized user experience and interaction patterns

---

## 🚫 **CRITICAL - DO NOT MODIFY**

### **1. Core Dependencies (Never Downgrade)**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1", 
  "react-router-dom": "^6.20.0",
  "firebase": "^11.10.0",
  "react-scripts": "5.0.1"
}
```

### **2. Protected Files & Configurations**
- **`.env`** - Contains Firebase credentials (never commit to version control)
- **`package.json`** - Dependency versions locked for compatibility
- **`src/useAuth.js`** - Authentication hook (core functionality)
- **`src/authService.js`** - Firebase service configuration
- **Navigation system** - Complete and tested routing structure

### **3. Authentication System**
- Firebase SSO integration is fully configured and working
- Google, Apple, X/Twitter providers are operational
- Demo mode fallback system implemented
- **Never modify authentication flow without testing**

---

## ✅ **DEVELOPMENT RULES**

### **1. Code Quality Standards**

#### **React Best Practices:**
```javascript
// ✅ Always import React at top for context usage
import React, { useState } from 'react';

// ✅ Use functional components with hooks
const Component = () => {
  const [state, setState] = useState(initialValue);
  return <div>Content</div>;
};

// ✅ Proper component export
export default Component;
```

#### **File Organization:**
```
src/
├── components/
│   ├── Navigation.js          # Bottom navigation
│   └── screens/              # Screen components
│       ├── LandingScreen.js
│       ├── HomeScreen.js
│       ├── WellnessScreen.js
│       ├── TeamScreen.js
│       ├── ProfileScreen.js
│       └── SettingsScreen.js
├── assets/                   # Static assets
├── useAuth.js               # Authentication hook
├── authService.js           # Firebase configuration
├── App.js                   # Main app component
├── index.js                 # Entry point
└── index.css               # Global styles
```

### **2. Styling Guidelines**

#### **Tailwind CSS Classes:**
```javascript
// ✅ Use consistent color scheme
const primaryColors = {
  teal: 'bg-teal-600 text-white',
  tealHover: 'hover:bg-teal-700',
  accent: 'bg-emerald-500'
};

// ✅ Mobile-first responsive classes
<div className="p-4 md:p-6 lg:p-8">
```

#### **Custom CSS:**
- Use `index.css` for global styles only
- Component-specific styles should use Tailwind classes
- Font family: 'Sensa Wild Fill' with fallbacks

### **3. Authentication Integration**

#### **Protected Routes Pattern:**
```javascript
const ProtectedRoute = ({ children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
```

#### **SSO Implementation:**
```javascript
// ✅ Always handle loading and error states
const handleSSOSignIn = async (provider) => {
  setIsLoading(true);
  setAuthError(null);
  
  try {
    const result = await signInWith[Provider]();
    if (result.success) {
      // Handle success
    }
  } catch (error) {
    setAuthError('User-friendly error message');
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🛡️ **SECURITY & ENVIRONMENT GUIDELINES**

### **1. Environment Variables**
```bash
# ✅ Required Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=sender-id
REACT_APP_FIREBASE_APP_ID=app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=measurement-id
```

### **2. Security Rules**
- **Never commit `.env` files** to version control
- **Always use environment variables** for sensitive data
- **Validate all user inputs** in components
- **Use HTTPS** in production environments
- **Implement proper error boundaries**

---

## 📐 **FEATURE DEVELOPMENT STANDARDS**

### **1. Component Development**

#### **New Screen Components:**
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';

const NewScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Component logic here

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        {/* Screen content */}
      </div>
    </div>
  );
};

export default NewScreen;
```

#### **Navigation Integration:**
- All new screens must be added to `App.js` routing
- Use protected route wrapper for authenticated screens
- Update `Navigation.js` if adding to bottom navigation

### **2. State Management**
```javascript
// ✅ Use React hooks for local state
const [state, setState] = useState(initialValue);

// ✅ Use useAuth hook for user state
const { user, signIn, signOut } = useAuth();

// ✅ Handle async operations properly
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiCall();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, [dependency]);
```

### **3. Error Handling**
```javascript
// ✅ Always provide user-friendly error messages
const handleError = (error) => {
  console.error('Detailed error for debugging:', error);
  setError('Something went wrong. Please try again.');
};

// ✅ Implement error boundaries for components
class ErrorBoundary extends React.Component {
  // Error boundary implementation
}
```

---

## 🧪 **TESTING REQUIREMENTS**

### **1. Pre-Deployment Testing**
- [ ] All SSO providers work (Google, Apple, X)
- [ ] Authentication flows complete successfully
- [ ] Protected routes redirect properly
- [ ] Mobile responsiveness verified
- [ ] No console errors in browser
- [ ] Loading states work correctly

### **2. Cross-Browser Testing**
- Chrome (primary)
- Safari (especially for Apple SSO)
- Firefox
- Mobile browsers (iOS Safari, Android Chrome)

### **3. Performance Testing**
- App loads within 3 seconds
- Navigation is smooth
- No memory leaks during repeated use
- Bundle size remains under 200KB gzipped

---

## 🚨 **DEPLOYMENT GUIDELINES**

### **1. Pre-Deployment Checklist**
- [ ] Environment variables configured
- [ ] Firebase authorized domains updated
- [ ] Build completes without errors
- [ ] Static serve test passed
- [ ] All authentication providers tested

### **2. Deployment Platforms**

#### **Railway (Recommended):**
```bash
# package.json script for Railway
"railway:start": "serve -s build -l $PORT"
```

#### **Vercel:**
- Remove `homepage` field from package.json
- Use environment variable management
- Test locally before deployment

#### **GitHub Pages:**
- Configure `homepage` field correctly
- Use `gh-pages` deployment script

### **3. Post-Deployment Verification**
- SSO authentication works in production
- Custom domain configuration (if applicable)
- HTTPS certificate is active
- All routes are accessible

---

## 🔄 **VERSION CONTROL STANDARDS**

### **1. Git Workflow**
```bash
# ✅ Meaningful commit messages
git commit -m "feat: add team collaboration screen"
git commit -m "fix: resolve Apple SSO authentication issue"
git commit -m "docs: update deployment configuration"
```

### **2. Branch Protection**
- Always work on feature branches
- Require pull request reviews
- Run tests before merging
- Never push directly to main branch

### **3. File Management**
- Keep documentation up to date
- Remove unused files and components
- Maintain clean folder structure
- Update README.md with changes

---

## 🎯 **AI ASSISTANT GUIDELINES**

### **1. When Working with AI Coding Assistants:**
- **Always specify** which authentication provider changes affect
- **Test authentication flows** after any auth-related changes
- **Preserve existing working functionality**
- **Use existing component patterns** for consistency
- **Validate environment variable usage**

### **2. AI Assistant Restrictions:**
- **Never downgrade** React or Firebase versions
- **Never modify** core authentication without testing
- **Never commit** environment variables
- **Never break** existing navigation patterns
- **Always preserve** mobile-first responsive design

### **3. Change Approval Process:**
- Authentication changes require manual testing
- UI changes should maintain brand consistency
- New features require documentation updates
- Breaking changes need stakeholder approval

---

## 📋 **COMPLIANCE VERIFICATION**

### **1. Before Making Changes:**
- Review this governance document
- Check if changes affect protected files
- Verify compatibility with current dependencies
- Plan testing strategy

### **2. After Making Changes:**
- Run compliance checker (see COMPLIANCE_CHECKER.md)
- Update changelog entry
- Test all authentication flows
- Verify mobile responsiveness

### **3. Documentation Updates:**
- Update relevant .md files
- Add new features to README
- Update deployment guides if needed
- Record any new environment variables

---

## 🆘 **EMERGENCY PROCEDURES**

### **1. If Authentication Breaks:**
1. Check `.env` file configuration
2. Verify Firebase Console settings
3. Test in demo mode
4. Roll back to last working commit
5. Contact project maintainer

### **2. If Deployment Fails:**
1. Check build logs for errors
2. Verify environment variables
3. Test build locally
4. Check authorized domains
5. Revert to previous deployment

### **3. If Performance Degrades:**
1. Check bundle size
2. Profile component rendering
3. Optimize heavy components
4. Review network requests
5. Implement performance monitoring

---

## 📞 **SUPPORT & ESCALATION**

### **Contact Information:**
- **Project Lead**: Drchriszeiter@gmail.com
- **Technical Issues**: Check browser console first
- **Deployment Issues**: Refer to platform-specific guides
- **Authentication Issues**: Check Firebase Console logs

### **Documentation Priority:**
1. This governance document
2. Platform-specific deployment guides
3. Authentication setup documentation
4. Component-specific documentation

---

## ✅ **SUCCESS METRICS**

### **1. Code Quality:**
- No console errors in production
- Consistent component patterns
- Proper error handling implementation
- Mobile-first responsive design maintained

### **2. Performance:**
- Page load time < 3 seconds
- Bundle size < 200KB gzipped
- No memory leaks
- Smooth navigation transitions

### **3. Security:**
- No credentials in source code
- HTTPS enforced in production
- Proper input validation
- Secure authentication flows

### **4. User Experience:**
- Intuitive navigation
- Clear loading states
- Helpful error messages
- Consistent branding

---

**Last Updated**: January 2025
**Version**: 1.0
**Review Schedule**: Monthly or after major changes

This governance document ensures the Team Welly platform maintains its high quality, security standards, and user experience while allowing for sustainable development and enhancement.