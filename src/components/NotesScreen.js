import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NotesScreen = ({ onBack, onMenuPress }) => {
  const [selectedSubject, setSelectedSubject] = useState('all');
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

  const subjects = [
    { id: 'all', code: 'All', name: 'All Subjects', icon: 'library' },
    { id: 'BOE-312', code: 'BOE-312', name: 'Laser System & Application', icon: 'laser' },
    { id: 'BAS-301', code: 'BAS-301', name: 'Tech Communication', icon: 'chatbubbles' },
    { id: 'BCS-301', code: 'BCS-301', name: 'Data Structures', icon: 'code' },
    { id: 'BCS-302', code: 'BCS-302', name: 'Discrete Structure', icon: 'hardware-chip' },
    { id: 'BCS-303', code: 'BCS-303', name: 'Discrete Structures', icon: 'calculator' },
    { id: 'BCC-302', code: 'BCC-302', name: 'Python Prog', icon: 'logo-python' },
    { id: 'BCS-351', code: 'BCS-351', name: 'Data Structure', icon: 'code-slash' },
    { id: 'BCS-352', code: 'BCS-352', name: 'COA Lab', icon: 'desktop' },
    { id: 'BCS-353', code: 'BCS-353', name: 'WD Workshop', icon: 'globe' },
    { id: 'BCC-351', code: 'BCC-351', name: 'Mini Project', icon: 'briefcase' },
  ];

  const notes = [
    {
      id: 1,
      subject: 'BOE-312',
      subjectName: 'Laser System & Application',
      title: 'Laser Principles and Applications',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-02-10',
      downloads: 45,
    },
    {
      id: 2,
      subject: 'BAS-301',
      subjectName: 'Tech Communication',
      title: 'Technical Writing Guidelines',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-02-08',
      downloads: 32,
    },
    {
      id: 3,
      subject: 'BCS-301',
      subjectName: 'Data Structures',
      title: 'Binary Trees - Complete Guide',
      type: 'PDF',
      size: '3.1 MB',
      date: '2024-02-05',
      downloads: 28,
    },
    {
      id: 4,
      subject: 'BCS-302',
      subjectName: 'COA',
      title: 'Computer Organization Architecture',
      type: 'PDF',
      size: '2.7 MB',
      date: '2024-02-03',
      downloads: 38,
    },
    {
      id: 5,
      subject: 'BCS-303',
      subjectName: 'Discrete Structures',
      title: 'Discrete Mathematics Fundamentals',
      type: 'PDF',
      size: '4.2 MB',
      date: '2024-02-01',
      downloads: 25,
    },
    {
      id: 6,
      subject: 'BCC-302',
      subjectName: 'Python Programming',
      title: 'Python Advanced Concepts',
      type: 'PDF',
      size: '3.5 MB',
      date: '2024-01-28',
      downloads: 42,
    },
    {
      id: 7,
      subject: 'BCS-351',
      subjectName: 'Data Structure Lab',
      title: 'Lab Manual - Data Structures',
      type: 'PDF',
      size: '2.1 MB',
      date: '2024-01-25',
      downloads: 35,
    },
    {
      id: 8,
      subject: 'BCS-352',
      subjectName: 'COA Lab',
      title: 'Computer Organization Lab Guide',
      type: 'PDF',
      size: '2.8 MB',
      date: '2024-01-22',
      downloads: 29,
    },
    {
      id: 9,
      subject: 'BCS-353',
      subjectName: 'WD Workshop',
      title: 'Web Development Workshop Notes',
      type: 'PDF',
      size: '3.2 MB',
      date: '2024-01-20',
      downloads: 33,
    },
    {
      id: 10,
      subject: 'BCC-351',
      subjectName: 'Mini Project or Internship',
      title: 'Project Guidelines and Templates',
      type: 'PDF',
      size: '2.9 MB',
      date: '2024-01-18',
      downloads: 27,
    },
  ];

  const filteredNotes = selectedSubject === 'all' 
    ? notes 
    : notes.filter(note => note.subject === subjects.find(s => s.id === selectedSubject)?.name);

  const handleDownload = (note) => {
    Alert.alert(
      'Download Note',
      `Download "${note.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => {
          Alert.alert('Success', 'Note downloaded successfully!');
        }},
      ]
    );
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
        <Text style={styles.title}>Notes</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Subject Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.subjectFilter}
        contentContainerStyle={styles.subjectFilterContent}
      >
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[
              styles.subjectButton,
              selectedSubject === subject.id && styles.selectedSubjectButton
            ]}
            onPress={() => setSelectedSubject(subject.id)}
          >
            <View style={styles.subjectIconContainer}>
              <Ionicons 
                name={subject.icon} 
                size={20} 
                color={selectedSubject === subject.id ? '#0F254D' : '#A9C3FF'} 
              />
            </View>
            <View style={styles.subjectTextContainer}>
              <Text style={[
                styles.subjectCode,
                selectedSubject === subject.id && styles.selectedSubjectCode
              ]}>
                {subject.code}
              </Text>
              <Text style={[
                styles.subjectName,
                selectedSubject === subject.id && styles.selectedSubjectName
              ]}>
                {subject.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.notesContainer}>
          {filteredNotes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <View style={styles.noteIcon}>
                  <Ionicons name="document-text" size={24} color="#4CAF50" />
                </View>
                <View style={styles.noteInfo}>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Text style={styles.noteSubjectCode}>{note.subject}</Text>
                  <Text style={styles.noteSubjectName}>{note.subjectName}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={() => handleDownload(note)}
                >
                  <Ionicons name="download" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.noteDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="document" size={14} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.detailText}>{note.type}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="folder" size={14} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.detailText}>{note.size}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={14} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.detailText}>{note.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="download-outline" size={14} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.detailText}>{note.downloads} downloads</Text>
                </View>
              </View>
            </View>
          ))}
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
  backButton: {
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
  menuButton: {
    padding: 10,
  },
  subjectFilter: {
    marginBottom: 20,
  },
  subjectFilterContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1724',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    width: 120,
    height: 80,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedSubjectButton: {
    backgroundColor: '#0F1724',
    borderWidth: 2,
    borderColor: '#E91E63',
    shadowColor: '#E91E63',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  subjectIconContainer: {
    marginRight: 8,
  },
  subjectTextContainer: {
    flex: 1,
  },
  subjectCode: {
    fontSize: 12,
    color: '#A9C3FF',
    fontWeight: '500',
    marginBottom: 2,
  },
  selectedSubjectCode: {
    color: '#E91E63',
    fontWeight: '600',
  },
  subjectName: {
    fontSize: 11,
    color: '#E6EEF8',
    fontWeight: '600',
    lineHeight: 14,
  },
  selectedSubjectName: {
    color: '#E6EEF8',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notesContainer: {
    gap: 15,
  },
  noteCard: {
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
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  noteIcon: {
    marginRight: 15,
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E6EEF8',
    marginBottom: 4,
  },
  noteSubjectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 2,
  },
  noteSubjectName: {
    fontSize: 14,
    color: '#A9C3FF',
  },
  downloadButton: {
    padding: 8,
    backgroundColor: '#FACC15',
    borderRadius: 8,
  },
  noteDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#A9C3FF',
    marginLeft: 4,
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

export default NotesScreen;
