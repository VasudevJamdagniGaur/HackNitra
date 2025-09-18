import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import components
import SplashScreen from './src/components/SplashScreen';
import RoleSelection from './src/components/RoleSelection';
import StudentSignup from './src/components/StudentSignup';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';

const App = () => {
  const [currentState, setCurrentState] = useState('splash');

  const handleSplashComplete = () => {
    setCurrentState('roleSelection');
  };

  const handleRoleSelect = (role) => {
    // Both students and teachers go to login page
    setCurrentState('login');
  };

  const handleSignupComplete = () => {
    setCurrentState('login');
  };

  const handleLogin = () => {
    setCurrentState('dashboard');
  };

  const handleBack = () => {
    setCurrentState('roleSelection');
  };

  const handleSignUp = () => {
    setCurrentState('studentSignup');
  };

  return (
    <PaperProvider>
      <StatusBar style="auto" />
      {currentState === 'splash' && (
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      )}
      {currentState === 'roleSelection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
      {currentState === 'studentSignup' && (
        <StudentSignup onBack={handleBack} onComplete={handleSignupComplete} />
      )}
      {currentState === 'login' && (
        <Login onBack={handleBack} onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
      {currentState === 'dashboard' && (
        <Dashboard />
      )}
    </PaperProvider>
  );
};

export default App;
