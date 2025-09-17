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

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation, route }) {
  const { userType, studentData, rollNumber } = route.params || {};
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'home', screen: 'Dashboard' },
    { id: 'trackExams', name: 'Track Exams', icon: 'calendar', screen: 'TrackExams' },
    { id: 'attendance', name: 'Attendance', icon: 'checkmark-circle', screen: 'Attendance' },
    { id: 'notes', name: 'Notes', icon: 'document-text', screen: 'Notes' },
    { id: 'homework', name: 'Homework', icon: 'book', screen: 'Homework' },
    { id: 'helpDesk', name: 'HelpDesk', icon: 'help-circle', screen: 'HelpDesk' },
    { id: 'results', name: 'Results', icon: 'trophy', screen: 'Results' },
    { id: 'teacherRemarks', name: 'Teacher Remarks', icon: 'chatbubble', screen: 'TeacherRemarks' },
    { id: 'achievements', name: 'Achievements', icon: 'star', screen: 'Achievements' },
    { id: 'faculty', name: 'Faculty', icon: 'people', screen: 'Faculty' },
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

  const handleMenuPress = (screen) => {
    setSidebarVisible(false);
    if (screen !== 'Dashboard') {
      navigation.navigate(screen);
    }
  };

  const handleMarkAttendance = () => {
    Alert.alert(
      'Mark Attendance',
      'Camera will open to scan QR code for attendance.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Camera', onPress: () => {
          // In a real app, this would open the camera
          Alert.alert('Success', 'Attendance marked successfully!');
        }},
      ]
    );
  };

  const handleProfilePress = () => {
    Alert.alert(
      'Profile',
      `User Type: ${userType}\n${studentData ? `Name: ${studentData.name}` : `Roll Number: ${rollNumber}`}`,
      [{ text: 'OK' }]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF5722';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Ionicons name="menu" size={24} color="#2E7D32" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Ionicons name="book" size={24} color="#2E7D32" />
          <Text style={styles.title}>Edutrack</Text>
        </View>
        
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Ionicons name="person-circle" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity onPress={() => setSidebarVisible(false)}>
              <Ionicons name="close" size={24} color="#2E7D32" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.menuList}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.screen)}
              >
                <Ionicons name={item.icon} size={20} color="#2E7D32" />
                <Text style={styles.menuItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Main Content */}
      <ScrollView style={styles.content}>
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
            <Ionicons name="camera" size={30} color="#fff" />
            <Text style={styles.attendanceButtonText}>Mark Attendance</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('TrackExams')}
            >
              <Ionicons name="calendar" size={30} color="#2E7D32" />
              <Text style={styles.quickActionText}>Track Exams</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Attendance')}
            >
              <Ionicons name="checkmark-circle" size={30} color="#2E7D32" />
              <Text style={styles.quickActionText}>Attendance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Notes')}
            >
              <Ionicons name="document-text" size={30} color="#2E7D32" />
              <Text style={styles.quickActionText}>Notes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Homework')}
            >
              <Ionicons name="book" size={30} color="#2E7D32" />
              <Text style={styles.quickActionText}>Homework</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Overlay */}
      {sidebarVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setSidebarVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 8,
  },
  profileButton: {
    padding: 5,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
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
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  noticeContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noticeItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
    color: '#333',
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
    color: '#666',
  },
  attendanceButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  attendanceButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#fff',
    width: '48%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
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
});
