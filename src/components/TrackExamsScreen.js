import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileSection from './ProfileSection';
import { userProfile } from '../data/userProfile';

const { width } = Dimensions.get('window');

const TrackExamsScreen = ({ onBack, onMenuPress }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'home', color: '#4CAF50' },
    { id: 'trackExams', name: 'Track Exams', icon: 'calendar', color: '#FF9800' },
    { id: 'attendance', name: 'Attendance', icon: 'checkmark-circle', color: '#2196F3' },
    { id: 'notes', name: 'Notes', icon: 'document-text', color: '#9C27B0' },
    { id: 'homework', name: 'Homework', icon: 'book', color: '#F44336' },
    { id: 'helpDesk', name: 'HelpDesk', icon: 'help-circle', color: '#607D8B' },
    { id: 'results', name: 'Results', icon: 'trophy', color: '#FFD700' },
    { id: 'achievements', name: 'Achievements', icon: 'star', color: '#FF5722' },
    { id: 'faculty', name: 'Faculty', icon: 'people', color: '#795548' },
  ];

  const handleMenuPress = (item) => {
    setSidebarVisible(false);
    if (onMenuPress) {
      onMenuPress(item);
    }
  };

  const handleProfilePress = () => {
    setProfileVisible(true);
  };

  const handleLogout = () => {
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
            Alert.alert('Success', 'Logged out successfully!');
            setProfileVisible(false);
          },
        },
      ]
    );
  };

  const upcomingExams = [
    {
      id: 1,
      subject: 'Data Structures',
      date: '2024-02-15',
      time: '10:00 AM',
      duration: '3 hours',
      type: 'Mid-term',
      room: 'Room 101',
    },
    {
      id: 2,
      subject: 'Database Management',
      date: '2024-02-18',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'Quiz',
      room: 'Room 205',
    },
    {
      id: 3,
      subject: 'Computer Networks',
      date: '2024-02-22',
      time: '9:00 AM',
      duration: '3 hours',
      type: 'Final',
      room: 'Room 103',
    },
  ];

  const pastExams = [
    {
      id: 4,
      subject: 'Mathematics',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: '2 hours',
      type: 'Quiz',
      room: 'Room 201',
      score: '85/100',
    },
    {
      id: 5,
      subject: 'Physics',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'Mid-term',
      room: 'Room 102',
      score: '78/100',
    },
  ];

  const getExamTypeColor = (type) => {
    switch (type) {
      case 'Final': return '#F44336';
      case 'Mid-term': return '#FF9800';
      case 'Quiz': return '#4CAF50';
      default: return '#666';
    }
  };

  const renderExamCard = (exam) => (
    <View key={exam.id} style={styles.examCard}>
      <View style={styles.examHeader}>
        <Text style={styles.subjectName}>{exam.subject}</Text>
        <View style={[styles.typeBadge, { backgroundColor: getExamTypeColor(exam.type) }]}>
          <Text style={styles.typeText}>{exam.type}</Text>
        </View>
      </View>
      
      <View style={styles.examDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.detailText}>{exam.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.detailText}>{exam.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="hourglass" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.detailText}>{exam.duration}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.detailText}>{exam.room}</Text>
        </View>
        {exam.score && (
          <View style={styles.detailRow}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={[styles.detailText, { color: '#FFD700' }]}>Score: {exam.score}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Track Exams</Text>
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profileContainer}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileRole}>Student</Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="rgba(255, 255, 255, 0.7)" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {selectedTab === 'upcoming' ? (
          <View>
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
            {upcomingExams.map(renderExamCard)}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Past Exams</Text>
            {pastExams.map(renderExamCard)}
          </View>
        )}
      </ScrollView>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity onPress={() => setSidebarVisible(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.menuList}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.menuItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Profile Section */}
      <ProfileSection 
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
        userProfile={userProfile}
        onLogout={handleLogout}
      />

      {/* Overlay */}
      {(sidebarVisible || profileVisible) && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => {
            setSidebarVisible(false);
            setProfileVisible(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 44,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  examCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  examDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
  },
  menuButton: {
    padding: 10,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#16213e',
    zIndex: 1000,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuList: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  profileButton: {
    padding: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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

export default TrackExamsScreen;
