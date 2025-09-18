import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const HomeworkScreen = ({ onBack, onMenuPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [homeworkData, setHomeworkData] = useState({
    '2024-02-15': [
      {
        id: 1,
        subject: 'Data Structures',
        subjectCode: 'BCS-301',
        title: 'Implement Binary Search Tree',
        description: 'Create a complete BST implementation with insert, delete, and search operations',
        dueDate: '2024-02-20',
        priority: 'high',
        completed: false,
      },
      {
        id: 2,
        subject: 'Computer Organization',
        subjectCode: 'BCS-302',
        title: 'Assembly Language Programming',
        description: 'Write assembly code for basic arithmetic operations',
        dueDate: '2024-02-18',
        priority: 'medium',
        completed: true,
      },
    ],
    '2024-02-16': [
      {
        id: 3,
        subject: 'Discrete Mathematics',
        subjectCode: 'BCS-303',
        title: 'Graph Theory Problems',
        description: 'Solve 10 problems on graph theory and combinatorics',
        dueDate: '2024-02-22',
        priority: 'high',
        completed: false,
      },
    ],
    '2024-02-17': [
      {
        id: 4,
        subject: 'Python Programming',
        subjectCode: 'BCC-302',
        title: 'Data Analysis Project',
        description: 'Analyze dataset using pandas and matplotlib',
        dueDate: '2024-02-25',
        priority: 'medium',
        completed: false,
      },
      {
        id: 5,
        subject: 'Web Development',
        subjectCode: 'BCS-353',
        title: 'React Component Library',
        description: 'Create reusable React components',
        dueDate: '2024-02-28',
        priority: 'low',
        completed: true,
      },
    ],
  });

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

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setCalendarVisible(false);
  };

  const toggleHomeworkCompletion = (homeworkId) => {
    setHomeworkData(prevData => {
      const newData = { ...prevData };
      const homework = newData[selectedDate]?.find(h => h.id === homeworkId);
      if (homework) {
        homework.completed = !homework.completed;
      }
      return newData;
    });
  };

  const getMarkedDates = () => {
    const marked = {};
    Object.keys(homeworkData).forEach(date => {
      const hasIncomplete = homeworkData[date].some(hw => !hw.completed);
      if (hasIncomplete) {
        marked[date] = {
          marked: true,
          dotColor: '#F44336',
          selectedColor: '#F44336',
        };
      } else if (homeworkData[date].length > 0) {
        marked[date] = {
          marked: true,
          dotColor: '#4CAF50',
          selectedColor: '#4CAF50',
        };
      }
    });
    
    // Mark selected date
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: '#4CAF50',
    };
    
    return marked;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'alert-circle';
      case 'medium': return 'time';
      case 'low': return 'checkmark-circle';
      default: return 'circle';
    }
  };

  const currentHomework = homeworkData[selectedDate] || [];

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

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <Text style={styles.dateLabel}>Select Date</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setCalendarVisible(true)}
        >
          <Ionicons name="calendar" size={20} color="#fff" />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <Ionicons name="chevron-down" size={16} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>

      {/* Homework List */}
      <ScrollView style={styles.content}>
        <View style={styles.homeworkContainer}>
          {currentHomework.length > 0 ? (
            currentHomework.map((homework) => (
              <View key={homework.id} style={styles.homeworkCard}>
                <TouchableOpacity 
                  style={styles.homeworkHeader}
                  onPress={() => toggleHomeworkCompletion(homework.id)}
                >
                  <View style={styles.homeworkInfo}>
                    <View style={styles.subjectContainer}>
                      <Text style={styles.subjectCode}>{homework.subjectCode}</Text>
                      <Text style={styles.subjectName}>{homework.subject}</Text>
                    </View>
                    <View style={styles.priorityContainer}>
                      <Ionicons 
                        name={getPriorityIcon(homework.priority)} 
                        size={16} 
                        color={getPriorityColor(homework.priority)} 
                      />
                      <Text style={[styles.priorityText, { color: getPriorityColor(homework.priority) }]}>
                        {homework.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={[
                    styles.checkbox,
                    homework.completed && styles.checkboxCompleted
                  ]}>
                    {homework.completed && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
                
                <View style={styles.homeworkContent}>
                  <Text style={styles.homeworkTitle}>{homework.title}</Text>
                  <Text style={styles.homeworkDescription}>{homework.description}</Text>
                  <View style={styles.homeworkFooter}>
                    <View style={styles.dueDateContainer}>
                      <Ionicons name="time" size={14} color="rgba(255, 255, 255, 0.7)" />
                      <Text style={styles.dueDateText}>Due: {homework.dueDate}</Text>
                    </View>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: homework.completed ? '#4CAF50' : '#F44336' }
                    ]}>
                      <Text style={styles.statusText}>
                        {homework.completed ? 'COMPLETED' : 'PENDING'}
                      </Text>
                    </View>
                  </View>
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

      {/* Calendar Modal */}
      <Modal
        visible={calendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setCalendarVisible(false)}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={getMarkedDates()}
              theme={{
                backgroundColor: '#1a1a2e',
                calendarBackground: '#1a1a2e',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#4CAF50',
                selectedDayTextColor: '#fff',
                todayTextColor: '#4CAF50',
                dayTextColor: '#fff',
                textDisabledColor: 'rgba(255, 255, 255, 0.3)',
                arrowColor: '#4CAF50',
                monthTextColor: '#fff',
                indicatorColor: '#4CAF50',
                textDayFontWeight: '500',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '500',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              style={styles.calendar}
            />
          </View>
        </View>
      </Modal>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 44,
  },
  dateSelector: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  homeworkContainer: {
    paddingVertical: 20,
  },
  homeworkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 16,
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
  homeworkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  homeworkInfo: {
    flex: 1,
  },
  subjectContainer: {
    marginBottom: 8,
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
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  homeworkContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  homeworkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  homeworkDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: 12,
  },
  homeworkFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  noHomeworkContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  noHomeworkText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
  },
  noHomeworkSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: '80%',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 8,
  },
  calendar: {
    borderRadius: 16,
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
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default HomeworkScreen;