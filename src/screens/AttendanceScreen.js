import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function AttendanceScreen({ navigation }) {
  const attendanceData = [
    {
      name: 'Present',
      population: 85,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Absent',
      population: 15,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const subjectAttendance = [
    {
      subject: 'Data Structures (BCS-301)',
      present: 18,
      total: 20,
      percentage: 90,
    },
    {
      subject: 'Computer Organization (BCS-302)',
      present: 16,
      total: 20,
      percentage: 80,
    },
    {
      subject: 'Discrete Structures (BCS-303)',
      present: 17,
      total: 20,
      percentage: 85,
    },
    {
      subject: 'Python Programming (BCC-302)',
      present: 19,
      total: 20,
      percentage: 95,
    },
    {
      subject: 'Tech Communication (BAS-301)',
      present: 15,
      total: 20,
      percentage: 75,
    },
    {
      subject: 'Laser System (BOE-312)',
      present: 18,
      total: 20,
      percentage: 90,
    },
  ];

  const overallPercentage = 85;
  const isLowAttendance = overallPercentage < 75;

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

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 75) return '#FF9800';
    return '#F44336';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Low';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Attendance</Text>
        <TouchableOpacity style={styles.markButton} onPress={handleMarkAttendance}>
          <Ionicons name="camera" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Overall Attendance Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Attendance</Text>
          
          <View style={styles.chartContainer}>
            <View style={styles.simpleChart}>
              <View style={styles.chartCircle}>
                <Text style={styles.chartPercentage}>{overallPercentage}%</Text>
                <Text style={styles.chartLabel}>Present</Text>
              </View>
            </View>
          </View>

          <View style={styles.overallStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{overallPercentage}%</Text>
              <Text style={styles.statLabel}>Overall</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85</Text>
              <Text style={styles.statLabel}>Present</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Absent</Text>
            </View>
          </View>

          {/* Low Attendance Warning */}
          {isLowAttendance && (
            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={24} color="#FF5722" />
              <Text style={styles.warningText}>
                Your attendance is low. Please attend classes regularly to maintain good attendance.
              </Text>
            </View>
          )}
        </View>

        {/* Subject-wise Attendance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject-wise Attendance</Text>
          
          {subjectAttendance.map((item, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{item.subject}</Text>
                <View style={[styles.percentageBadge, { backgroundColor: getAttendanceColor(item.percentage) }]}>
                  <Text style={styles.percentageText}>{item.percentage}%</Text>
                </View>
              </View>
              
              <View style={styles.attendanceDetails}>
                <Text style={styles.attendanceText}>
                  {item.present}/{item.total} classes attended
                </Text>
                <Text style={[styles.statusText, { color: getAttendanceColor(item.percentage) }]}>
                  {getAttendanceStatus(item.percentage)}
                </Text>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${item.percentage}%`,
                      backgroundColor: getAttendanceColor(item.percentage)
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Attendance Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance Tips</Text>
          
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>Attend all classes regularly</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="time" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>Be punctual to avoid late marks</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="document-text" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>Submit medical certificates for absences</Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="calendar" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>Check attendance regularly</Text>
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
  markButton: {
    padding: 5,
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
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  simpleChart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
  overallStats: {
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
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#D32F2F',
    marginLeft: 10,
    lineHeight: 20,
  },
  subjectCard: {
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
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  attendanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  attendanceText: {
    fontSize: 12,
    color: '#666',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  tipsContainer: {
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
});
