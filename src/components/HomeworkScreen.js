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

const HomeworkScreen = ({ onBack, onMenuPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

  const homeworkData = {
    '2024-02-15': [
      {
        id: 1,
        subject: 'Data Structures',
        subjectCode: 'BCS-301',
        title: 'Implement Binary Search Tree',
        description: 'Create a complete BST implementation with insert, delete, and search operations',
        dueDate: '2024-02-20',
        priority: 'high',
      },
      {
        id: 2,
        subject: 'Computer Organization',
        subjectCode: 'BCS-302',
        title: 'Memory Management Assignment',
        description: 'Write a report on different memory management techniques',
        dueDate: '2024-02-22',
        priority: 'medium',
      },
    ],
    '2024-02-14': [
      {
        id: 3,
        subject: 'Discrete Mathematics',
        subjectCode: 'BCS-303',
        title: 'Graph Theory Problems',
        description: 'Solve problems 1-10 from chapter 8',
        dueDate: '2024-02-18',
        priority: 'high',
      },
    ],
    '2024-02-13': [
      {
        id: 4,
        subject: 'Python Programming',
        subjectCode: 'BCC-302',
        title: 'Data Analysis Project',
        description: 'Analyze the given dataset and create visualizations',
        dueDate: '2024-02-25',
        priority: 'low',
      },
    ],
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getSelectedDateHomework = () => {
    return homeworkData[selectedDate] || [];
  };

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
        <Text style={styles.title}>Homework</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Date Picker */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>Select Date</Text>
        <TouchableOpacity style={styles.datePicker}>
          <Ionicons name="calendar" size={20} color="#fff" />
          <Text style={styles.datePickerText}>{formatDate(selectedDate)}</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.homeworkContainer}>
          {getSelectedDateHomework().length > 0 ? (
            getSelectedDateHomework().map((homework) => (
              <View key={homework.id} style={styles.homeworkCard}>
                <View style={styles.homeworkHeader}>
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectCode}>{homework.subjectCode}</Text>
                    <Text style={styles.subjectName}>{homework.subject}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(homework.priority) }]}>
                    <Text style={styles.priorityText}>{homework.priority.toUpperCase()}</Text>
                  </View>
                </View>
                
                <Text style={styles.homeworkTitle}>{homework.title}</Text>
                <Text style={styles.homeworkDescription}>{homework.description}</Text>
                
                <View style={styles.homeworkFooter}>
                  <View style={styles.dueDateContainer}>
                    <Ionicons name="time" size={16} color="rgba(255, 255, 255, 0.7)" />
                    <Text style={styles.dueDateText}>Due: {homework.dueDate}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Details</Text>
                    <Ionicons name="arrow-forward" size={16} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noHomeworkContainer}>
              <Ionicons name="book-outline" size={60} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.noHomeworkText}>No homework for this date</Text>
              <Text style={styles.noHomeworkSubtext}>Select a different date to view homework</Text>
            </View>
          )}
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
  menuButton: {
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
  datePickerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  datePickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  datePickerText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  homeworkContainer: {
    gap: 15,
  },
  homeworkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  homeworkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  homeworkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  homeworkDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: 15,
  },
  homeworkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 5,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 5,
  },
  noHomeworkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noHomeworkText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  noHomeworkSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
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

export default HomeworkScreen;
