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
    { id: 'all', name: 'All Subjects', icon: 'library' },
    { id: 'ds', name: 'Data Structures', icon: 'code' },
    { id: 'dbms', name: 'Database Management', icon: 'server' },
    { id: 'cn', name: 'Computer Networks', icon: 'globe' },
    { id: 'math', name: 'Mathematics', icon: 'calculator' },
    { id: 'physics', name: 'Physics', icon: 'nuclear' },
  ];

  const notes = [
    {
      id: 1,
      subject: 'Data Structures',
      title: 'Binary Trees - Complete Guide',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-02-10',
      downloads: 45,
    },
    {
      id: 2,
      subject: 'Database Management',
      title: 'SQL Queries and Optimization',
      type: 'PDF',
      size: '1.8 MB',
      date: '2024-02-08',
      downloads: 32,
    },
    {
      id: 3,
      subject: 'Computer Networks',
      title: 'OSI Model Layers Explained',
      type: 'PDF',
      size: '3.1 MB',
      date: '2024-02-05',
      downloads: 28,
    },
    {
      id: 4,
      subject: 'Mathematics',
      title: 'Calculus Integration Techniques',
      type: 'PDF',
      size: '2.7 MB',
      date: '2024-02-03',
      downloads: 38,
    },
    {
      id: 5,
      subject: 'Physics',
      title: 'Quantum Mechanics Basics',
      type: 'PDF',
      size: '4.2 MB',
      date: '2024-02-01',
      downloads: 25,
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
            <Ionicons 
              name={subject.icon} 
              size={20} 
              color={selectedSubject === subject.id ? '#fff' : 'rgba(255, 255, 255, 0.7)'} 
            />
            <Text style={[
              styles.subjectButtonText,
              selectedSubject === subject.id && styles.selectedSubjectButtonText
            ]}>
              {subject.name}
            </Text>
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
                  <Text style={styles.noteSubject}>{note.subject}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedSubjectButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  subjectButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
  },
  selectedSubjectButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notesContainer: {
    gap: 15,
  },
  noteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#fff',
    marginBottom: 4,
  },
  noteSubject: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  downloadButton: {
    padding: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
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
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 4,
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

export default NotesScreen;
