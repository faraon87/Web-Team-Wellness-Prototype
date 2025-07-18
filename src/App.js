import React, { useState } from 'react';
import { Mail, Building, Users, LogOut, User } from 'lucide-react';
import { useAuth } from './useAuth';

const TeamWellyApp = () => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { user, signInWithGoogle, signInWithApple, signInWithX, signOut, isDemoMode } = useAuth();

  // Handle SSO Sign In
  const handleSSOSignIn = async (provider) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'apple':
          result = await signInWithApple();
          break;
        case 'x':
          result = await signInWithX();
          break;
        default:
          throw new Error('Unknown provider');
      }
      
      if (result.success) {
        // Successfully signed in - could navigate to dashboard
        alert(`Welcome ${result.user.displayName || result.user.email}! → Dashboard`);
      } else {
        setAuthError(result.message);
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      setAuthError('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Button Component
  const LoadingButton = ({ onClick, disabled, className, children }) => (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );

  // User Profile Component
  const UserProfile = () => (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
      <div className="flex items-center space-x-3">
        {user?.photoURL ? (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="text-teal-600" size={24} />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{user?.displayName || 'User'}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="text-red-600 hover:text-red-800 transition-colors"
          disabled={isLoading}
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );

  // Team Welly Logo Component (ONLY the lotus flower, no text)
  const TeamWellyLogo = () => (
    <div className="w-32 h-32 mb-8 flex items-center justify-center">
      <svg version="1.1" width="120" height="120" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        {/* ONLY the lotus flower design - removing all text elements */}
        <path fill="#0F766E" opacity="1.000000" stroke="none" 
          d="M656.824890,258.624451 
          C664.502441,256.175507 671.972900,254.602509 679.491699,253.182129 
          C682.725159,252.571289 685.749695,252.765869 687.501770,255.624832 
          C689.278748,258.524384 688.709778,261.661011 686.612976,264.470581 
          C680.840332,272.205597 674.727478,279.671051 669.768311,288.021271 
          C659.323059,305.609039 653.350769,324.640472 650.310364,344.755707 
          C646.853516,367.625366 648.738342,390.626251 648.382629,413.567657 
          C647.704102,457.333801 634.084656,495.979248 602.902161,527.360657 
          C581.920349,548.476318 556.322815,561.911255 527.871338,570.451843 
          C516.696655,573.806152 506.310577,573.888550 495.291779,569.922791 
          C471.241089,561.266907 448.817444,550.005310 429.638428,532.798645 
          C403.896912,509.704437 388.802643,480.745667 381.608032,447.216675 
          C377.199768,426.672852 377.371765,405.900848 377.754669,385.111816 
          C378.179596,362.041504 376.838501,339.198120 369.824677,317.041321 
          C364.336060,299.702545 355.566864,284.084442 344.110809,269.969299 
          C342.746277,268.287994 341.319489,266.651581 340.043945,264.904999 
          C337.868347,261.926117 336.459686,258.649292 338.802795,255.224045 
          C340.949768,252.085510 344.173523,252.707367 347.408844,253.333679 
          C409.625153,265.377838 457.948639,298.274231 493.431732,350.486237 
          C499.430756,359.313538 504.655792,368.598755 509.739319,377.968811 
          C510.602203,379.559326 511.332703,381.270416 514.191162,382.644226 
          C544.852295,322.246857 591.150085,279.452820 656.824890,258.624451 
          M430.438995,322.083984 
          C418.440125,312.131165 405.709229,303.348572 390.634125,296.502045 
          C391.351654,298.809875 391.647095,300.100983 392.144318,301.309113 
          C402.795776,327.189362 405.478302,354.346893 405.042725,381.990875 
          C404.937866,388.647247 404.628632,395.303009 404.274170,401.951660 
          C404.113495,404.965393 405.066498,406.413635 408.294434,406.910889 
          C419.643463,408.659302 430.955719,410.843475 441.607330,415.243073 
          C475.048950,429.056000 499.176575,451.871887 510.181641,487.146118 
          C510.751709,488.973358 510.802399,491.041107 512.410706,492.537109 
          C513.798706,491.066223 514.333557,489.358337 514.928894,487.613617 
          C524.734558,458.875977 543.356018,437.512604 569.636169,422.674591 
          C584.298523,414.396149 600.223816,409.697144 616.739258,406.960388 
          C620.507202,406.335999 621.839294,404.555481 621.763672,400.964569 
          C621.616211,393.968414 621.875122,386.957336 621.543152,379.972504 
          C620.279907,353.393219 623.435242,327.537323 633.542725,302.733307 
          C634.111755,301.336731 635.495850,299.866974 633.904541,297.986359 
          C633.170837,298.201569 632.323853,298.301147 631.624878,298.676300 
          C596.323242,317.622894 567.872009,343.728394 547.864685,378.705292 
          C538.815002,394.526001 531.944031,411.277496 525.999268,428.456146 
          C523.771667,434.893494 519.266724,438.209503 513.088562,438.341583 
          C506.856628,438.474792 503.225708,435.854614 500.427399,429.045166 
          C499.099670,425.814270 497.919342,422.522064 496.703033,419.246185 
          C482.731445,381.616516 462.854736,348.000610 430.438995,322.083984 
          M453.949799,453.593811 
          C439.611328,443.439941 423.818695,436.542084 405.747040,431.319458 
          C410.061249,459.893372 419.853912,484.439545 438.703552,504.944855 
          C456.018402,523.780640 477.628052,535.311096 501.727661,542.705750 
          C502.995239,540.228943 502.532043,538.636169 502.220032,536.997498 
          C500.819580,529.642395 498.920013,522.420898 496.695953,515.274414 
          C488.981323,490.484924 476.581696,468.931305 453.949799,453.593811 
          M523.379272,539.484375 
          C523.141602,541.884277 524.077942,542.838379 526.578003,542.419922 
          C530.390930,541.781860 532.056702,539.149475 533.358704,535.903076 
          C541.625427,515.291565 551.956726,495.802368 564.966125,477.757812 
          C569.973022,470.813019 574.772217,463.718506 579.857727,456.416901 
          C577.145386,455.876617 575.812683,457.339111 574.365479,458.282104 
          C562.650879,465.915192 553.005859,475.685699 544.901245,487.029205 
          C533.771423,502.606781 527.759216,520.306091 523.379272,539.484375"/>
        
        {/* Center element */}
        <path fill="#065F46" opacity="1.000000" stroke="none" 
          d="M536.831543,234.148361 
          C548.638306,247.396622 550.967529,263.984619 543.417358,278.786865 
          C536.220886,292.895782 522.725098,299.195923 511.085815,298.031464 
          C495.678772,296.490112 483.339294,285.523834 479.802032,271.232269 
          C474.260254,248.842041 486.571136,229.065826 508.961304,225.152054 
          C519.428650,223.322388 528.569702,227.178696 536.831543,234.148361"/>
      </svg>
    </div>
  );

  const LandingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-emerald-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
        
        {/* Team Welly Logo */}
        <TeamWellyLogo />
        
        {/* Brand Text */}
        <h1 className="text-4xl font-bold text-teal-800 mb-2 tracking-wide team-welly-heading">TEAM WELLY</h1>
        <p className="text-base text-teal-600 mb-6 font-medium px-4 leading-relaxed team-welly-body">
          RESTORING YOUR AURA ONE BREATHE AT A TIME
        </p>

        {/* Demo Mode Notification - Only show if in demo mode */}
        {isDemoMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 w-full max-w-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">ⓘ</span>
              </div>
              <p className="text-blue-700 text-sm font-medium">Demo Mode</p>
            </div>
            <p className="text-blue-600 text-xs mt-1 leading-relaxed">
              SSO buttons show demo functionality. For full authentication, set up Firebase following the guide in FIREBASE_SETUP.md
            </p>
          </div>
        )}
        
        {/* Production Mode Success Message */}
        {!isDemoMode && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 w-full max-w-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✅</span>
              </div>
              <p className="text-green-700 text-sm font-medium">Production Mode</p>
            </div>
            <p className="text-green-600 text-xs mt-1 leading-relaxed">
              Firebase connected successfully! All SSO providers are functional.
            </p>
          </div>
        )}
        
        {/* Authentication Options */}
        <div className="w-full max-w-sm space-y-4">
          
          {/* Authentication Error Display */}
          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-700 text-sm text-center">{authError}</p>
              <button
                onClick={() => setAuthError(null)}
                className="text-red-500 hover:text-red-700 text-xs mt-1 block mx-auto"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* User Profile Display */}
          {user && <UserProfile />}

          {/* Quick SSO Options */}
          <div className="space-y-3">
            {/* Google SSO - Using provided SVG */}
            <LoadingButton
              onClick={() => handleSSOSignIn('google')}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg team-welly-button flex items-center justify-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="mr-3">
                <svg width="20" height="20" viewBox="12 10 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_710_6233)">
                    <path d="M31.6 20.2273C31.6 19.5182 31.5364 18.8364 31.4182 18.1818H22V22.05H27.3818C27.15 23.3 26.4455 24.3591 25.3864 25.0682V27.5773H28.6182C30.5091 25.8364 31.6 23.2727 31.6 20.2273Z" fill="#4285F4"/>
                    <path d="M22 30C24.7 30 26.9636 29.1045 28.6181 27.5773L25.3863 25.0682C24.4909 25.6682 23.3454 26.0227 22 26.0227C19.3954 26.0227 17.1909 24.2636 16.4045 21.9H13.0636V24.4909C14.7091 27.7591 18.0909 30 22 30Z" fill="#34A853"/>
                    <path d="M16.4045 21.9C16.2045 21.3 16.0909 20.6591 16.0909 20C16.0909 19.3409 16.2045 18.7 16.4045 18.1V15.5091H13.0636C12.3864 16.8591 12 18.3864 12 20C12 21.6136 12.3864 23.1409 13.0636 24.4909L16.4045 21.9Z" fill="#FBBC04"/>
                    <path d="M22 13.9773C23.4681 13.9773 24.7863 14.4818 25.8227 15.4727L28.6909 12.6045C26.9591 10.9909 24.6954 10 22 10C18.0909 10 14.7091 12.2409 13.0636 15.5091L16.4045 18.1C17.1909 15.7364 19.3954 13.9773 22 13.9773Z" fill="#E94235"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_710_6233">
                      <rect width="20" height="20" fill="white" transform="translate(12 10)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Continue with Google
            </LoadingButton>
            
            {/* Apple SSO - White background with black icon */}
            <LoadingButton
              onClick={() => handleSSOSignIn('apple')}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg team-welly-button flex items-center justify-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
              </div>
              Continue with Apple
            </LoadingButton>
            
            {/* X SSO - White background with black icon */}
            <LoadingButton
              onClick={() => handleSSOSignIn('x')}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg team-welly-button flex items-center justify-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-5 h-5 mr-3 text-black flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              Continue with X
            </LoadingButton>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 team-welly-body">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Email and Corporate Options */}
          <div className="space-y-3">
            <button 
              onClick={() => setCurrentScreen('emailSignup')}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-3 px-4 rounded-lg team-welly-button flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            >
              <Mail size={20} className="mr-3" />
              Sign up with Email
            </button>
            
            <button 
              onClick={() => setCurrentScreen('corporateAuth')}
              className="w-full border-2 border-teal-600 text-teal-600 py-3 px-4 rounded-lg team-welly-button flex items-center justify-center hover:bg-teal-50 transition-all"
            >
              <Building size={20} className="mr-3" />
              Corporate Access
            </button>
          </div>

          {/* Sign In Link */}
          <div className="pt-4">
            <button 
              onClick={() => setCurrentScreen('signin')}
              className="text-teal-600 team-welly-body"
            >
              Already have an account? <span className="underline">Sign in</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative pb-6 text-teal-600 team-welly-body">
        {/* Main Footer Content - Centered */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-3">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/teamwellnesscompany" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-teal-800 transition-colors group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-sm group-hover:underline">@teamwellnesscompany</span>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/team-wellness-company/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-teal-800 transition-colors group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-sm group-hover:underline">LinkedIn</span>
            </a>
          </div>
          
          {/* Email */}
          <p className="text-sm">
            <a 
              href="mailto:Drchriszeiter@gmail.com"
              className="hover:text-teal-800 transition-colors underline"
            >
              Drchriszeiter@gmail.com
            </a>
          </p>
        </div>

        {/* Legal Notice - Right Bottom Corner */}
        <div className="absolute bottom-0 right-6">
          <button 
            onClick={() => alert('Legal Notice functionality coming soon')}
            className="text-xs text-teal-500 hover:text-teal-700 transition-colors cursor-pointer underline"
          >
            Legal Notice
          </button>
        </div>
      </div>
    </div>
  );

  const EmailSignupScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="p-6">
        <button 
          onClick={() => setCurrentScreen('landing')}
          className="text-teal-600 mb-6 flex items-center"
        >
          ← Back
        </button>
        
        <div className="text-center mb-8">
          <TeamWellyLogo />
          <h1 className="text-2xl font-bold text-teal-800 mb-2 team-welly-heading">Create Your Account</h1>
          <p className="text-teal-600 team-welly-body">Start your wellness journey</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="your.email@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <input type="checkbox" className="mt-1" />
            <label className="text-sm text-gray-600 team-welly-body">
              I agree to the <span className="text-teal-600 underline">Terms of Service</span> and <span className="text-teal-600 underline">Privacy Policy</span>
            </label>
          </div>
          
          <button 
            onClick={() => alert('Account created! → Onboarding flow')}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-3 rounded-lg team-welly-button"
          >
            Create Account
          </button>
          
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-500 team-welly-body">
              Choose your plan after account creation
            </div>
            <div className="text-xs text-gray-400 team-welly-body">
              Core ($99) • Flex ($199) • Coaching ($299) • Elite ($499)
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SignInScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="p-6">
        <button 
          onClick={() => setCurrentScreen('landing')}
          className="text-teal-600 mb-6 flex items-center"
        >
          ← Back
        </button>
        
        <div className="text-center mb-8">
          <TeamWellyLogo />
          <h1 className="text-2xl font-bold text-teal-800 mb-2 team-welly-heading">Welcome Back</h1>
          <p className="text-teal-600 team-welly-body">Sign in to continue your wellness journey</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="your.email@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-600 team-welly-body">Remember me</label>
            </div>
            <button className="text-sm text-teal-600 underline team-welly-body">Forgot password?</button>
          </div>
          
          <button 
            onClick={() => alert('Signed in! → Dashboard')}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-3 rounded-lg team-welly-button"
          >
            Sign In
          </button>
          
          <div className="text-center">
            <button 
              onClick={() => setCurrentScreen('emailSignup')}
              className="text-teal-600 text-sm team-welly-body"
            >
              Don't have an account? <span className="underline">Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CorporateAuthScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="p-6">
        <button 
          onClick={() => setCurrentScreen('landing')}
          className="text-teal-600 mb-6 flex items-center"
        >
          ← Back
        </button>
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Building className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-teal-800 mb-2 team-welly-heading">Corporate Access</h1>
          <p className="text-teal-600 team-welly-body">Choose your access type</p>
        </div>

        <div className="space-y-4">
          {/* Employer Access */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                <Building className="text-teal-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 team-welly-heading">Employer / HR Admin</h3>
                <p className="text-sm text-gray-600 team-welly-body">Manage your team's wellness program</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Company domain (e.g., acme.com)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button 
                onClick={() => alert('Redirecting to employer SSO...')}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 rounded-lg team-welly-button"
              >
                Continue with Company SSO
              </button>
              <button className="w-full text-teal-600 text-sm underline team-welly-body">
                Request demo instead
              </button>
            </div>
          </div>

          {/* Employee Access */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 team-welly-heading">Employee Access</h3>
                <p className="text-sm text-gray-600 team-welly-body">Join your company's wellness program</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Company code (ask your HR)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <input 
                type="email" 
                placeholder="Work email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button 
                onClick={() => alert('Sending verification to work email...')}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-lg team-welly-button"
              >
                Verify & Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'landing': return <LandingScreen />;
      case 'emailSignup': return <EmailSignupScreen />;
      case 'signin': return <SignInScreen />;
      case 'corporateAuth': return <CorporateAuthScreen />;
      default: return <LandingScreen />;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default TeamWellyApp;
