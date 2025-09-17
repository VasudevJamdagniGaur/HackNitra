import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TeacherRemarksScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const remarksData = [
    {
      id: 1,
      teacher: 'Dr. Rishabh Raj',
      subject: 'Laser System & Application (BOE-312)',
      date: '2024-01-15',
      type: 'positive',
      remark: 'Excellent performance in the recent assignment. Shows great understanding of laser physics concepts. Keep up the good work!',
      rating: 5,
    },
    {
      id: 2,
      teacher: 'Ms. Vandana Sharma',
      subject: 'Data Structures (BCS-301)',
      date: '2024-01-12',
      type: 'constructive',
      remark: 'Good progress in understanding algorithms. Need to focus more on time complexity analysis. Practice more coding problems.',
      rating: 4,
    },
    {
      id: 3,
      teacher: 'Mr. Partha Basu',
      subject: 'Tech Communication (BAS-301)',
      date: '2024-01-10',
      type: 'positive',
      remark: 'Outstanding presentation skills! Your technical writing has improved significantly. Well done!',
      rating: 5,
    },
    {
      id: 4,
      teacher: 'Ms. Akansha Rajput',
      subject: 'Computer Organization (BCS-302)',
      date: '2024-01-08',
      type: 'constructive',
      remark: 'Good understanding of CPU architecture. Try to participate more in class discussions and ask questions.',
      rating: 3,
    },
    {
      id: 5,
      teacher: 'Ms. Priyanka Arora',
      subject: 'Discrete Structures (BCS-303)',
      date: '2024-01-05',
      type: 'positive',
      remark: 'Excellent work on graph theory problems. Your logical thinking skills are impressive.',
      rating: 5,
    },
    {
      id: 6,
      teacher: 'Dr. Rajesh Kumar',
      subject: 'Python Programming (BCC-302)',
      date: '2024-01-03',
      type: 'constructive',
      remark: 'Good coding skills but need to improve code documentation and comments. Focus on writing cleaner code.',
      rating: 4,
    },
  ];

  const filters = [
    { id: 'all', name: 'All', count: remarksData.length },
    { id: 'positive', name: 'Positive', count: remarksData.filter(r => r.type === 'positive').length },
    { id: 'constructive', name: 'Constructive', count: remarksData.filter(r => r.type === 'constructive').length },
  ];

  const getFilteredRemarks = () => {
    if (selectedFilter === 'all') {
      return remarksData;
    }
    return remarksData.filter(remark => remark.type === selectedFilter);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'positive': return '#4CAF50';
      case 'constructive': return '#FF9800';
      default: return '#666';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'positive': return 'thumbs-up';
      case 'constructive': return 'bulb';
      default: return 'chatbubble';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#FFD700"
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleRemarkPress = (remark) => {
    Alert.alert(
      'Teacher Remark',
      `From: ${remark.teacher}\nSubject: ${remark.subject}\nDate: ${formatDate(remark.date)}\n\n${remark.remark}`,
      [{ text: 'OK' }]
    );
  };

  const filteredRemarks = getFilteredRemarks();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Teacher Remarks</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{remarksData.length}</Text>
            <Text style={styles.statLabel}>Total Remarks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {remarksData.filter(r => r.type === 'positive').length}
            </Text>
            <Text style={styles.statLabel}>Positive</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {remarksData.filter(r => r.type === 'constructive').length}
            </Text>
            <Text style={styles.statLabel}>Constructive</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
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
        </View>

        {/* Remarks List */}
        <View style={styles.remarksSection}>
          {filteredRemarks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No remarks found</Text>
              <Text style={styles.emptySubtext}>
                {selectedFilter === 'all' 
                  ? 'No teacher remarks available yet'
                  : `No ${selectedFilter} remarks available`
                }
              </Text>
            </View>
          ) : (
            filteredRemarks.map((remark) => (
              <TouchableOpacity
                key={remark.id}
                style={styles.remarkCard}
                onPress={() => handleRemarkPress(remark)}
              >
                <View style={styles.remarkHeader}>
                  <View style={styles.teacherInfo}>
                    <View style={[styles.typeIcon, { backgroundColor: getTypeColor(remark.type) }]}>
                      <Ionicons name={getTypeIcon(remark.type)} size={16} color="#fff" />
                    </View>
                    <View style={styles.teacherDetails}>
                      <Text style={styles.teacherName}>{remark.teacher}</Text>
                      <Text style={styles.subjectName}>{remark.subject}</Text>
                    </View>
                  </View>
                  <Text style={styles.remarkDate}>{formatDate(remark.date)}</Text>
                </View>

                <Text style={styles.remarkText} numberOfLines={3}>
                  {remark.remark}
                </Text>

                <View style={styles.remarkFooter}>
                  <View style={styles.ratingContainer}>
                    {getRatingStars(remark.rating)}
                  </View>
                  <View style={[styles.typeBadge, { backgroundColor: getTypeColor(remark.type) }]}>
                    <Text style={styles.typeBadgeText}>
                      {remark.type.charAt(0).toUpperCase() + remark.type.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.activityText}>
                Last remark received: {formatDate(remarksData[0]?.date || 'N/A')}
              </Text>
            </View>
            
            <View style={styles.activityItem}>
              <Ionicons name="trending-up" size={16} color="#4CAF50" />
              <Text style={styles.activityText}>
                Average rating: {(remarksData.reduce((sum, r) => sum + r.rating, 0) / remarksData.length).toFixed(1)}/5
              </Text>
            </View>
            
            <View style={styles.activityItem}>
              <Ionicons name="people" size={16} color="#2E7D32" />
              <Text style={styles.activityText}>
                Teachers who provided feedback: {new Set(remarksData.map(r => r.teacher)).size}
              </Text>
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
  refreshButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedFilterButtonText: {
    color: '#fff',
  },
  remarksSection: {
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
  remarkCard: {
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
  remarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  teacherDetails: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 12,
    color: '#666',
  },
  remarkDate: {
    fontSize: 12,
    color: '#666',
  },
  remarkText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  remarkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  activitySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});
