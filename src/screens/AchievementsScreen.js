import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AchievementsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('all');

  const achievementsData = {
    all: [
      {
        id: 1,
        title: 'Academic Excellence Award',
        description: 'Achieved 90%+ in all subjects for Semester 3',
        date: '2024-01-15',
        type: 'academic',
        category: 'award',
        image: null,
        level: 'gold',
      },
      {
        id: 2,
        title: 'Coding Competition Winner',
        description: '1st place in inter-college coding competition',
        date: '2024-01-10',
        type: 'competition',
        category: 'certificate',
        image: null,
        level: 'gold',
      },
      {
        id: 3,
        title: 'Project Showcase',
        description: 'Best project award for mobile app development',
        date: '2024-01-08',
        type: 'project',
        category: 'certificate',
        image: null,
        level: 'silver',
      },
      {
        id: 4,
        title: 'Perfect Attendance',
        description: '100% attendance for 3 consecutive months',
        date: '2024-01-05',
        type: 'attendance',
        category: 'badge',
        image: null,
        level: 'bronze',
      },
      {
        id: 5,
        title: 'Research Paper Publication',
        description: 'Published paper on AI in healthcare',
        date: '2024-01-01',
        type: 'research',
        category: 'document',
        image: null,
        level: 'gold',
      },
    ],
    photos: [
      {
        id: 1,
        title: 'Award Ceremony',
        description: 'Receiving academic excellence award',
        date: '2024-01-15',
        type: 'photo',
        category: 'photo',
        image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Award+Ceremony',
        level: 'gold',
      },
      {
        id: 2,
        title: 'Coding Competition',
        description: 'Team photo after winning competition',
        date: '2024-01-10',
        type: 'photo',
        category: 'photo',
        image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Coding+Competition',
        level: 'gold',
      },
      {
        id: 3,
        title: 'Project Presentation',
        description: 'Presenting mobile app project',
        date: '2024-01-08',
        type: 'photo',
        category: 'photo',
        image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Project+Presentation',
        level: 'silver',
      },
    ],
    videos: [
      {
        id: 1,
        title: 'Award Acceptance Speech',
        description: 'Video of acceptance speech at award ceremony',
        date: '2024-01-15',
        type: 'video',
        category: 'video',
        image: 'https://via.placeholder.com/300x200/F44336/FFFFFF?text=Video+Thumbnail',
        level: 'gold',
        duration: '2:30',
      },
      {
        id: 2,
        title: 'Project Demo',
        description: 'Demo video of mobile app project',
        date: '2024-01-08',
        type: 'video',
        category: 'video',
        image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Project+Demo',
        level: 'silver',
        duration: '5:45',
      },
    ],
    documents: [
      {
        id: 1,
        title: 'Academic Excellence Certificate',
        description: 'Certificate for achieving 90%+ in all subjects',
        date: '2024-01-15',
        type: 'document',
        category: 'certificate',
        image: null,
        level: 'gold',
        fileSize: '2.5 MB',
      },
      {
        id: 2,
        title: 'Coding Competition Certificate',
        description: '1st place certificate from coding competition',
        date: '2024-01-10',
        type: 'document',
        category: 'certificate',
        image: null,
        level: 'gold',
        fileSize: '1.8 MB',
      },
      {
        id: 3,
        title: 'Research Paper PDF',
        description: 'Published research paper on AI in healthcare',
        date: '2024-01-01',
        type: 'document',
        category: 'document',
        image: null,
        level: 'gold',
        fileSize: '3.2 MB',
      },
      {
        id: 4,
        title: 'Project Report',
        description: 'Detailed project report for mobile app',
        date: '2024-01-08',
        type: 'document',
        category: 'document',
        image: null,
        level: 'silver',
        fileSize: '4.1 MB',
      },
    ],
  };

  const tabs = [
    { id: 'all', name: 'All', count: achievementsData.all.length },
    { id: 'photos', name: 'Photos', count: achievementsData.photos.length },
    { id: 'videos', name: 'Videos', count: achievementsData.videos.length },
    { id: 'documents', name: 'Documents', count: achievementsData.documents.length },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#666';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'gold': return 'trophy';
      case 'silver': return 'medal';
      case 'bronze': return 'ribbon';
      default: return 'star';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'academic': return 'school';
      case 'competition': return 'trophy';
      case 'project': return 'code-slash';
      case 'attendance': return 'checkmark-circle';
      case 'research': return 'library';
      case 'photo': return 'camera';
      case 'video': return 'videocam';
      case 'document': return 'document-text';
      default: return 'star';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleAchievementPress = (achievement) => {
    Alert.alert(
      achievement.title,
      `${achievement.description}\n\nDate: ${formatDate(achievement.date)}\nLevel: ${achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View Details', onPress: () => {
          Alert.alert('Details', 'Achievement details would be shown here');
        }},
      ]
    );
  };

  const handleDownload = (achievement) => {
    Alert.alert(
      'Download',
      `Download ${achievement.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => {
          Alert.alert('Success', 'File downloaded successfully!');
        }},
      ]
    );
  };

  const currentData = achievementsData[activeTab];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Achievements</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{achievementsData.all.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {achievementsData.all.filter(a => a.level === 'gold').length}
            </Text>
            <Text style={styles.statLabel}>Gold</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {achievementsData.all.filter(a => a.level === 'silver').length}
            </Text>
            <Text style={styles.statLabel}>Silver</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {achievementsData.all.filter(a => a.level === 'bronze').length}
            </Text>
            <Text style={styles.statLabel}>Bronze</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  activeTab === tab.id && styles.activeTabButton,
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab.id && styles.activeTabButtonText,
                  ]}
                >
                  {tab.name} ({tab.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Achievements List */}
        <View style={styles.achievementsSection}>
          {currentData.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="trophy-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No achievements found</Text>
              <Text style={styles.emptySubtext}>
                {activeTab === 'all' 
                  ? 'No achievements available yet'
                  : `No ${activeTab} available`
                }
              </Text>
            </View>
          ) : (
            currentData.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={styles.achievementCard}
                onPress={() => handleAchievementPress(achievement)}
              >
                <View style={styles.achievementHeader}>
                  <View style={styles.achievementInfo}>
                    <View style={[styles.levelIcon, { backgroundColor: getLevelColor(achievement.level) }]}>
                      <Ionicons name={getLevelIcon(achievement.level)} size={20} color="#fff" />
                    </View>
                    <View style={styles.achievementDetails}>
                      <Text style={styles.achievementTitle}>{achievement.title}</Text>
                      <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    </View>
                  </View>
                  <Text style={styles.achievementDate}>{formatDate(achievement.date)}</Text>
                </View>

                {achievement.image && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: achievement.image }} style={styles.achievementImage} />
                    {achievement.duration && (
                      <View style={styles.durationBadge}>
                        <Ionicons name="play" size={12} color="#fff" />
                        <Text style={styles.durationText}>{achievement.duration}</Text>
                      </View>
                    )}
                  </View>
                )}

                <View style={styles.achievementFooter}>
                  <View style={styles.typeContainer}>
                    <Ionicons name={getTypeIcon(achievement.type)} size={16} color="#666" />
                    <Text style={styles.typeText}>
                      {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                    </Text>
                  </View>
                  
                  <View style={styles.actionsContainer}>
                    {achievement.fileSize && (
                      <Text style={styles.fileSizeText}>{achievement.fileSize}</Text>
                    )}
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDownload(achievement)}
                    >
                      <Ionicons name="download" size={16} color="#2E7D32" />
                    </TouchableOpacity>
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
              <Ionicons name="trophy" size={16} color="#FFD700" />
              <Text style={styles.activityText}>
                Latest achievement: {achievementsData.all[0]?.title || 'None'}
              </Text>
            </View>
            
            <View style={styles.activityItem}>
              <Ionicons name="calendar" size={16} color="#2E7D32" />
              <Text style={styles.activityText}>
                Achievements this month: {achievementsData.all.filter(a => {
                  const achievementDate = new Date(a.date);
                  const currentDate = new Date();
                  return achievementDate.getMonth() === currentDate.getMonth() && 
                         achievementDate.getFullYear() === currentDate.getFullYear();
                }).length}
              </Text>
            </View>
            
            <View style={styles.activityItem}>
              <Ionicons name="trending-up" size={16} color="#4CAF50" />
              <Text style={styles.activityText}>
                Achievement streak: 3 months
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
  shareButton: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  tabContainer: {
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTabButton: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  achievementsSection: {
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
  achievementCard: {
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
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  achievementInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  achievementDate: {
    fontSize: 12,
    color: '#666',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  achievementImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 2,
  },
  achievementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSizeText: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  actionButton: {
    padding: 5,
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
