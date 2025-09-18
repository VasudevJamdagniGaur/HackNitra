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
  const [selectedDate, setSelectedDate] = useState('2024-09-10');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [homeworkData, setHomeworkData] = useState({
    '2024-09-10': [
      {
        id: 1,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Linear Regression Implementation',
        description: 'Implement linear regression from scratch using numpy and compare with sklearn',
        dueDate: '2024-09-12',
        priority: 'high',
        completed: false,
      },
      {
        id: 2,
        subject: 'Data Structures',
        subjectCode: 'BCS-301',
        title: 'Neural Network Basics',
        description: 'Study perceptron algorithm and implement single-layer neural network',
        dueDate: '2024-09-11',
        priority: 'high',
        completed: false,
      },
      {
        id: 3,
        subject: 'Mathematics for AI',
        subjectCode: 'BCS-402',
        title: 'Calculus and Optimization',
        description: 'Solve gradient descent problems and partial derivatives',
        dueDate: '2024-09-13',
        priority: 'medium',
        completed: false,
      },
      {
        id: 4,
        subject: 'Python Programming',
        subjectCode: 'BCC-302',
        title: 'Pandas Data Manipulation',
        description: 'Practice data cleaning and preprocessing using pandas',
        dueDate: '2024-09-11',
        priority: 'medium',
        completed: false,
      },
      {
        id: 5,
        subject: 'Statistics',
        subjectCode: 'BCS-403',
        title: 'Probability Distributions',
        description: 'Solve problems on normal, binomial, and Poisson distributions',
        dueDate: '2024-09-12',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-11': [
      {
        id: 6,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Logistic Regression Project',
        description: 'Build a classification model using logistic regression on real dataset',
        dueDate: '2024-09-13',
        priority: 'high',
        completed: false,
      },
      {
        id: 7,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'TensorFlow Basics',
        description: 'Complete TensorFlow tutorial and create first neural network',
        dueDate: '2024-09-12',
        priority: 'high',
        completed: false,
      },
      {
        id: 8,
        subject: 'Data Visualization',
        subjectCode: 'BCS-405',
        title: 'Matplotlib and Seaborn',
        description: 'Create comprehensive data visualizations for ML dataset',
        dueDate: '2024-09-13',
        priority: 'medium',
        completed: false,
      },
      {
        id: 9,
        subject: 'Algorithms',
        subjectCode: 'BCS-301',
        title: 'K-Means Clustering',
        description: 'Implement K-means algorithm and apply to customer segmentation',
        dueDate: '2024-09-14',
        priority: 'medium',
        completed: false,
      },
      {
        id: 10,
        subject: 'Database Systems',
        subjectCode: 'BCS-306',
        title: 'SQL for Data Science',
        description: 'Write complex queries for data extraction and analysis',
        dueDate: '2024-09-12',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-12': [
      {
        id: 11,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Decision Trees and Random Forest',
        description: 'Implement decision tree algorithm and compare with ensemble methods',
        dueDate: '2024-09-14',
        priority: 'high',
        completed: false,
      },
      {
        id: 12,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'Backpropagation Algorithm',
        description: 'Study and implement backpropagation for multi-layer neural networks',
        dueDate: '2024-09-13',
        priority: 'high',
        completed: false,
      },
      {
        id: 13,
        subject: 'Computer Vision',
        subjectCode: 'BCS-406',
        title: 'Image Processing Basics',
        description: 'Learn OpenCV and implement basic image filtering techniques',
        dueDate: '2024-09-14',
        priority: 'medium',
        completed: false,
      },
      {
        id: 14,
        subject: 'Natural Language Processing',
        subjectCode: 'BCS-407',
        title: 'Text Preprocessing',
        description: 'Implement tokenization, stemming, and text cleaning techniques',
        dueDate: '2024-09-15',
        priority: 'medium',
        completed: false,
      },
      {
        id: 15,
        subject: 'Mathematics for AI',
        subjectCode: 'BCS-402',
        title: 'Linear Algebra Applications',
        description: 'Solve matrix operations and eigenvalue problems for ML',
        dueDate: '2024-09-13',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-13': [
      {
        id: 16,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Support Vector Machines',
        description: 'Implement SVM classifier and tune hyperparameters',
        dueDate: '2024-09-15',
        priority: 'high',
        completed: false,
      },
      {
        id: 17,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'Convolutional Neural Networks',
        description: 'Build CNN model for image classification using CIFAR-10 dataset',
        dueDate: '2024-09-16',
        priority: 'high',
        completed: false,
      },
      {
        id: 18,
        subject: 'Data Mining',
        subjectCode: 'BCS-408',
        title: 'Association Rule Mining',
        description: 'Implement Apriori algorithm for market basket analysis',
        dueDate: '2024-09-15',
        priority: 'medium',
        completed: false,
      },
      {
        id: 19,
        subject: 'Python Programming',
        subjectCode: 'BCC-302',
        title: 'Scikit-learn Pipeline',
        description: 'Create ML pipeline with data preprocessing and model training',
        dueDate: '2024-09-14',
        priority: 'medium',
        completed: false,
      },
      {
        id: 20,
        subject: 'Statistics',
        subjectCode: 'BCS-403',
        title: 'Hypothesis Testing',
        description: 'Perform statistical tests for model evaluation and validation',
        dueDate: '2024-09-14',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-15': [
      {
        id: 21,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Weekend ML Project',
        description: 'Complete end-to-end ML project: data collection, preprocessing, modeling, and evaluation',
        dueDate: '2024-09-17',
        priority: 'high',
        completed: false,
      },
      {
        id: 22,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'Neural Network Architecture Design',
        description: 'Design custom neural network architecture for specific problem domain',
        dueDate: '2024-09-16',
        priority: 'high',
        completed: false,
      },
      {
        id: 23,
        subject: 'Computer Vision',
        subjectCode: 'BCS-406',
        title: 'Image Classification Project',
        description: 'Build complete image classification pipeline using transfer learning',
        dueDate: '2024-09-17',
        priority: 'medium',
        completed: false,
      },
      {
        id: 24,
        subject: 'Natural Language Processing',
        subjectCode: 'BCS-407',
        title: 'Text Classification Model',
        description: 'Create text classifier for news article categorization',
        dueDate: '2024-09-16',
        priority: 'medium',
        completed: false,
      },
      {
        id: 25,
        subject: 'Data Visualization',
        subjectCode: 'BCS-405',
        title: 'ML Results Dashboard',
        description: 'Create comprehensive dashboard showing model performance and insights',
        dueDate: '2024-09-17',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-16': [
      {
        id: 26,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Ensemble Methods',
        description: 'Implement bagging, boosting, and stacking techniques',
        dueDate: '2024-09-18',
        priority: 'high',
        completed: false,
      },
      {
        id: 27,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'Recurrent Neural Networks',
        description: 'Build RNN for time series prediction and text generation',
        dueDate: '2024-09-17',
        priority: 'high',
        completed: false,
      },
      {
        id: 28,
        subject: 'Computer Vision',
        subjectCode: 'BCS-406',
        title: 'Object Detection',
        description: 'Implement YOLO algorithm for real-time object detection',
        dueDate: '2024-09-18',
        priority: 'medium',
        completed: false,
      },
      {
        id: 29,
        subject: 'Natural Language Processing',
        subjectCode: 'BCS-407',
        title: 'Sentiment Analysis',
        description: 'Build sentiment classifier using machine learning techniques',
        dueDate: '2024-09-17',
        priority: 'medium',
        completed: false,
      },
      {
        id: 30,
        subject: 'Data Visualization',
        subjectCode: 'BCS-405',
        title: 'Interactive Dashboards',
        description: 'Create interactive ML model dashboard using Plotly and Streamlit',
        dueDate: '2024-09-18',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-17': [
      {
        id: 31,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Model Evaluation and Validation',
        description: 'Implement cross-validation and performance metrics for ML models',
        dueDate: '2024-09-19',
        priority: 'high',
        completed: false,
      },
      {
        id: 32,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'Transfer Learning',
        description: 'Apply pre-trained models for custom image classification tasks',
        dueDate: '2024-09-18',
        priority: 'high',
        completed: false,
      },
      {
        id: 33,
        subject: 'Reinforcement Learning',
        subjectCode: 'BCS-409',
        title: 'Q-Learning Algorithm',
        description: 'Implement Q-learning for simple game environment',
        dueDate: '2024-09-19',
        priority: 'medium',
        completed: false,
      },
      {
        id: 34,
        subject: 'Data Mining',
        subjectCode: 'BCS-408',
        title: 'Clustering Analysis',
        description: 'Apply hierarchical and density-based clustering algorithms',
        dueDate: '2024-09-18',
        priority: 'medium',
        completed: false,
      },
      {
        id: 35,
        subject: 'Mathematics for AI',
        subjectCode: 'BCS-402',
        title: 'Information Theory',
        description: 'Study entropy, mutual information, and KL divergence',
        dueDate: '2024-09-18',
        priority: 'low',
        completed: false,
      },
    ],
    '2024-09-18': [
      {
        id: 36,
        subject: 'Machine Learning',
        subjectCode: 'BCS-401',
        title: 'Feature Engineering',
        description: 'Create and select optimal features for ML model performance',
        dueDate: '2024-09-20',
        priority: 'high',
        completed: false,
      },
      {
        id: 37,
        subject: 'Deep Learning',
        subjectCode: 'BCS-404',
        title: 'Generative Adversarial Networks',
        description: 'Implement GAN for image generation and data augmentation',
        dueDate: '2024-09-19',
        priority: 'high',
        completed: false,
      },
      {
        id: 38,
        subject: 'Computer Vision',
        subjectCode: 'BCS-406',
        title: 'Image Segmentation',
        description: 'Implement semantic segmentation using deep learning',
        dueDate: '2024-09-20',
        priority: 'medium',
        completed: false,
      },
      {
        id: 39,
        subject: 'Natural Language Processing',
        subjectCode: 'BCS-407',
        title: 'Word Embeddings',
        description: 'Implement Word2Vec and GloVe for text representation',
        dueDate: '2024-09-19',
        priority: 'medium',
        completed: false,
      },
      {
        id: 40,
        subject: 'Python Programming',
        subjectCode: 'BCC-302',
        title: 'ML Model Deployment',
        description: 'Deploy trained model using Flask and create API endpoints',
        dueDate: '2024-09-20',
        priority: 'low',
        completed: false,
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
    backgroundColor: '#0B0F1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
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
    color: '#E6EEF8',
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1724',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#E6EEF8',
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
    backgroundColor: '#0F1724',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
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
    color: '#E6EEF8',
    marginBottom: 8,
  },
  homeworkDescription: {
    fontSize: 14,
    color: '#A9C3FF',
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
    color: '#E6EEF8',
    marginTop: 20,
    marginBottom: 8,
  },
  noHomeworkSubtext: {
    fontSize: 14,
    color: '#A9C3FF',
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
    width: width < 768 ? width : Math.min(width * 0.2, 280),
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