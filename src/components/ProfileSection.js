import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileSection = ({ visible, onClose, userProfile, onLogout }) => {
  if (!visible) return null;

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            if (onLogout) {
              onLogout();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.profileSection}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileContent}>
        <View style={styles.profileAvatar}>
          <Ionicons name="person" size={70} color="#fff" />
        </View>
        
        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            <Ionicons name="person" size={20} color="#4CAF50" />
            <View style={styles.profileItemInfo}>
              <Text style={styles.profileItemLabel}>Name</Text>
              <Text style={styles.profileItemValue}>{userProfile.name}</Text>
            </View>
          </View>
          
          <View style={styles.profileItem}>
            <Ionicons name="book" size={20} color="#4CAF50" />
            <View style={styles.profileItemInfo}>
              <Text style={styles.profileItemLabel}>Course</Text>
              <Text style={styles.profileItemValue}>{userProfile.course}</Text>
            </View>
          </View>
          
          <View style={styles.profileItem}>
            <Ionicons name="card" size={20} color="#4CAF50" />
            <View style={styles.profileItemInfo}>
              <Text style={styles.profileItemLabel}>Roll No.</Text>
              <Text style={styles.profileItemValue}>{userProfile.rollNo}</Text>
            </View>
          </View>
          
          <View style={styles.profileItem}>
            <Ionicons name="school" size={20} color="#4CAF50" />
            <View style={styles.profileItemInfo}>
              <Text style={styles.profileItemLabel}>College</Text>
              <Text style={styles.profileItemValue}>{userProfile.college}</Text>
            </View>
          </View>
          
          <View style={styles.profileItem}>
            <Ionicons name="calendar" size={20} color="#4CAF50" />
            <View style={styles.profileItemInfo}>
              <Text style={styles.profileItemLabel}>Year</Text>
              <Text style={styles.profileItemValue}>{userProfile.year}</Text>
            </View>
          </View>
          
          <View style={styles.profileItem}>
            <Ionicons name="people" size={20} color="#4CAF50" />
            <View style={styles.profileItemInfo}>
              <Text style={styles.profileItemLabel}>Section</Text>
              <Text style={styles.profileItemValue}>{userProfile.section}</Text>
            </View>
          </View>
        </View>
        
        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a2e',
    zIndex: 1000,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContent: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  profileAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    borderWidth: 4,
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileDetails: {
    gap: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItemInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileItemLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  profileItemValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  logoutContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#F44336',
    maxWidth: 200,
    alignSelf: 'center',
    shadowColor: '#F44336',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
});

export default ProfileSection;
