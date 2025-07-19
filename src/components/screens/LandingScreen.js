import React, { useState } from 'react';
import { Building, LogOut, User } from 'lucide-react';

const LandingScreen = ({ user, onSSOSignIn, onSignOut, isLoading, authError, setAuthError, isDemoMode }) => {
  const [currentAuthMethod, setCurrentAuthMethod] = useState('individual');

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
          onClick={onSignOut}
          className="text-red-600 hover:text-red-800 transition-colors"
          disabled={isLoading}
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );

  return (
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
              onClick={() => onSSOSignIn('google')}
              className="w-full bg-white text-gray-700 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </LoadingButton>

            {/* Apple SSO */}
            <LoadingButton
              onClick={() => onSSOSignIn('apple')}
              className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Continue with Apple</span>
            </LoadingButton>

            {/* X/Twitter SSO */}
            <LoadingButton
              onClick={() => onSSOSignIn('x')}
              className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Continue with X</span>
            </LoadingButton>
          </div>

          {/* Auth Method Toggle */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentAuthMethod('individual')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  currentAuthMethod === 'individual'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <User size={16} />
                  <span>Individual</span>
                </div>
              </button>
              <button
                onClick={() => setCurrentAuthMethod('corporate')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  currentAuthMethod === 'corporate'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Building size={16} />
                  <span>Corporate</span>
                </div>
              </button>
            </div>
          </div>

          {/* Corporate Auth Info */}
          {currentAuthMethod === 'corporate' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Building className="text-blue-600" size={16} />
                <p className="text-blue-700 text-sm font-medium">Corporate Access</p>
              </div>
              <p className="text-blue-600 text-xs leading-relaxed">
                Contact your organization's administrator to set up team wellness access for your company.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingScreen; 