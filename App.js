import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import components
import SplashScreen from './src/components/SplashScreen';
import StudentSignup from './src/components/StudentSignup';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';

const App = () => {
  const [currentState, setCurrentState] = useState('splash');

  const handleSplashComplete = () => {
    setCurrentState('login');
  };

  const handleSignupComplete = () => {
    setCurrentState('dashboard');
  };

  const handleLogin = () => {
    setCurrentState('dashboard');
  };

  const handleBack = () => {
    setCurrentState('login');
  };

  const handleSignUp = () => {
    setCurrentState('studentSignup');
  };

  const handleLogout = () => {
    setCurrentState('login');
  };

  return (
    <PaperProvider>
      <StatusBar style="auto" />
      {currentState === 'splash' && (
        <SplashScreen onAnimationComplete={handleSplashComplete} />
      )}
      {currentState === 'studentSignup' && (
        <StudentSignup onBack={handleBack} onComplete={handleSignupComplete} />
      )}
      {currentState === 'login' && (
        <Login onBack={handleBack} onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
      {currentState === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </PaperProvider>
  );
};

export default App;
