import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HelpDeskScreen = ({ onBack, onMenuPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');

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

  const handleComplaintSubmit = () => {
    if (!complaintText.trim()) {
      Alert.alert('Error', 'Please enter your complaint');
      return;
    }
    
    Alert.alert(
      'Complaint Submitted',
      'Your complaint has been submitted to nitra@complain.ac.in',
      [
        { text: 'OK', onPress: () => setComplaintText('') }
      ]
    );
  };

  const handleSuggestionSubmit = () => {
    if (!suggestionText.trim()) {
      Alert.alert('Error', 'Please enter your suggestion');
      return;
    }
    
    Alert.alert(
      'Suggestion Submitted',
      'Your suggestion has been submitted to nitra@suggestion.ac.in',
      [
        { text: 'OK', onPress: () => setSuggestionText('') }
      ]
    );
  };

  const handleEmailPress = (email) => {
    Alert.alert(
      'Email Contact',
      `Email: ${email}`,
      [
        { text: 'Copy Email', onPress: () => {
          Alert.alert('Copied', 'Email address copied to clipboard');
        }},
        { text: 'Cancel', style: 'cancel' }
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
        <Text style={styles.title}>HelpDesk</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Complaint Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="alert-circle" size={24} color="#F44336" />
            </View>
            <Text style={styles.sectionTitle}>Complaint Box</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Describe your complaint</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your complaint here..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={complaintText}
              onChangeText={setComplaintText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleComplaintSubmit}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Submit Complaint</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={() => handleEmailPress('nitra@complain.ac.in')}
          >
            <Ionicons name="mail" size={16} color="#F44336" />
            <Text style={styles.emailText}>nitra@complain.ac.in</Text>
          </TouchableOpacity>
        </View>

        {/* Suggestion Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="bulb" size={24} color="#FF9800" />
            </View>
            <Text style={styles.sectionTitle}>Suggestion Box</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Share your suggestions</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your suggestions here..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={suggestionText}
              onChangeText={setSuggestionText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSuggestionSubmit}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Submit Suggestion</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={() => handleEmailPress('nitra@suggestion.ac.in')}
          >
            <Ionicons name="mail" size={16} color="#FF9800" />
            <Text style={styles.emailText}>nitra@suggestion.ac.in</Text>
          </TouchableOpacity>
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
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E6EEF8',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#0F1724',
    borderRadius: 16,
    padding: 20,
    fontSize: 16,
    color: '#E6EEF8',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  emailText: {
    color: '#1E3A8A',
    fontSize: 14,
    marginLeft: 8,
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

export default HelpDeskScreen;
