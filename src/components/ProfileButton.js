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
          <Ionicons name="person" size={20} color="#fff" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileRole}>{userRole}</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="rgba(255, 255, 255, 0.7)" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    color: '#fff',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default ProfileButton;
