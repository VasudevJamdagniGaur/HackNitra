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
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const TrackExamsScreen = ({ onBack, onMenuPress, onLogout }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const { userProfile: firebaseUserProfile } = useAuth();

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
            setProfileVisible(false);
            if (onLogout) {
              onLogout();
            }
          },
        },
      ]
    );
  };

  const upcomingExams = [
    {
      id: 1,
      subject: 'ST-1',
      date: '2025-10-14',
      time: '10:00 AM',
      duration: '3 days',
      type: 'Sessional',
      room: 'Multiple Rooms',
      endDate: '2025-10-16',
    },
    {
      id: 2,
      subject: 'Make Up Test 1',
      date: '2025-10-30',
      time: '10:00 AM',
      duration: '3 days',
      type: 'Make Up',
      room: 'Multiple Rooms',
      endDate: '2025-11-01',
    },
    {
      id: 3,
      subject: 'Practical Assessment 1',
      date: '2025-11-03',
      time: '10:00 AM',
      duration: '5 days',
      type: 'Practical',
      room: 'Lab Rooms',
      endDate: '2025-11-07',
    },
    {
      id: 4,
      subject: 'ST-2',
      date: '2025-11-24',
      time: '10:00 AM',
      duration: '3 days',
      type: 'Sessional',
      room: 'Multiple Rooms',
      endDate: '2025-11-26',
    },
    {
      id: 5,
      subject: 'Make Up Test 2',
      date: '2025-12-04',
      time: '10:00 AM',
      duration: '3 days',
      type: 'Make Up',
      room: 'Multiple Rooms',
      endDate: '2025-12-06',
    },
    {
      id: 6,
      subject: 'Practical Assessment 2',
      date: '2025-12-08',
      time: '10:00 AM',
      duration: '4 days',
      type: 'Practical',
      room: 'Lab Rooms',
      endDate: '2025-12-11',
    },
  ];

  const pastExams = [];

  const getExamTypeColor = (type) => {
    switch (type) {
      case 'Final': return '#F44336';
      case 'Mid-term': return '#FF9800';
      case 'Quiz': return '#4CAF50';
      case 'Sessional': return '#9C27B0';
      case 'Make Up': return '#FF5722';
      case 'Practical': return '#00BCD4';
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
          <Text style={styles.detailText}>
            {exam.endDate ? `${exam.date} - ${exam.endDate}` : exam.date}
          </Text>
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
              <Text style={styles.profileName}>{(firebaseUserProfile || userProfile).name}</Text>
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
            {pastExams.length > 0 ? (
              pastExams.map(renderExamCard)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={48} color="rgba(255, 255, 255, 0.3)" />
                <Text style={styles.emptyStateText}>No past exams</Text>
                <Text style={styles.emptyStateSubtext}>Your completed exams will appear here</Text>
              </View>
            )}
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
        userProfile={firebaseUserProfile || userProfile}
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default TrackExamsScreen;
