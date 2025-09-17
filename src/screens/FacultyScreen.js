import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FacultyScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const facultyData = [
    {
      id: 1,
      code: 'BOE-312',
      subject: 'Laser System & Application',
      teacher: 'Dr. Rishabh Raj',
      designation: 'Professor',
      department: 'Electronics Engineering',
      email: 'rishabh.raj@nitra.ac.in',
      phone: '+91 9876543210',
      office: 'Room 201, Main Building',
      officeHours: 'Mon-Fri: 10:00 AM - 12:00 PM',
      specialization: 'Laser Technology, Photonics',
      experience: '15 years',
      rating: 4.8,
      image: null,
    },
    {
      id: 2,
      code: 'BAS-301',
      subject: 'Tech Communication',
      teacher: 'Mr. Partha Basu',
      designation: 'Associate Professor',
      department: 'Applied Sciences',
      email: 'partha.basu@nitra.ac.in',
      phone: '+91 9876543211',
      office: 'Room 105, Science Block',
      officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM',
      specialization: 'Technical Writing, Communication',
      experience: '12 years',
      rating: 4.6,
      image: null,
    },
    {
      id: 3,
      code: 'BCS-301',
      subject: 'Data Structures',
      teacher: 'Ms. Vandana Sharma',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'vandana.sharma@nitra.ac.in',
      phone: '+91 9876543212',
      office: 'Room 301, CS Block',
      officeHours: 'Mon-Fri: 9:00 AM - 11:00 AM',
      specialization: 'Algorithms, Data Structures',
      experience: '8 years',
      rating: 4.9,
      image: null,
    },
    {
      id: 4,
      code: 'BCS-302',
      subject: 'Computer Organization',
      teacher: 'Ms. Akansha Rajput',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'akansha.rajput@nitra.ac.in',
      phone: '+91 9876543213',
      office: 'Room 302, CS Block',
      officeHours: 'Mon-Fri: 11:00 AM - 1:00 PM',
      specialization: 'Computer Architecture, Microprocessors',
      experience: '6 years',
      rating: 4.7,
      image: null,
    },
    {
      id: 5,
      code: 'BCS-303',
      subject: 'Discrete Structures',
      teacher: 'Ms. Priyanka Arora',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'priyanka.arora@nitra.ac.in',
      phone: '+91 9876543214',
      office: 'Room 303, CS Block',
      officeHours: 'Mon-Fri: 3:00 PM - 5:00 PM',
      specialization: 'Discrete Mathematics, Graph Theory',
      experience: '7 years',
      rating: 4.5,
      image: null,
    },
    {
      id: 6,
      code: 'BCC-302',
      subject: 'Python Programming',
      teacher: 'Dr. Rajesh Kumar',
      designation: 'Professor',
      department: 'Computer Science',
      email: 'rajesh.kumar@nitra.ac.in',
      phone: '+91 9876543215',
      office: 'Room 304, CS Block',
      officeHours: 'Mon-Fri: 10:00 AM - 12:00 PM',
      specialization: 'Programming Languages, Software Engineering',
      experience: '18 years',
      rating: 4.8,
      image: null,
    },
    {
      id: 7,
      code: 'BCS-351',
      subject: 'Data Structure Lab',
      teacher: 'Ms. Vandana Sharma',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'vandana.sharma@nitra.ac.in',
      phone: '+91 9876543212',
      office: 'Room 301, CS Block',
      officeHours: 'Mon-Fri: 9:00 AM - 11:00 AM',
      specialization: 'Algorithms, Data Structures',
      experience: '8 years',
      rating: 4.9,
      image: null,
    },
    {
      id: 8,
      code: 'BCS-352',
      subject: 'COA Lab',
      teacher: 'Ms. Akansha Rajput',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'akansha.rajput@nitra.ac.in',
      phone: '+91 9876543213',
      office: 'Room 302, CS Block',
      officeHours: 'Mon-Fri: 11:00 AM - 1:00 PM',
      specialization: 'Computer Architecture, Microprocessors',
      experience: '6 years',
      rating: 4.7,
      image: null,
    },
    {
      id: 9,
      code: 'BCS-353',
      subject: 'WD Workshop',
      teacher: 'Mr. Nitesh Kumar',
      designation: 'Assistant Professor',
      department: 'Computer Science',
      email: 'nitesh.kumar@nitra.ac.in',
      phone: '+91 9876543216',
      office: 'Room 305, CS Block',
      officeHours: 'Mon-Fri: 2:00 PM - 4:00 PM',
      specialization: 'Web Development, Frontend Technologies',
      experience: '5 years',
      rating: 4.4,
      image: null,
    },
    {
      id: 10,
      code: 'BCC-351',
      subject: 'Mini Project/Internship Assistance',
      teacher: 'Ms. Sanjivani Sharma',
      designation: 'Associate Professor',
      department: 'Computer Science',
      email: 'sanjivani.sharma@nitra.ac.in',
      phone: '+91 9876543217',
      office: 'Room 306, CS Block',
      officeHours: 'Mon-Fri: 1:00 PM - 3:00 PM',
      specialization: 'Project Management, Industry Relations',
      experience: '10 years',
      rating: 4.6,
      image: null,
    },
  ];

  const filters = [
    { id: 'all', name: 'All', count: facultyData.length },
    { id: 'professor', name: 'Professor', count: facultyData.filter(f => f.designation === 'Professor').length },
    { id: 'associate', name: 'Associate Professor', count: facultyData.filter(f => f.designation === 'Associate Professor').length },
    { id: 'assistant', name: 'Assistant Professor', count: facultyData.filter(f => f.designation === 'Assistant Professor').length },
  ];

  const getFilteredFaculty = () => {
    let filtered = facultyData;

    // Filter by designation
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(faculty => {
        switch (selectedFilter) {
          case 'professor': return faculty.designation === 'Professor';
          case 'associate': return faculty.designation === 'Associate Professor';
          case 'assistant': return faculty.designation === 'Assistant Professor';
          default: return true;
        }
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(faculty =>
        faculty.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-outline'}
        size={14}
        color="#FFD700"
      />
    ));
  };

  const handleFacultyPress = (faculty) => {
    Alert.alert(
      faculty.teacher,
      `${faculty.designation}\n${faculty.department}\n\nEmail: ${faculty.email}\nPhone: ${faculty.phone}\nOffice: ${faculty.office}\nOffice Hours: ${faculty.officeHours}\n\nSpecialization: ${faculty.specialization}\nExperience: ${faculty.experience}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Contact', onPress: () => {
          Alert.alert('Contact', `Would you like to contact ${faculty.teacher}?`);
        }},
      ]
    );
  };

  const handleCall = (phone) => {
    Alert.alert(
      'Call',
      `Call ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => {
          Alert.alert('Success', 'Call initiated!');
        }},
      ]
    );
  };

  const handleEmail = (email) => {
    Alert.alert(
      'Email',
      `Send email to ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Email', onPress: () => {
          Alert.alert('Success', 'Email app opened!');
        }},
      ]
    );
  };

  const filteredFaculty = getFilteredFaculty();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Faculty</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search faculty, subject, or department..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.id && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter.id && styles.selectedFilterButtonText,
                  ]}
                >
                  {filter.name} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Faculty List */}
        <View style={styles.facultySection}>
          {filteredFaculty.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No faculty found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          ) : (
            filteredFaculty.map((faculty) => (
              <TouchableOpacity
                key={faculty.id}
                style={styles.facultyCard}
                onPress={() => handleFacultyPress(faculty)}
              >
                <View style={styles.facultyHeader}>
                  <View style={styles.facultyInfo}>
                    <View style={styles.avatarContainer}>
                      <Ionicons name="person" size={24} color="#2E7D32" />
                    </View>
                    <View style={styles.facultyDetails}>
                      <Text style={styles.facultyName}>{faculty.teacher}</Text>
                      <Text style={styles.facultyDesignation}>{faculty.designation}</Text>
                      <Text style={styles.facultyDepartment}>{faculty.department}</Text>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <View style={styles.ratingStars}>
                      {getRatingStars(faculty.rating)}
                    </View>
                    <Text style={styles.ratingText}>{faculty.rating}</Text>
                  </View>
                </View>

                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectCode}>{faculty.code}</Text>
                  <Text style={styles.subjectName}>{faculty.subject}</Text>
                </View>

                <View style={styles.facultyFooter}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.officeText}>{faculty.office}</Text>
                    <Text style={styles.hoursText}>{faculty.officeHours}</Text>
                  </View>
                  
                  <View style={styles.contactActions}>
                    <TouchableOpacity
                      style={styles.contactButton}
                      onPress={() => handleCall(faculty.phone)}
                    >
                      <Ionicons name="call" size={16} color="#2E7D32" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.contactButton}
                      onPress={() => handleEmail(faculty.email)}
                    >
                      <Ionicons name="mail" size={16} color="#2E7D32" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Department Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Department Statistics</Text>
          
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{facultyData.length}</Text>
              <Text style={styles.statLabel}>Total Faculty</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {facultyData.filter(f => f.designation === 'Professor').length}
              </Text>
              <Text style={styles.statLabel}>Professors</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {facultyData.filter(f => f.designation === 'Associate Professor').length}
              </Text>
              <Text style={styles.statLabel}>Associate Professors</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {facultyData.filter(f => f.designation === 'Assistant Professor').length}
              </Text>
              <Text style={styles.statLabel}>Assistant Professors</Text>
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
  searchButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedFilterButton: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  facultySection: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  facultyCard: {
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
  facultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  facultyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  facultyDetails: {
    flex: 1,
  },
  facultyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  facultyDesignation: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
    marginBottom: 2,
  },
  facultyDepartment: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  subjectInfo: {
    marginBottom: 10,
    paddingLeft: 65,
  },
  subjectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 14,
    color: '#333',
  },
  facultyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 65,
  },
  contactInfo: {
    flex: 1,
  },
  officeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  hoursText: {
    fontSize: 12,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
  },
  contactButton: {
    padding: 8,
    marginLeft: 5,
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});
