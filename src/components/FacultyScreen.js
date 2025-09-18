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

const FacultyScreen = ({ onBack, onMenuPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

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

  const facultyData = [
    {
      id: 1,
      subjectCode: 'BOE-312',
      subjectName: 'Laser System & Application',
      teacherName: 'Dr. Rishabh Raj',
      department: 'Electronics',
      email: 'rishabh.raj@nitra.ac.in',
      phone: '+91-9876543210',
    },
    {
      id: 2,
      subjectCode: 'BAS-301',
      subjectName: 'Tech Communication',
      teacherName: 'Mr. Partha Basu',
      department: 'Communication',
      email: 'partha.basu@nitra.ac.in',
      phone: '+91-9876543211',
    },
    {
      id: 3,
      subjectCode: 'BCS-301',
      subjectName: 'Data Structures',
      teacherName: 'Ms. Vandana Sharma',
      department: 'Computer Science',
      email: 'vandana.sharma@nitra.ac.in',
      phone: '+91-9876543212',
    },
    {
      id: 4,
      subjectCode: 'BCS-302',
      subjectName: 'COA',
      teacherName: 'Ms. Akansha Rajput',
      department: 'Computer Science',
      email: 'akansha.rajput@nitra.ac.in',
      phone: '+91-9876543213',
    },
    {
      id: 5,
      subjectCode: 'BCS-303',
      subjectName: 'Discrete Structures',
      teacherName: 'Ms. Priyanka Arora',
      department: 'Mathematics',
      email: 'priyanka.arora@nitra.ac.in',
      phone: '+91-9876543214',
    },
    {
      id: 6,
      subjectCode: 'BCC-302',
      subjectName: 'Python Programming',
      teacherName: 'Dr. Rajesh Kumar',
      department: 'Computer Science',
      email: 'rajesh.kumar@nitra.ac.in',
      phone: '+91-9876543215',
    },
    {
      id: 7,
      subjectCode: 'BCS-351',
      subjectName: 'Data Structure Lab',
      teacherName: 'Ms. Vandana Sharma',
      department: 'Computer Science',
      email: 'vandana.sharma@nitra.ac.in',
      phone: '+91-9876543212',
    },
    {
      id: 8,
      subjectCode: 'BCS-352',
      subjectName: 'COA Lab',
      teacherName: 'Ms. Akansha Rajput',
      department: 'Computer Science',
      email: 'akansha.rajput@nitra.ac.in',
      phone: '+91-9876543213',
    },
    {
      id: 9,
      subjectCode: 'BCS-353',
      subjectName: 'WD Workshop',
      teacherName: 'Mr. Nitesh Kumar',
      department: 'Computer Science',
      email: 'nitesh.kumar@nitra.ac.in',
      phone: '+91-9876543216',
    },
    {
      id: 10,
      subjectCode: 'BCC-351',
      subjectName: 'Mini Project or Internship',
      teacherName: 'Asst. Ms. Sanjivani Sharma',
      department: 'Computer Science',
      email: 'sanjivani.sharma@nitra.ac.in',
      phone: '+91-9876543217',
    },
  ];

  const handleContactPress = (faculty) => {
    Alert.alert(
      'Contact Faculty',
      `Name: ${faculty.teacherName}\nEmail: ${faculty.email}\nPhone: ${faculty.phone}`,
      [
        { text: 'Email', onPress: () => {
          Alert.alert('Email', `Email: ${faculty.email}`);
        }},
        { text: 'Call', onPress: () => {
          Alert.alert('Call', `Phone: ${faculty.phone}`);
        }},
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderFacultyCard = (faculty) => (
    <View key={faculty.id} style={styles.facultyCard}>
      <View style={styles.facultyHeader}>
        <View style={styles.subjectCodeContainer}>
          <Text style={styles.subjectCode}>{faculty.subjectCode}</Text>
        </View>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => handleContactPress(faculty)}
        >
          <Ionicons name="mail" size={20} color="#FACC15" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subjectName}>{faculty.subjectName}</Text>
      <Text style={styles.teacherName}>{faculty.teacherName}</Text>
      
      <View style={styles.facultyDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="business" size={16} color="#A9C3FF" />
          <Text style={styles.detailText}>{faculty.department}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="mail" size={16} color="#A9C3FF" />
          <Text style={styles.detailText}>{faculty.email}</Text>
        </View>
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
        <Text style={styles.title}>Faculty</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.facultyContainer}>
          {facultyData.map(renderFacultyCard)}
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
    backgroundColor: '#0B0F1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0F254D',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  facultyContainer: {
    gap: 15,
  },
  facultyCard: {
    backgroundColor: '#0F1724',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  facultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  subjectCodeContainer: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  subjectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  contactButton: {
    padding: 12,
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
    borderRadius: 12,
    shadowColor: '#FACC15',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
    marginBottom: 8,
  },
  teacherName: {
    fontSize: 16,
    color: '#A9C3FF',
    marginBottom: 15,
  },
  facultyDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#A9C3FF',
    marginLeft: 8,
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#0F254D',
    zIndex: 1000,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.06)',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6EEF8',
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
    borderBottomColor: 'rgba(255,255,255,0.06)',
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
    color: '#E6EEF8',
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

export default FacultyScreen;
