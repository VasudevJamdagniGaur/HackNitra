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

const ResultsScreen = ({ onBack, onMenuPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

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

  const semesters = [
    { id: 1, name: 'Semester 1', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'] },
    { id: 2, name: 'Semester 2', subjects: ['Mathematics II', 'Programming', 'Electronics', 'Communication'] },
    { id: 3, name: 'Semester 3', subjects: ['Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Python'] },
    { id: 4, name: 'Semester 4', subjects: ['Algorithms', 'Database Systems', 'Operating Systems', 'Web Development'] },
    { id: 5, name: 'Semester 5', subjects: ['Software Engineering', 'Computer Networks', 'Machine Learning', 'Mobile Development'] },
    { id: 6, name: 'Semester 6', subjects: ['Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'Project Management'] },
    { id: 7, name: 'Semester 7', subjects: ['Advanced Algorithms', 'Distributed Systems', 'Data Science', 'Internship'] },
    { id: 8, name: 'Semester 8', subjects: ['Final Project', 'Thesis', 'Industry Training', 'Capstone Project'] },
  ];

  const getResultsData = (semesterId) => {
    // Only show data for semester 1
    if (semesterId > 1) {
      return null;
    }
    
    // Semester 1 subjects data
    if (semesterId === 1) {
      return {
        subjects: [
          { code: 'BAS101', name: 'Engineering Physics', type: 'Theory', sessional1: 10, sessional2: 39, external: 0, practical: 0, grade: 'D' },
          { code: 'BAS103', name: 'Engineering Mathematics-I', type: 'Theory', sessional1: 6, sessional2: 3, external: 0, practical: 0, grade: 'F' },
          { code: 'BEE101', name: 'Fundamentals of Electrical Engineering', type: 'Theory', sessional1: 19, sessional2: 27, external: 0, practical: 0, grade: 'D' },
          { code: 'BCS101', name: 'Programming for Problem Solving', type: 'Theory', sessional1: 15, sessional2: 36, external: 0, practical: 0, grade: 'C' },
          { code: 'BAS104', name: 'Environment and Ecology', type: 'Theory', sessional1: 5, sessional2: 46, external: 0, practical: 0, grade: 'C' },
          { code: 'BAS151', name: 'Engineering Physics Lab', type: 'Practical', sessional1: 38, sessional2: 36, external: 0, practical: 0, grade: 'B+' },
          { code: 'BEE151', name: 'Basic Electrical Engineering Lab', type: 'Practical', sessional1: 38, sessional2: 38, external: 0, practical: 0, grade: 'B+' },
          { code: 'BCS151', name: 'Programming for Problem Solving Lab', type: 'Practical', sessional1: 30, sessional2: 30, external: 0, practical: 0, grade: 'B-' },
          { code: 'BCE151', name: 'Engineering Graphics & Design Lab', type: 'Practical', sessional1: 30, sessional2: 47, external: 0, practical: 0, grade: 'B+' },
        ]
      };
    }
    
    return null;
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#4CAF50';
      case 'A-': return '#8BC34A';
      case 'B+': return '#FF9800';
      case 'B': return '#FFC107';
      case 'B-': return '#FF9800';
      case 'C': return '#FF5722';
      case 'D': return '#F44336';
      case 'F': return '#D32F2F';
      default: return '#666';
    }
  };

  const renderSemesterCard = (semester) => (
    <TouchableOpacity
      key={semester.id}
      style={styles.semesterCard}
      onPress={() => setSelectedSemester(semester)}
    >
      <View style={styles.semesterHeader}>
        <Text style={styles.semesterName}>{semester.name}</Text>
        <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.7)" />
      </View>
    </TouchableOpacity>
  );

  const renderResultsDetail = () => {
    if (!selectedSemester) return null;

    const results = getResultsData(selectedSemester.id);

    return (
      <View style={styles.resultsDetailContainer}>
        <View style={styles.resultsHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedSemester(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.resultsTitle}>{selectedSemester.name} Results</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.resultsContent}>
          {results ? (
            <>
              {results.subjects ? (
                // New subject-based layout for Semester 1
                <View style={styles.subjectsContainer}>
                  {/* SGPA Section - Prominent Display */}
                  <View style={styles.sgpaContainer}>
                    <View style={styles.sgpaHeader}>
                      <Ionicons name="trophy" size={24} color="#FACC15" />
                      <Text style={styles.sgpaTitle}>SGPA</Text>
                    </View>
                    <Text style={styles.sgpaValue}>5.0</Text>
                    <Text style={styles.sgpaSubtext}>Semester Grade Point Average</Text>
                  </View>

                  {/* Subjects List */}
                  {results.subjects.map((subject, index) => (
                    <View key={index} style={styles.subjectCard}>
                      <View style={styles.subjectHeader}>
                        <Text style={styles.subjectCode}>{subject.code}</Text>
                        <Text style={[styles.subjectGrade, { color: getGradeColor(subject.grade) }]}>
                          {subject.grade}
                        </Text>
                      </View>
                      <Text style={styles.subjectName}>{subject.name}</Text>
                      <Text style={styles.subjectType}>{subject.type}</Text>
                      <View style={styles.marksContainer}>
                        <View style={styles.markRow}>
                          <Text style={styles.markLabel}>Sessional 1:</Text>
                          <Text style={styles.markValue}>{subject.sessional1}</Text>
                        </View>
                        <View style={styles.markRow}>
                          <Text style={styles.markLabel}>Sessional 2:</Text>
                          <Text style={styles.markValue}>{subject.sessional2}</Text>
                        </View>
                        <View style={styles.markRow}>
                          <Text style={styles.markLabel}>External:</Text>
                          <Text style={styles.markValue}>{subject.external || '–'}</Text>
                        </View>
                        <View style={styles.markRow}>
                          <Text style={styles.markLabel}>Practical:</Text>
                          <Text style={styles.markValue}>{subject.practical || '–'}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}

              {/* Teacher Remarks Section */}
              <View style={styles.remarksSection}>
                <Text style={styles.remarksTitle}>Teacher Remarks</Text>
                <View style={styles.remarksCard}>
                  <Text style={styles.remarksText}>
                    "Excellent performance throughout the semester. Shows great understanding of concepts and practical applications. Keep up the good work!"
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <Ionicons name="document-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.noDataTitle}>No Data Available</Text>
              <Text style={styles.noDataSubtext}>
                Results for {selectedSemester.name} are not available yet.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  if (selectedSemester) {
    return renderResultsDetail();
  }

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
        <Text style={styles.title}>Results</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Semester</Text>
        <View style={styles.semestersContainer}>
          {semesters.map(renderSemesterCard)}
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
    color: '#fff',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
    marginBottom: 20,
  },
  semestersContainer: {
    gap: 15,
  },
  semesterCard: {
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
  semesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  semesterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  resultsDetailContainer: {
    flex: 1,
    backgroundColor: '#0B0F1A',
  },
  resultsHeader: {
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
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  resultsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultLabel: {
    fontSize: 14,
    color: '#A9C3FF',
    marginBottom: 10,
  },
  resultMarks: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FACC15',
    marginBottom: 5,
  },
  resultGrade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  remarksSection: {
    marginBottom: 30,
  },
  remarksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
    marginBottom: 15,
  },
  remarksCard: {
    backgroundColor: '#0F1724',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  remarksText: {
    fontSize: 16,
    color: '#A9C3FF',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.6,
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
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  noDataTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E6EEF8',
    marginTop: 20,
    textAlign: 'center',
  },
  noDataSubtext: {
    fontSize: 16,
    color: '#A9C3FF',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  subjectsContainer: {
    padding: 16,
  },
  subjectCard: {
    backgroundColor: '#0F1724',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    backgroundColor: 'rgba(30, 58, 138, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subjectGrade: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E6EEF8',
    marginBottom: 4,
  },
  subjectType: {
    fontSize: 14,
    color: '#A9C3FF',
    marginBottom: 12,
  },
  marksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  markRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  markLabel: {
    fontSize: 14,
    color: '#A9C3FF',
  },
  markValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EEF8',
  },
  sgpaContainer: {
    backgroundColor: '#0F1724',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FACC15',
    alignItems: 'center',
    shadowColor: '#FACC15',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sgpaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sgpaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FACC15',
    marginLeft: 8,
  },
  sgpaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FACC15',
    marginBottom: 8,
  },
  sgpaSubtext: {
    fontSize: 16,
    color: '#A9C3FF',
    textAlign: 'center',
  },
});

export default ResultsScreen;
