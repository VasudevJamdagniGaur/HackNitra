import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrackExamsScreen({ navigation }) {
  const upcomingExams = [
    {
      id: 1,
      subject: 'Data Structures (BCS-301)',
      date: '2024-01-25',
      time: '10:00 AM - 12:00 PM',
      type: 'Mid-term',
      room: 'Room 101',
      status: 'upcoming',
    },
    {
      id: 2,
      subject: 'Computer Organization (BCS-302)',
      date: '2024-01-28',
      time: '02:00 PM - 04:00 PM',
      type: 'Mid-term',
      room: 'Room 205',
      status: 'upcoming',
    },
    {
      id: 3,
      subject: 'Discrete Structures (BCS-303)',
      date: '2024-02-02',
      time: '10:00 AM - 12:00 PM',
      type: 'Mid-term',
      room: 'Room 103',
      status: 'upcoming',
    },
    {
      id: 4,
      subject: 'Python Programming (BCC-302)',
      date: '2024-02-05',
      time: '02:00 PM - 04:00 PM',
      type: 'Mid-term',
      room: 'Room 301',
      status: 'upcoming',
    },
  ];

  const pastExams = [
    {
      id: 5,
      subject: 'Tech Communication (BAS-301)',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      type: 'Quiz',
      room: 'Room 102',
      status: 'completed',
      score: '85/100',
    },
    {
      id: 6,
      subject: 'Laser System (BOE-312)',
      date: '2024-01-12',
      time: '02:00 PM - 04:00 PM',
      type: 'Assignment',
      room: 'Lab 1',
      status: 'completed',
      score: '92/100',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return '#FF9800';
      case 'completed': return '#4CAF50';
      case 'missed': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'missed': return 'Missed';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Track Exams</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Upcoming Exams Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={20} color="#2E7D32" />
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
          </View>
          
          {upcomingExams.map((exam) => (
            <View key={exam.id} style={styles.examCard}>
              <View style={styles.examHeader}>
                <Text style={styles.subjectName}>{exam.subject}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(exam.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(exam.status)}</Text>
                </View>
              </View>
              
              <View style={styles.examDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{formatDate(exam.date)}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{exam.time}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="school-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{exam.room}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="document-text-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{exam.type}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Past Exams Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Recent Exams</Text>
          </View>
          
          {pastExams.map((exam) => (
            <View key={exam.id} style={styles.examCard}>
              <View style={styles.examHeader}>
                <Text style={styles.subjectName}>{exam.subject}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(exam.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(exam.status)}</Text>
                </View>
              </View>
              
              <View style={styles.examDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{formatDate(exam.date)}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{exam.time}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="school-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{exam.room}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="trophy-outline" size={16} color="#666" />
                  <Text style={[styles.detailText, styles.scoreText]}>{exam.score}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Exam Statistics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="stats-chart" size={20} color="#2E7D32" />
            <Text style={styles.sectionTitle}>Exam Statistics</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>88.5%</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  examCard: {
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
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
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
    color: '#666',
    marginLeft: 8,
  },
  scoreText: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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
});
