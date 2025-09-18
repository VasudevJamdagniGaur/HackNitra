import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/firebaseService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Load user profile data when user is authenticated
        const profileResult = await authService.getUserProfile(user.uid);
        if (profileResult.success) {
          setUserProfile(profileResult.data);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    const result = await authService.signIn(email, password);
    setLoading(false);
    return result;
  };

  const signUp = async (email, password, userData) => {
    setLoading(true);
    const result = await authService.signUp(email, password, userData);
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await authService.signOut();
    setUser(null);
    setUserProfile(null);
    setLoading(false);
    return result;
  };

  const updateUserProfile = async (profileData) => {
    if (user) {
      setLoading(true);
      const result = await authService.saveUserProfile(user.uid, profileData);
      if (result.success) {
        setUserProfile({ ...userProfile, ...profileData });
      }
      setLoading(false);
      return result;
    }
    return { success: false, error: 'No user logged in' };
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
