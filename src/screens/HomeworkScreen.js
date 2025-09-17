import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeworkScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const homeworkData = {
    '2024-01-20': [
      {
        id: 1,
        subject: 'Data Structures (BCS-301)',
        title: 'Implement Binary Search Tree',
        description: 'Create a BST with insert, delete, and search operations',
        dueTime: '11:59 PM',
        priority: 'high',
        status: 'pending',
      },
      {
        id: 2,
        subject: 'Python Programming (BCC-302)',
        title: 'Data Analysis Project',
        description: 'Analyze the given dataset using pandas and matplotlib',
        dueTime: '5:00 PM',
        priority: 'medium',
        status: 'pending',
      },
    ],
    '2024-01-21': [
      {
        id: 3,
        subject: 'Computer Organization (BCS-302)',
        title: 'Assembly Language Assignment',
        description: 'Write assembly code for basic arithmetic operations',
        dueTime: '12:00 PM',
        priority: 'high',
        status: 'pending',
      },
      {
        id: 4,
        subject: 'Tech Communication (BAS-301)',
        title: 'Technical Report',
        description: 'Write a 5-page report on emerging technologies',
        dueTime: '6:00 PM',
        priority: 'low',
        status: 'completed',
      },
    ],
    '2024-01-22': [
      {
        id: 5,
        subject: 'Discrete Structures (BCS-303)',
        title: 'Graph Theory Problems',
        description: 'Solve problems on shortest path algorithms',
        dueTime: '3:00 PM',
        priority: 'medium',
        status: 'pending',
      },
    ],
    '2024-01-23': [
      {
        id: 6,
        subject: 'Laser System (BOE-312)',
        title: 'Research Paper',
        description: 'Submit research paper on laser applications in medicine',
        dueTime: '11:59 PM',
        priority: 'high',
        status: 'pending',
      },
    ],
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'overdue': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'overdue': return 'Overdue';
      default: return status;
    }
  };

  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const handleHomeworkPress = (homework) => {
    Alert.alert(
      homework.title,
      `${homework.description}\n\nDue: ${homework.dueTime}\nPriority: ${homework.priority.toUpperCase()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Mark Complete', onPress: () => {
          Alert.alert('Success', 'Homework marked as complete!');
        }},
      ]
    );
  };

  const getCurrentDateHomework = () => {
    const dateKey = getDateKey(selectedDate);
    return homeworkData[dateKey] || [];
  };

  const getTotalHomework = () => {
    return Object.values(homeworkData).flat().length;
  };

  const getCompletedHomework = () => {
    return Object.values(homeworkData).flat().filter(hw => hw.status === 'completed').length;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Homework</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getTotalHomework()}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getCompletedHomework()}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{getTotalHomework() - getCompletedHomework()}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => handleDateChange('prev')}
          >
            <Ionicons name="chevron-back" size={20} color="#2E7D32" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.dateDisplay}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            <Ionicons name="calendar" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => handleDateChange('next')}
          >
            <Ionicons name="chevron-forward" size={20} color="#2E7D32" />
          </TouchableOpacity>
        </View>

        {/* Homework List */}
        <View style={styles.homeworkSection}>
          <Text style={styles.sectionTitle}>
            Homework for {formatDateShort(selectedDate)}
          </Text>
          
          {getCurrentDateHomework().length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
              <Text style={styles.emptyText}>No homework for this date</Text>
              <Text style={styles.emptySubtext}>You're all caught up!</Text>
            </View>
          ) : (
            getCurrentDateHomework().map((homework) => (
              <TouchableOpacity
                key={homework.id}
                style={styles.homeworkCard}
                onPress={() => handleHomeworkPress(homework)}
              >
                <View style={styles.homeworkHeader}>
                  <Text style={styles.homeworkTitle}>{homework.title}</Text>
                  <View style={styles.homeworkBadges}>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(homework.priority) }]}>
                      <Text style={styles.badgeText}>{homework.priority.toUpperCase()}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(homework.status) }]}>
                      <Text style={styles.badgeText}>{getStatusText(homework.status)}</Text>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.homeworkSubject}>{homework.subject}</Text>
                <Text style={styles.homeworkDescription}>{homework.description}</Text>
                
                <View style={styles.homeworkFooter}>
                  <View style={styles.dueTimeContainer}>
                    <Ionicons name="time" size={16} color="#666" />
                    <Text style={styles.dueTimeText}>Due: {homework.dueTime}</Text>
                  </View>
                  
                  {homework.status === 'pending' && (
                    <TouchableOpacity style={styles.completeButton}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <Text style={styles.modalSubtitle}>Choose a date to view homework</Text>
            
            <View style={styles.dateList}>
              {Object.keys(homeworkData).map((dateKey) => {
                const date = new Date(dateKey);
                return (
                  <TouchableOpacity
                    key={dateKey}
                    style={[
                      styles.dateOption,
                      getDateKey(selectedDate) === dateKey && styles.selectedDateOption
                    ]}
                    onPress={() => {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }}
                  >
                    <Text style={[
                      styles.dateOptionText,
                      getDateKey(selectedDate) === dateKey && styles.selectedDateOptionText
                    ]}>
                      {formatDate(date)}
                    </Text>
                    <Text style={styles.homeworkCount}>
                      {homeworkData[dateKey].length} homework
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
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
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  addButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateButton: {
    padding: 10,
  },
  dateDisplay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 8,
  },
  homeworkSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
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
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  homeworkCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
  homeworkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  homeworkBadges: {
    flexDirection: 'row',
    gap: 5,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  homeworkSubject: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
    marginBottom: 5,
  },
  homeworkDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  homeworkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateList: {
    maxHeight: 300,
  },
  dateOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  selectedDateOption: {
    backgroundColor: '#2E7D32',
  },
  dateOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedDateOptionText: {
    color: '#fff',
  },
  homeworkCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
