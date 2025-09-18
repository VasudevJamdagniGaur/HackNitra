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
    const results = {
      sessional1: { marks: 85, maxMarks: 100, grade: 'A' },
      sessional2: { marks: 78, maxMarks: 100, grade: 'B+' },
      external: { marks: 82, maxMarks: 100, grade: 'A-' },
      practicals: { marks: 90, maxMarks: 100, grade: 'A' },
    };
    return results;
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#4CAF50';
      case 'A-': return '#8BC34A';
      case 'B+': return '#FF9800';
      case 'B': return '#FFC107';
      case 'C': return '#FF5722';
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
      <Text style={styles.semesterSubjects}>{semester.subjects.length} Subjects</Text>
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
          <View style={styles.resultsGrid}>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Sessional 1</Text>
              <Text style={[styles.resultMarks, { color: getGradeColor(results.sessional1.grade) }]}>
                {results.sessional1.marks}/{results.sessional1.maxMarks}
              </Text>
              <Text style={[styles.resultGrade, { color: getGradeColor(results.sessional1.grade) }]}>
                {results.sessional1.grade}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Sessional 2</Text>
              <Text style={[styles.resultMarks, { color: getGradeColor(results.sessional2.grade) }]}>
                {results.sessional2.marks}/{results.sessional2.maxMarks}
              </Text>
              <Text style={[styles.resultGrade, { color: getGradeColor(results.sessional2.grade) }]}>
                {results.sessional2.grade}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>External</Text>
              <Text style={[styles.resultMarks, { color: getGradeColor(results.external.grade) }]}>
                {results.external.marks}/{results.external.maxMarks}
              </Text>
              <Text style={[styles.resultGrade, { color: getGradeColor(results.external.grade) }]}>
                {results.external.grade}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Practicals</Text>
              <Text style={[styles.resultMarks, { color: getGradeColor(results.practicals.grade) }]}>
                {results.practicals.marks}/{results.practicals.maxMarks}
              </Text>
              <Text style={[styles.resultGrade, { color: getGradeColor(results.practicals.grade) }]}>
                {results.practicals.grade}
              </Text>
            </View>
          </View>

          {/* Teacher Remarks Section */}
          <View style={styles.remarksSection}>
            <Text style={styles.remarksTitle}>Teacher Remarks</Text>
            <View style={styles.remarksCard}>
              <Text style={styles.remarksText}>
                "Excellent performance throughout the semester. Shows great understanding of concepts and practical applications. Keep up the good work!"
              </Text>
            </View>
          </View>
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
  semesterSubjects: {
    fontSize: 14,
    color: '#A9C3FF',
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

export default ResultsScreen;
