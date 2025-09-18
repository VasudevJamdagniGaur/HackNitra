import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useAuth } from '../contexts/AuthContext';

const StudentSignup = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    rollNumber: '',
    course: '',
    section: '',
    year: '',
    password: '',
  });
  const { signUp } = useAuth();

  const courses = ['B.Tech (TT)', 'B.Tech (CSE)', 'B.Tech (AI&ML)'];
  const sections = ['A', 'B', 'C', 'D'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.college || !formData.email || !formData.rollNumber) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (!formData.email.includes('@') || !formData.email.includes('.')) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
      if (formData.rollNumber.length < 3) {
        Alert.alert('Error', 'Please enter a valid roll number');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.course) {
        Alert.alert('Error', 'Please select a course');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.year) {
        Alert.alert('Error', 'Please select a year');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!formData.section) {
        Alert.alert('Error', 'Please select a section');
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        Alert.alert('Error', 'Please enter a password with at least 6 characters');
        return;
      }
      handleSignUp();
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    setLoading(true);
    const result = await signUp(formData.email, formData.password, formData);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Registration Successful!',
        'Your account has been created successfully. You can now login with your credentials.',
        [
          {
            text: 'OK',
            onPress: () => onComplete()
          }
        ]
      );
    } else {
      Alert.alert('Registration Failed', result.error);
    }
  };

  const sendQueryEmail = async () => {
    try {
      const emailBody = `I have noticed that my details have not been properly included in the college app database. Kindly resolve this issue at the earliest as it is causing inconvenience.

Student Details:
- Name: ${formData.name}
- College: ${formData.college}
- Email: ${formData.email}
- Roll Number: ${formData.rollNumber}
- Course: ${formData.course}
- Year: ${formData.year}
- Section: ${formData.section}

Please update my details in the database so I can access the college app properly.

Thank you for your assistance.`;

      if (Platform.OS === 'web') {
        // Use mailto link for web - open in background and return to login immediately
        const mailtoLink = `mailto:coolbuddyvasudev@gmail.com?subject=Student Database Update Request&body=${encodeURIComponent(emailBody)}`;
        
        // Open Gmail in background without waiting
        Linking.openURL(mailtoLink).catch(err => {
          console.error('Error opening email client:', err);
        });
        
        // Return to login immediately
        onComplete();
      } else {
        // Use MailComposer for mobile
        const isAvailable = await MailComposer.isAvailableAsync();
        
        if (isAvailable) {
          await MailComposer.composeAsync({
            recipients: ['coolbuddyvasudev@gmail.com'],
            subject: 'Student Database Update Request',
            body: emailBody,
            isHtml: false,
          });
          
          Alert.alert(
            'Query Submitted',
            'Your query has been sent successfully. You will receive a response soon.',
            [
              {
                text: 'OK',
                onPress: () => onComplete()
              }
            ]
          );
        } else {
          Alert.alert(
            'Email Not Available',
            'Email service is not available on this device. Please contact the college directly.',
            [
              {
                text: 'OK',
                onPress: () => onComplete()
              }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert(
        'Error',
        'Failed to send email. Please try again or contact the college directly.',
        [
          {
            text: 'OK',
            onPress: () => onComplete()
          }
        ]
      );
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about yourself</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={formData.name}
          onChangeText={(value) => updateFormData('name', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="school" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="College Name"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={formData.college}
          onChangeText={(value) => updateFormData('college', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="card" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={formData.rollNumber}
          onChangeText={(value) => updateFormData('rollNumber', value)}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Course Selection</Text>
      <Text style={styles.stepSubtitle}>Choose your course</Text>

      <View style={styles.optionsContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.optionCard,
              formData.course === course && styles.selectedOptionCard,
            ]}
            onPress={() => updateFormData('course', course)}
          >
            <Text style={[
              styles.optionText,
              formData.course === course && styles.selectedOptionText,
            ]}>
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Year Selection</Text>
      <Text style={styles.stepSubtitle}>Select your academic year</Text>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Academic Year</Text>
        <View style={styles.optionsRow}>
          {years.map((year) => (
            <TouchableOpacity
              key={year}
              style={[
                styles.optionButton,
                formData.year === year && styles.selectedOptionButton,
              ]}
              onPress={() => updateFormData('year', year)}
            >
              <Text style={[
                styles.optionButtonText,
                formData.year === year && styles.selectedOptionButtonText,
              ]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Section & Password</Text>
      <Text style={styles.stepSubtitle}>Select your section and create a password</Text>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionLabel}>Section</Text>
        <View style={styles.optionsRow}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section}
              style={[
                styles.optionButton,
                formData.section === section && styles.selectedOptionButton,
              ]}
              onPress={() => updateFormData('section', section)}
            >
              <Text style={[
                styles.optionButtonText,
                formData.section === section && styles.selectedOptionButtonText,
              ]}>
                Section {section}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password (min 6 characters)"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          secureTextEntry
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Student Registration</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Step {step} of 4</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextButton, loading && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.nextButtonText}>
                {step === 4 ? 'Create Account' : 'Next'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
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
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingVertical: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1724',
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#E6EEF8',
  },
  optionsContainer: {
    gap: 15,
  },
  optionCard: {
    backgroundColor: '#0F1724',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  selectedOptionCard: {
    backgroundColor: '#FACC15',
    borderColor: '#0F254D',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
  },
  selectedOptionText: {
    color: '#0F254D',
  },
  selectionContainer: {
    marginBottom: 30,
  },
  selectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOptionButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedOptionButtonText: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    maxWidth: 280,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  nextButtonDisabled: {
    opacity: 0.6,
  },
});

export default StudentSignup;
