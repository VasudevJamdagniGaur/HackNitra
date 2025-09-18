import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screen components
import TrackExamsScreen from './TrackExamsScreen';
import AttendanceScreen from './AttendanceScreen';
import NotesScreen from './NotesScreen';
import HomeworkScreen from './HomeworkScreen';
import HelpDeskScreen from './HelpDeskScreen';
import ResultsScreen from './ResultsScreen';
import AchievementsScreen from './AchievementsScreen';
import FacultyScreen from './FacultyScreen';

// Import shared components
import ProfileButton from './ProfileButton';
import ProfileSection from './ProfileSection';
import QRScanner from './QRScanner';
import AttendanceSubmission from './AttendanceSubmission';
import { userProfile } from '../data/userProfile';

const { width } = Dimensions.get('window');

const Dashboard = ({ onLogout }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [profileVisible, setProfileVisible] = useState(false);
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [attendanceSubmissionVisible, setAttendanceSubmissionVisible] = useState(false);
  const [scannedAttendanceData, setScannedAttendanceData] = useState(null);

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

  const notices = [
    {
      id: 1,
      title: 'Mid-term Examination Schedule',
      date: '2024-01-15',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Library Maintenance Notice',
      date: '2024-01-12',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Sports Week Registration',
      date: '2024-01-10',
      priority: 'low',
    },
  ];

  const handleMenuPress = (item) => {
    setSidebarVisible(false);
    setCurrentScreen(item.id);
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleMarkAttendance = () => {
    setQrScannerVisible(true);
  };

  const handleQRScanned = (attendanceData) => {
    setScannedAttendanceData(attendanceData);
    setQrScannerVisible(false);
    setAttendanceSubmissionVisible(true);
  };

  const handleAttendanceSubmitted = () => {
    setAttendanceSubmissionVisible(false);
    setScannedAttendanceData(null);
    Alert.alert('Success', 'Attendance marked successfully!');
  };

  const handleBackFromScanner = () => {
    setQrScannerVisible(false);
  };

  const handleBackFromSubmission = () => {
    setAttendanceSubmissionVisible(false);
    setScannedAttendanceData(null);
  };

  const handleProfilePress = () => {
    setProfileVisible(true);
  };

  const handleLogout = () => {
    // Close profile and navigate to login
    setProfileVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  // Render different screens based on currentScreen state
  if (currentScreen === 'trackExams') {
    return <TrackExamsScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} onLogout={onLogout} />;
  }

  if (currentScreen === 'attendance') {
    return <AttendanceScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} onLogout={onLogout} />;
  }

  if (currentScreen === 'notes') {
    return <NotesScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} />;
  }

  if (currentScreen === 'homework') {
    return <HomeworkScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} />;
  }

  if (currentScreen === 'helpDesk') {
    return <HelpDeskScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} />;
  }

  if (currentScreen === 'results') {
    return <ResultsScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} />;
  }

  if (currentScreen === 'achievements') {
    return <AchievementsScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} />;
  }

  if (currentScreen === 'faculty') {
    return <FacultyScreen onBack={handleBackToDashboard} onMenuPress={handleMenuPress} />;
  }

  // QR Scanner Screen
  if (qrScannerVisible) {
    return (
      <QRScanner
        onBack={handleBackFromScanner}
        onQRScanned={handleQRScanned}
      />
    );
  }

  // Attendance Submission Screen
  if (attendanceSubmissionVisible && scannedAttendanceData) {
    return (
      <AttendanceSubmission
        attendanceData={scannedAttendanceData}
        onBack={handleBackFromSubmission}
        onSubmit={handleAttendanceSubmitted}
      />
    );
  }

  // Default dashboard view
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Ionicons name="book" size={24} color="#fff" />
          <Text style={styles.title}>Edutrack</Text>
        </View>
        
        <ProfileButton 
          onPress={handleProfilePress}
          userName={userProfile.name}
          userRole="Student"
        />
      </View>

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

      {/* Main Content */}
      <ScrollView style={styles.content}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                  <Text style={styles.welcomeTitle}>Welcome back!</Text>
                  <Text style={styles.welcomeSubtitle}>Here's what's happening today</Text>
                </View>

        {/* Notice Board */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notice Board</Text>
          <View style={styles.noticeContainer}>
            {notices.map((notice) => (
              <View key={notice.id} style={styles.noticeItem}>
                <View style={styles.noticeHeader}>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  <View
                    style={[
                      styles.priorityDot,
                      { backgroundColor: getPriorityColor(notice.priority) },
                    ]}
                  />
                </View>
                <Text style={styles.noticeDate}>{notice.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mark Attendance */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.attendanceButton} onPress={handleMarkAttendance}>
            <View style={styles.attendanceIcon}>
              <Ionicons name="camera" size={30} color="#fff" />
            </View>
            <View style={styles.attendanceText}>
              <Text style={styles.attendanceTitle}>Mark Attendance</Text>
              <Text style={styles.attendanceSubtitle}>Scan QR code to mark your presence</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>


        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Upcoming Exams</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Assignments</Text>
            </View>
          </View>
        </View>
      </ScrollView>

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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
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
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  noticeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  noticeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  noticeDate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  attendanceButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  attendanceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  attendanceText: {
    flex: 1,
  },
  attendanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  attendanceSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
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

export default Dashboard;
