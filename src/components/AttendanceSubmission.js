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

const AttendanceSubmission = ({ attendanceData, onBack, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Attendance Submitted!',
        `Successfully marked attendance for class: ${attendanceData.qrCode}`,
        [
          {
            text: 'OK',
            onPress: () => {
              onSubmit();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit attendance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Attendance Submission</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* QR Code Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scanned QR Code</Text>
          <View style={styles.qrContainer}>
            <Ionicons name="qr-code" size={40} color="#FACC15" />
            <Text style={styles.qrCode}>{attendanceData.qrCode}</Text>
          </View>
        </View>

        {/* Device Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="phone-portrait" size={20} color="#FACC15" />
              <Text style={styles.infoLabel}>IMEI Number:</Text>
              <Text style={styles.infoValue}>{attendanceData.imei}</Text>
            </View>
          </View>
        </View>

        {/* Location Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#FACC15" />
              <Text style={styles.infoLabel}>Latitude:</Text>
              <Text style={styles.infoValue}>{attendanceData.location.latitude.toFixed(6)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#FACC15" />
              <Text style={styles.infoLabel}>Longitude:</Text>
              <Text style={styles.infoValue}>{attendanceData.location.longitude.toFixed(6)}</Text>
            </View>
          </View>
        </View>

        {/* Timestamp */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submission Details</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#FACC15" />
              <Text style={styles.infoLabel}>Timestamp:</Text>
              <Text style={styles.infoValue}>{formatTimestamp(attendanceData.timestamp)}</Text>
            </View>
          </View>
        </View>

        {/* Warning */}
        <View style={styles.warningContainer}>
          <Ionicons name="warning" size={20} color="#F97316" />
          <Text style={styles.warningText}>
            Please verify all information before submitting. This action cannot be undone.
          </Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Text style={styles.submitButtonText}>Submitting...</Text>
              <Ionicons name="hourglass" size={20} color="#fff" />
            </>
          ) : (
            <>
              <Text style={styles.submitButtonText}>Submit Attendance</Text>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
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
    color: '#E6EEF8',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6EEF8',
    marginBottom: 15,
  },
  qrContainer: {
    backgroundColor: '#0F1724',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  qrCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FACC15',
    marginTop: 10,
    textAlign: 'center',
  },
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#A9C3FF',
    marginLeft: 10,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E6EEF8',
    flex: 2,
    textAlign: 'right',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.3)',
    marginBottom: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#F97316',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#0F254D',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  submitButton: {
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
  submitButtonDisabled: {
    backgroundColor: 'rgba(30, 58, 138, 0.5)',
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    color: '#E6EEF8',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
});

export default AttendanceSubmission;
