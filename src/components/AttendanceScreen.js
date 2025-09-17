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

const { width } = Dimensions.get('window');

const AttendanceScreen = ({ onBack, onMenuPress }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'home', color: '#4CAF50' },
    { id: 'trackExams', name: 'Track Exams', icon: 'calendar', color: '#FF9800' },
    { id: 'attendance', name: 'Attendance', icon: 'checkmark-circle', color: '#2196F3' },
    { id: 'notes', name: 'Notes', icon: 'document-text', color: '#9C27B0' },
    { id: 'homework', name: 'Homework', icon: 'book', color: '#F44336' },
    { id: 'helpDesk', name: 'HelpDesk', icon: 'help-circle', color: '#607D8B' },
    { id: 'results', name: 'Results', icon: 'trophy', color: '#FFD700' },
    { id: 'teacherRemarks', name: 'Teacher Remarks', icon: 'chatbubble', color: '#E91E63' },
    { id: 'achievements', name: 'Achievements', icon: 'star', color: '#FF5722' },
    { id: 'faculty', name: 'Faculty', icon: 'people', color: '#795548' },
  ];

  const handleMenuPress = (item) => {
    setSidebarVisible(false);
    if (onMenuPress) {
      onMenuPress(item);
    }
  };

  const attendanceData = {
    overall: 85,
    monthly: 90,
    weekly: 88,
  };

  const subjects = [
    { name: 'Data Structures', present: 18, total: 20, percentage: 90 },
    { name: 'Database Management', present: 16, total: 18, percentage: 89 },
    { name: 'Computer Networks', present: 17, total: 20, percentage: 85 },
    { name: 'Mathematics', present: 19, total: 20, percentage: 95 },
    { name: 'Physics', present: 15, total: 18, percentage: 83 },
  ];

  const recentAttendance = [
    { date: '2024-02-10', subject: 'Data Structures', status: 'Present', time: '10:00 AM' },
    { date: '2024-02-09', subject: 'Database Management', status: 'Present', time: '2:00 PM' },
    { date: '2024-02-08', subject: 'Computer Networks', status: 'Absent', time: '9:00 AM' },
    { date: '2024-02-07', subject: 'Mathematics', status: 'Present', time: '11:00 AM' },
    { date: '2024-02-06', subject: 'Physics', status: 'Present', time: '3:00 PM' },
  ];

  const getStatusColor = (status) => {
    return status === 'Present' ? '#4CAF50' : '#F44336';
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 75) return '#FF9800';
    return '#F44336';
  };

  const handleMarkAttendance = () => {
    Alert.alert(
      'Mark Attendance',
      'Camera will open to scan QR code for attendance.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Camera', onPress: () => {
          Alert.alert('Success', 'Attendance marked successfully!');
        }},
      ]
    );
  };

  const renderCircularChart = (percentage) => (
    <View style={styles.chartContainer}>
      <View style={[styles.chartCircle, { borderColor: getPercentageColor(percentage) }]}>
        <Text style={[styles.chartText, { color: getPercentageColor(percentage) }]}>
          {percentage}%
        </Text>
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
        <Text style={styles.title}>Attendance</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Overall Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Attendance</Text>
          <View style={styles.statsContainer}>
            {renderCircularChart(attendanceData.overall)}
            <View style={styles.statsInfo}>
              <Text style={styles.statsLabel}>Overall</Text>
              <Text style={styles.statsValue}>{attendanceData.overall}%</Text>
            </View>
          </View>
        </View>

        {/* Mark Attendance Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.markAttendanceButton} onPress={handleMarkAttendance}>
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

        {/* Subject-wise Attendance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject-wise Attendance</Text>
          <View style={styles.subjectsContainer}>
            {subjects.map((subject, index) => (
              <View key={index} style={styles.subjectCard}>
                <View style={styles.subjectHeader}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={[styles.subjectPercentage, { color: getPercentageColor(subject.percentage) }]}>
                    {subject.percentage}%
                  </Text>
                </View>
                <View style={styles.subjectStats}>
                  <Text style={styles.subjectStatsText}>
                    {subject.present}/{subject.total} classes
                  </Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${subject.percentage}%`,
                          backgroundColor: getPercentageColor(subject.percentage)
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Attendance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Attendance</Text>
          <View style={styles.recentContainer}>
            {recentAttendance.map((record, index) => (
              <View key={index} style={styles.recentItem}>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentSubject}>{record.subject}</Text>
                  <Text style={styles.recentDate}>{record.date} at {record.time}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(record.status) }]}>
                  <Text style={styles.statusText}>{record.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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

      {/* Overlay */}
      {sidebarVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setSidebarVisible(false)}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartContainer: {
    marginRight: 20,
  },
  chartCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsInfo: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  markAttendanceButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
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
  subjectsContainer: {
    gap: 15,
  },
  subjectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
  },
  subjectPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subjectStats: {
    gap: 8,
  },
  subjectStatsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  recentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  recentInfo: {
    flex: 1,
  },
  recentSubject: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
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
});

export default AttendanceScreen;
