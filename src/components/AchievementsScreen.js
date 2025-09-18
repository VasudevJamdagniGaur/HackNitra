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
    all: [],
    photos: [],
    videos: [],
    documents: [],
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
    color: '#E6EEF8',
  },
  placeholder: {
    width: 44,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#0F1724',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
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
    backgroundColor: '#FACC15',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A9C3FF',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#0F254D',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  achievementsContainer: {
    gap: 15,
  },
  achievementCard: {
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
    color: '#E6EEF8',
    marginBottom: 5,
  },
  achievementDate: {
    fontSize: 14,
    color: '#A9C3FF',
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
    color: '#A9C3FF',
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
    color: '#E6EEF8',
    marginTop: 20,
    marginBottom: 10,
  },
  noAchievementsSubtext: {
    fontSize: 14,
    color: '#A9C3FF',
    textAlign: 'center',
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
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6EEF8',
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
    borderBottomColor: 'rgba(255,255,255,0.06)',
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
    color: '#E6EEF8',
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
