import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileButton = ({ onPress, userName = 'John Doe', userRole = 'Student' }) => {
  return (
    <TouchableOpacity 
      style={styles.profileButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={20} color="#E6EEF8" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileRole}>{userRole}</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#A9C3FF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    padding: 8,
    borderRadius: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1724',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileInfo: {
    marginRight: 8,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E6EEF8',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#A9C3FF',
  },
});

export default ProfileButton;
