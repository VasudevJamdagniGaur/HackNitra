import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileSection = ({ visible, onClose, userProfile }) => {
  if (!visible) return null;

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
          <Ionicons name="person" size={60} color="#fff" />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.85,
    height: '100%',
    backgroundColor: '#16213e',
    zIndex: 1000,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContent: {
    flex: 1,
    padding: 20,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  profileDetails: {
    gap: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
});

export default ProfileSection;
