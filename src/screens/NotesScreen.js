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

export default function NotesScreen({ navigation }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const subjects = [
    {
      code: 'BOE-312',
      name: 'Laser System & Application',
      notes: [
        { id: 1, title: 'Introduction to Laser Systems', date: '2024-01-10', size: '2.5 MB' },
        { id: 2, title: 'Laser Physics and Principles', date: '2024-01-12', size: '3.2 MB' },
        { id: 3, title: 'Laser Applications in Industry', date: '2024-01-15', size: '1.8 MB' },
      ],
    },
    {
      code: 'BAS-301',
      name: 'Tech Communication',
      notes: [
        { id: 1, title: 'Technical Writing Basics', date: '2024-01-08', size: '1.5 MB' },
        { id: 2, title: 'Presentation Skills', date: '2024-01-11', size: '2.1 MB' },
        { id: 3, title: 'Report Writing Guidelines', date: '2024-01-14', size: '1.9 MB' },
      ],
    },
    {
      code: 'BCS-301',
      name: 'Data Structures',
      notes: [
        { id: 1, title: 'Arrays and Linked Lists', date: '2024-01-09', size: '2.8 MB' },
        { id: 2, title: 'Stacks and Queues', date: '2024-01-13', size: '2.3 MB' },
        { id: 3, title: 'Trees and Graphs', date: '2024-01-16', size: '3.5 MB' },
      ],
    },
    {
      code: 'BCS-302',
      name: 'Computer Organization',
      notes: [
        { id: 1, title: 'CPU Architecture', date: '2024-01-07', size: '2.2 MB' },
        { id: 2, title: 'Memory Systems', date: '2024-01-10', size: '1.7 MB' },
        { id: 3, title: 'I/O Systems', date: '2024-01-13', size: '2.0 MB' },
      ],
    },
    {
      code: 'BCS-303',
      name: 'Discrete Structures',
      notes: [
        { id: 1, title: 'Set Theory', date: '2024-01-08', size: '1.6 MB' },
        { id: 2, title: 'Graph Theory', date: '2024-01-12', size: '2.4 MB' },
        { id: 3, title: 'Combinatorics', date: '2024-01-15', size: '1.9 MB' },
      ],
    },
    {
      code: 'BCC-302',
      name: 'Python Programming',
      notes: [
        { id: 1, title: 'Python Basics', date: '2024-01-09', size: '2.1 MB' },
        { id: 2, title: 'Data Structures in Python', date: '2024-01-11', size: '2.7 MB' },
        { id: 3, title: 'Object-Oriented Programming', date: '2024-01-14', size: '3.0 MB' },
      ],
    },
    {
      code: 'BCS-351',
      name: 'Data Structure Lab',
      notes: [
        { id: 1, title: 'Lab Manual - Arrays', date: '2024-01-10', size: '1.8 MB' },
        { id: 2, title: 'Lab Manual - Linked Lists', date: '2024-01-13', size: '2.2 MB' },
        { id: 3, title: 'Lab Manual - Trees', date: '2024-01-16', size: '2.5 MB' },
      ],
    },
    {
      code: 'BCS-352',
      name: 'COA Lab',
      notes: [
        { id: 1, title: 'Assembly Language Basics', date: '2024-01-11', size: '1.9 MB' },
        { id: 2, title: 'CPU Simulation', date: '2024-01-14', size: '2.3 MB' },
        { id: 3, title: 'Memory Management', date: '2024-01-17', size: '1.7 MB' },
      ],
    },
    {
      code: 'BCS-353',
      name: 'WD Workshop',
      notes: [
        { id: 1, title: 'HTML and CSS Basics', date: '2024-01-12', size: '2.6 MB' },
        { id: 2, title: 'JavaScript Fundamentals', date: '2024-01-15', size: '3.1 MB' },
        { id: 3, title: 'React Introduction', date: '2024-01-18', size: '2.8 MB' },
      ],
    },
    {
      code: 'BCC-351',
      name: 'Mini Project/Internship Assistance',
      notes: [
        { id: 1, title: 'Project Guidelines', date: '2024-01-13', size: '1.5 MB' },
        { id: 2, title: 'Internship Opportunities', date: '2024-01-16', size: '2.0 MB' },
        { id: 3, title: 'Report Writing Format', date: '2024-01-19', size: '1.3 MB' },
      ],
    },
  ];

  const handleSubjectPress = (subject) => {
    setSelectedSubject(subject);
    setModalVisible(true);
  };

  const handleNotePress = (note) => {
    Alert.alert(
      'Open PDF',
      `Would you like to open "${note.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => {
          // In a real app, this would open the PDF viewer
          Alert.alert('Success', 'PDF opened successfully!');
        }},
      ]
    );
  };

  const handleDownload = (note) => {
    Alert.alert(
      'Download PDF',
      `Download "${note.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => {
          Alert.alert('Success', 'PDF downloaded successfully!');
        }},
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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
        <Text style={styles.title}>Notes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Select a subject to view notes</Text>
        
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.subjectCard}
            onPress={() => handleSubjectPress(subject)}
          >
            <View style={styles.subjectHeader}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectCode}>{subject.code}</Text>
                <Text style={styles.subjectName}>{subject.name}</Text>
              </View>
              <View style={styles.subjectStats}>
                <Text style={styles.notesCount}>{subject.notes.length} notes</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notes Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedSubject?.code}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>{selectedSubject?.name}</Text>
            
            <ScrollView style={styles.notesList}>
              {selectedSubject?.notes.map((note) => (
                <View key={note.id} style={styles.noteItem}>
                  <View style={styles.noteInfo}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <View style={styles.noteMeta}>
                      <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
                      <Text style={styles.noteSize}>{note.size}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.noteActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleNotePress(note)}
                    >
                      <Ionicons name="eye" size={20} color="#2E7D32" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDownload(note)}
                    >
                      <Ionicons name="download" size={20} color="#2E7D32" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 14,
    color: '#666',
  },
  subjectStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesCount: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  notesList: {
    maxHeight: 400,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  noteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  noteSize: {
    fontSize: 12,
    color: '#666',
  },
  noteActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
});
