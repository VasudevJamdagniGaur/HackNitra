import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ClassYearSelectionScreen({ navigation, route }) {
  const { studentData } = route.params;
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const classes = ['A', 'B', 'C', 'D'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleClassSelection = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleYearSelection = (year) => {
    setSelectedYear(year);
  };

  const handleCompleteRegistration = () => {
    if (!selectedClass || !selectedYear) {
      Alert.alert('Error', 'Please select both class and year');
      return;
    }

    // Complete registration and navigate to Dashboard
    const completeStudentData = {
      ...studentData,
      class: selectedClass,
      year: selectedYear,
    };

    Alert.alert(
      'Registration Complete',
      'Your account has been created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Dashboard', { 
            userType: 'student',
            studentData: completeStudentData 
          }),
        },
      ]
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Class & Year</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Welcome {studentData.name}!
          </Text>
          <Text style={styles.infoSubtext}>
            {studentData.course} - {studentData.college}
          </Text>
        </View>

        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Select Class</Text>
          <View style={styles.optionsContainer}>
            {classes.map((classItem) => (
              <TouchableOpacity
                key={classItem}
                style={[
                  styles.optionButton,
                  selectedClass === classItem && styles.selectedOptionButton,
                ]}
                onPress={() => handleClassSelection(classItem)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedClass === classItem && styles.selectedOptionText,
                  ]}
                >
                  Class {classItem}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Select Year</Text>
          <View style={styles.optionsContainer}>
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.optionButton,
                  selectedYear === year && styles.selectedOptionButton,
                ]}
                onPress={() => handleYearSelection(year)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedYear === year && styles.selectedOptionText,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.completeButton,
            (!selectedClass || !selectedYear) && styles.disabledButton,
          ]}
          onPress={handleCompleteRegistration}
          disabled={!selectedClass || !selectedYear}
        >
          <Text style={styles.completeButtonText}>Complete Registration</Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  placeholder: {
    width: 44,
  },
  content: {
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#E8F5E8',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  infoSubtext: {
    fontSize: 16,
    color: '#4CAF50',
  },
  selectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
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
  selectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  optionButton: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedOptionText: {
    color: '#fff',
  },
  completeButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
