import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Import Firebase context
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Import components
import SplashScreen from './src/components/SplashScreen';
import StudentSignup from './src/components/StudentSignup';
import Login from './src/components/Login';
import Dashboard from './src/components/Dashboard';

// Loading component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#FACC15" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

// Main app component with authentication
const AppContent = () => {
  const [currentState, setCurrentState] = useState('splash');
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentState('dashboard');
      } else {
        setCurrentState('login');
      }
    }
  }, [user, loading]);

  const handleSplashComplete = () => {
    if (user) {
      setCurrentState('dashboard');
    } else {
      setCurrentState('login');
    }
  };

  const handleSignupComplete = () => {
    setCurrentState('login');
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
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
    </>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0F1A',
  },
  loadingText: {
    color: '#E6EEF8',
    fontSize: 16,
    marginTop: 20,
  },
});

export default App;
