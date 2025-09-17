import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultsScreen({ navigation }) {
  const [selectedSemester, setSelectedSemester] = useState(1);

  const semesterData = {
    1: {
      name: 'Semester 1',
      subjects: [
        { code: 'MATH-101', name: 'Mathematics I', sessional1: 85, sessional2: 78, external: 82, practicals: 90, total: 83.75 },
        { code: 'PHYS-101', name: 'Physics', sessional1: 88, sessional2: 85, external: 80, practicals: 92, total: 85.5 },
        { code: 'CHEM-101', name: 'Chemistry', sessional1: 82, sessional2: 88, external: 85, practicals: 87, total: 85.5 },
        { code: 'ENG-101', name: 'English', sessional1: 90, sessional2: 85, external: 88, practicals: 0, total: 87.5 },
        { code: 'CS-101', name: 'Programming Fundamentals', sessional1: 92, sessional2: 88, external: 85, practicals: 95, total: 89.5 },
      ],
      cgpa: 8.6,
      status: 'Passed',
    },
    2: {
      name: 'Semester 2',
      subjects: [
        { code: 'MATH-102', name: 'Mathematics II', sessional1: 87, sessional2: 82, external: 85, practicals: 0, total: 84.5 },
        { code: 'PHYS-102', name: 'Physics Lab', sessional1: 0, sessional2: 0, external: 0, practicals: 88, total: 88 },
        { code: 'CS-102', name: 'Data Structures', sessional1: 90, sessional2: 85, external: 88, practicals: 92, total: 88.5 },
        { code: 'EE-101', name: 'Basic Electronics', sessional1: 85, sessional2: 88, external: 82, practicals: 90, total: 86.25 },
        { code: 'ME-101', name: 'Engineering Graphics', sessional1: 88, sessional2: 85, external: 80, practicals: 0, total: 84.25 },
      ],
      cgpa: 8.7,
      status: 'Passed',
    },
    3: {
      name: 'Semester 3',
      subjects: [
        { code: 'CS-201', name: 'Object Oriented Programming', sessional1: 92, sessional2: 88, external: 85, practicals: 95, total: 89.5 },
        { code: 'CS-202', name: 'Database Management', sessional1: 88, sessional2: 90, external: 87, practicals: 92, total: 89.25 },
        { code: 'CS-203', name: 'Computer Networks', sessional1: 85, sessional2: 87, external: 82, practicals: 88, total: 85.5 },
        { code: 'MATH-201', name: 'Discrete Mathematics', sessional1: 90, sessional2: 85, external: 88, practicals: 0, total: 87.5 },
        { code: 'EE-201', name: 'Digital Electronics', sessional1: 87, sessional2: 85, external: 80, practicals: 90, total: 85.5 },
      ],
      cgpa: 8.8,
      status: 'Passed',
    },
    4: {
      name: 'Semester 4',
      subjects: [
        { code: 'CS-301', name: 'Operating Systems', sessional1: 88, sessional2: 90, external: 85, practicals: 92, total: 88.75 },
        { code: 'CS-302', name: 'Software Engineering', sessional1: 85, sessional2: 87, external: 82, practicals: 88, total: 85.5 },
        { code: 'CS-303', name: 'Computer Architecture', sessional1: 90, sessional2: 88, external: 87, practicals: 90, total: 88.75 },
        { code: 'CS-304', name: 'Web Development', sessional1: 92, sessional2: 88, external: 85, practicals: 95, total: 89.5 },
        { code: 'MATH-301', name: 'Statistics', sessional1: 87, sessional2: 85, external: 80, practicals: 0, total: 84 },
      ],
      cgpa: 8.9,
      status: 'Passed',
    },
    5: {
      name: 'Semester 5',
      subjects: [
        { code: 'CS-401', name: 'Machine Learning', sessional1: 90, sessional2: 88, external: 85, practicals: 92, total: 88.75 },
        { code: 'CS-402', name: 'Data Mining', sessional1: 88, sessional2: 90, external: 87, practicals: 90, total: 88.75 },
        { code: 'CS-403', name: 'Mobile App Development', sessional1: 92, sessional2: 88, external: 85, practicals: 95, total: 89.5 },
        { code: 'CS-404', name: 'Cloud Computing', sessional1: 85, sessional2: 87, external: 82, practicals: 88, total: 85.5 },
        { code: 'CS-405', name: 'Cybersecurity', sessional1: 90, sessional2: 88, external: 85, practicals: 92, total: 88.75 },
      ],
      cgpa: 9.0,
      status: 'Passed',
    },
    6: {
      name: 'Semester 6',
      subjects: [
        { code: 'CS-501', name: 'Artificial Intelligence', sessional1: 92, sessional2: 90, external: 88, practicals: 95, total: 91.25 },
        { code: 'CS-502', name: 'Big Data Analytics', sessional1: 88, sessional2: 90, external: 85, practicals: 92, total: 88.75 },
        { code: 'CS-503', name: 'Blockchain Technology', sessional1: 90, sessional2: 88, external: 87, practicals: 90, total: 88.75 },
        { code: 'CS-504', name: 'IoT Development', sessional1: 87, sessional2: 85, external: 82, practicals: 88, total: 85.5 },
        { code: 'CS-505', name: 'DevOps', sessional1: 90, sessional2: 88, external: 85, practicals: 92, total: 88.75 },
      ],
      cgpa: 9.1,
      status: 'Passed',
    },
    7: {
      name: 'Semester 7',
      subjects: [
        { code: 'CS-601', name: 'Advanced Algorithms', sessional1: 90, sessional2: 88, external: 85, practicals: 92, total: 88.75 },
        { code: 'CS-602', name: 'Distributed Systems', sessional1: 88, sessional2: 90, external: 87, practicals: 90, total: 88.75 },
        { code: 'CS-603', name: 'Computer Vision', sessional1: 92, sessional2: 88, external: 85, practicals: 95, total: 89.5 },
        { code: 'CS-604', name: 'Natural Language Processing', sessional1: 90, sessional2: 88, external: 87, practicals: 92, total: 89.25 },
        { code: 'CS-605', name: 'Project Management', sessional1: 85, sessional2: 87, external: 82, practicals: 0, total: 84.5 },
      ],
      cgpa: 9.2,
      status: 'Passed',
    },
    8: {
      name: 'Semester 8',
      subjects: [
        { code: 'CS-701', name: 'Final Year Project', sessional1: 0, sessional2: 0, external: 0, practicals: 95, total: 95 },
        { code: 'CS-702', name: 'Internship', sessional1: 0, sessional2: 0, external: 0, practicals: 92, total: 92 },
        { code: 'CS-703', name: 'Professional Ethics', sessional1: 88, sessional2: 90, external: 85, practicals: 0, total: 87.75 },
        { code: 'CS-704', name: 'Entrepreneurship', sessional1: 85, sessional2: 87, external: 82, practicals: 0, total: 84.5 },
        { code: 'CS-705', name: 'Research Methodology', sessional1: 90, sessional2: 88, external: 85, practicals: 0, total: 87.5 },
      ],
      cgpa: 9.3,
      status: 'Passed',
    },
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
  };

  const getGradeColor = (total) => {
    if (total >= 90) return '#4CAF50';
    if (total >= 80) return '#8BC34A';
    if (total >= 70) return '#FFC107';
    if (total >= 60) return '#FF9800';
    return '#F44336';
  };

  const getGrade = (total) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  const currentSemester = semesterData[selectedSemester];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Results</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Semester Selector */}
        <View style={styles.semesterSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.keys(semesterData).map((semester) => (
              <TouchableOpacity
                key={semester}
                style={[
                  styles.semesterButton,
                  selectedSemester === parseInt(semester) && styles.selectedSemesterButton,
                ]}
                onPress={() => handleSemesterSelect(parseInt(semester))}
              >
                <Text
                  style={[
                    styles.semesterButtonText,
                    selectedSemester === parseInt(semester) && styles.selectedSemesterButtonText,
                  ]}
                >
                  S{semester}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Semester Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>{currentSemester.name}</Text>
          <View style={styles.overviewStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentSemester.cgpa}</Text>
              <Text style={styles.statLabel}>CGPA</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statusText, { color: getGradeColor(currentSemester.cgpa * 10) }]}>
                {currentSemester.status}
              </Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentSemester.subjects.length}</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
          </View>
        </View>

        {/* Subject-wise Results */}
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Subject-wise Results</Text>
          
          {currentSemester.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectCode}>{subject.code}</Text>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                </View>
                <View style={styles.gradeContainer}>
                  <Text style={[styles.grade, { color: getGradeColor(subject.total) }]}>
                    {getGrade(subject.total)}
                  </Text>
                  <Text style={[styles.totalMarks, { color: getGradeColor(subject.total) }]}>
                    {subject.total}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.marksContainer}>
                <View style={styles.markItem}>
                  <Text style={styles.markLabel}>Sessional 1</Text>
                  <Text style={styles.markValue}>{subject.sessional1 || 'N/A'}</Text>
                </View>
                <View style={styles.markItem}>
                  <Text style={styles.markLabel}>Sessional 2</Text>
                  <Text style={styles.markValue}>{subject.sessional2 || 'N/A'}</Text>
                </View>
                <View style={styles.markItem}>
                  <Text style={styles.markLabel}>External</Text>
                  <Text style={styles.markValue}>{subject.external || 'N/A'}</Text>
                </View>
                <View style={styles.markItem}>
                  <Text style={styles.markLabel}>Practicals</Text>
                  <Text style={styles.markValue}>{subject.practicals || 'N/A'}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Overall Performance */}
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          
          <View style={styles.performanceCard}>
            <View style={styles.performanceItem}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
              <View style={styles.performanceInfo}>
                <Text style={styles.performanceTitle}>Best Subject</Text>
                <Text style={styles.performanceValue}>
                  {currentSemester.subjects.reduce((best, subject) => 
                    subject.total > best.total ? subject : best
                  ).name}
                </Text>
              </View>
            </View>
            
            <View style={styles.performanceItem}>
              <Ionicons name="trending-up" size={24} color="#4CAF50" />
              <View style={styles.performanceInfo}>
                <Text style={styles.performanceTitle}>Average Score</Text>
                <Text style={styles.performanceValue}>
                  {(currentSemester.subjects.reduce((sum, subject) => sum + subject.total, 0) / currentSemester.subjects.length).toFixed(1)}%
                </Text>
              </View>
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
  downloadButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  semesterSelector: {
    marginBottom: 20,
  },
  semesterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedSemesterButton: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  semesterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedSemesterButtonText: {
    color: '#fff',
  },
  overviewCard: {
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
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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
  subjectInfo: {
    flex: 1,
  },
  subjectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 16,
    color: '#333',
  },
  gradeContainer: {
    alignItems: 'center',
  },
  grade: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalMarks: {
    fontSize: 14,
    fontWeight: '500',
  },
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markItem: {
    alignItems: 'center',
    flex: 1,
  },
  markLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  markValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  performanceSection: {
    marginBottom: 20,
  },
  performanceCard: {
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
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  performanceInfo: {
    marginLeft: 15,
    flex: 1,
  },
  performanceTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
