import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AchievementsScreen = ({ onBack, onMenuPress }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

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

  const achievements = {
    all: [
      {
        id: 1,
        title: 'Academic Excellence Award',
        description: 'Top performer in Data Structures course',
        date: '2024-01-15',
        type: 'academic',
        category: 'award',
      },
      {
        id: 2,
        title: 'Hackathon Winner',
        description: 'First place in college coding competition',
        date: '2024-01-10',
        type: 'competition',
        category: 'award',
      },
      {
        id: 3,
        title: 'Project Showcase',
        description: 'Featured project in college exhibition',
        date: '2024-01-05',
        type: 'project',
        category: 'recognition',
      },
    ],
    photos: [
      {
        id: 4,
        title: 'Award Ceremony',
        description: 'Receiving academic excellence award',
        date: '2024-01-15',
        type: 'photo',
        category: 'award',
      },
      {
        id: 5,
        title: 'Hackathon Team',
        description: 'Team photo after winning competition',
        date: '2024-01-10',
        type: 'photo',
        category: 'competition',
      },
    ],
    videos: [
      {
        id: 6,
        title: 'Project Demo',
        description: 'Video demonstration of final project',
        date: '2024-01-05',
        type: 'video',
        category: 'project',
      },
      {
        id: 7,
        title: 'Presentation',
        description: 'Conference presentation recording',
        date: '2024-01-01',
        type: 'video',
        category: 'presentation',
      },
    ],
    documents: [
      {
        id: 8,
        title: 'Certificate of Excellence',
        description: 'Official certificate for academic achievement',
        date: '2024-01-15',
        type: 'document',
        category: 'certificate',
      },
      {
        id: 9,
        title: 'Recommendation Letter',
        description: 'Letter from professor for internship',
        date: '2024-01-12',
        type: 'document',
        category: 'recommendation',
      },
    ],
  };

  const tabs = [
    { id: 'all', name: 'All', icon: 'grid' },
    { id: 'photos', name: 'Photos', icon: 'camera' },
    { id: 'videos', name: 'Videos', icon: 'play-circle' },
    { id: 'documents', name: 'Documents', icon: 'document' },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'award': return '#FFD700';
      case 'competition': return '#4CAF50';
      case 'project': return '#2196F3';
      case 'recognition': return '#FF9800';
      case 'certificate': return '#9C27B0';
      case 'recommendation': return '#607D8B';
      case 'presentation': return '#E91E63';
      default: return '#666';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'photo': return 'camera';
      case 'video': return 'play-circle';
      case 'document': return 'document';
      case 'award': return 'trophy';
      case 'competition': return 'medal';
      case 'project': return 'code-slash';
      default: return 'star';
    }
  };

  const renderAchievementCard = (achievement) => (
    <View key={achievement.id} style={styles.achievementCard}>
      <View style={styles.achievementHeader}>
        <View style={[styles.achievementIcon, { backgroundColor: getCategoryColor(achievement.category) }]}>
          <Ionicons name={getTypeIcon(achievement.type)} size={24} color="#fff" />
        </View>
        <View style={styles.achievementInfo}>
          <Text style={styles.achievementTitle}>{achievement.title}</Text>
          <Text style={styles.achievementDate}>{achievement.date}</Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(achievement.category) }]}>
          <Text style={styles.categoryText}>{achievement.category.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.achievementDescription}>{achievement.description}</Text>
      
      <View style={styles.achievementFooter}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
          <Ionicons name="arrow-forward" size={16} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const getFilteredAchievements = () => {
    return achievements[selectedTab] || [];
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
        <Text style={styles.title}>Achievements</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={selectedTab === tab.id ? '#fff' : 'rgba(255, 255, 255, 0.7)'} 
            />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.achievementsContainer}>
          {getFilteredAchievements().length > 0 ? (
            getFilteredAchievements().map(renderAchievementCard)
          ) : (
            <View style={styles.noAchievementsContainer}>
              <Ionicons name="trophy-outline" size={60} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.noAchievementsText}>No achievements found</Text>
              <Text style={styles.noAchievementsSubtext}>Your achievements will appear here</Text>
            </View>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  achievementsContainer: {
    gap: 15,
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  achievementDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  achievementDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: 15,
  },
  achievementFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 5,
  },
  noAchievementsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noAchievementsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  noAchievementsSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
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

export default AchievementsScreen;
