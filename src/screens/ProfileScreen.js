import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';

export const ProfileScreen = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState(null);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navigation will happen automatically due to the auth state listener
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  // In a real app, this would come from your user data
  const userProfile = {
    name: 'Alex Johnson',
    age: 28,
    bio: 'Coffee lover, hiking enthusiast, and software developer. Looking for someone who loves the outdoors!',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    interests: ['Hiking', 'Coffee', 'Photography', 'Travel', 'Cooking'],
  };
  
  // Account settings data
  const [settings, setSettings] = useState({
    privacy: {
      showProfileInDiscovery: true,
      showLocation: true,
      showAge: true,
      showInterests: true,
      showOccupation: true,
    },
    notifications: {
      newMatches: true,
      messages: true,
      conversationBadges: true,
      conversationStageChanges: true,
      systemUpdates: false,
      marketingEmails: false,
    },
  });
  
  // Handle settings toggle
  const toggleSetting = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };
  
  // Toggle section visibility
  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: userProfile.image }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{userProfile.name}, {userProfile.age}</Text>
          <Text style={styles.profileLocation}>{userProfile.location}</Text>
          <Text style={styles.profileOccupation}>{userProfile.occupation}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>{userProfile.bio}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests.map((interest, index) => (
              <View key={index} style={styles.interestBadge}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Account Settings Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Account Settings</Text>
        </View>
        
        {/* Edit Profile */}
        <TouchableOpacity 
          style={styles.settingsCard}
          onPress={() => toggleSection('editProfile')}
        >
          <View style={styles.settingsCardHeader}>
            <View style={styles.settingsIconContainer}>
              <Ionicons name="person-outline" size={22} color="#8B5CF6" />
            </View>
            <Text style={styles.settingsCardTitle}>Edit Profile</Text>
            <Ionicons 
              name={activeSection === 'editProfile' ? "chevron-up" : "chevron-down"} 
              size={22} 
              color="#9CA3AF" 
            />
          </View>
          
          {activeSection === 'editProfile' && (
            <View style={styles.settingsCardContent}>
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingItemText}>Edit Photos</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingItemText}>Edit Bio</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingItemText}>Edit Interests</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
                <Text style={styles.settingItemText}>Edit Personal Information</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Privacy Settings */}
        <TouchableOpacity 
          style={styles.settingsCard}
          onPress={() => toggleSection('privacy')}
        >
          <View style={styles.settingsCardHeader}>
            <View style={styles.settingsIconContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#8B5CF6" />
            </View>
            <Text style={styles.settingsCardTitle}>Privacy Settings</Text>
            <Ionicons 
              name={activeSection === 'privacy' ? "chevron-up" : "chevron-down"} 
              size={22} 
              color="#9CA3AF" 
            />
          </View>
          
          {activeSection === 'privacy' && (
            <View style={styles.settingsCardContent}>
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Show Profile in Discovery</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.privacy.showProfileInDiscovery ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('privacy', 'showProfileInDiscovery')}
                  value={settings.privacy.showProfileInDiscovery}
                />
              </View>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Show Location</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.privacy.showLocation ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('privacy', 'showLocation')}
                  value={settings.privacy.showLocation}
                />
              </View>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Show Age</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.privacy.showAge ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('privacy', 'showAge')}
                  value={settings.privacy.showAge}
                />
              </View>
              
              <View style={[styles.settingItem, styles.settingItemLast]}>
                <Text style={styles.settingItemText}>Show Occupation</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.privacy.showOccupation ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('privacy', 'showOccupation')}
                  value={settings.privacy.showOccupation}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Notification Preferences */}
        <TouchableOpacity 
          style={styles.settingsCard}
          onPress={() => toggleSection('notifications')}
        >
          <View style={styles.settingsCardHeader}>
            <View style={styles.settingsIconContainer}>
              <Ionicons name="notifications-outline" size={22} color="#8B5CF6" />
            </View>
            <Text style={styles.settingsCardTitle}>Notification Preferences</Text>
            <Ionicons 
              name={activeSection === 'notifications' ? "chevron-up" : "chevron-down"} 
              size={22} 
              color="#9CA3AF" 
            />
          </View>
          
          {activeSection === 'notifications' && (
            <View style={styles.settingsCardContent}>
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>New Matches</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.notifications.newMatches ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('notifications', 'newMatches')}
                  value={settings.notifications.newMatches}
                />
              </View>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Messages</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.notifications.messages ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('notifications', 'messages')}
                  value={settings.notifications.messages}
                />
              </View>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingItemText}>Conversation Badges</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.notifications.conversationBadges ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('notifications', 'conversationBadges')}
                  value={settings.notifications.conversationBadges}
                />
              </View>
              
              <View style={[styles.settingItem, styles.settingItemLast]}>
                <Text style={styles.settingItemText}>System Updates</Text>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
                  thumbColor={settings.notifications.systemUpdates ? "#8B5CF6" : "#F9FAFB"}
                  onValueChange={() => toggleSetting('notifications', 'systemUpdates')}
                  value={settings.notifications.systemUpdates}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Help & Support */}
        <TouchableOpacity 
          style={styles.settingsCard}
          onPress={() => toggleSection('support')}
        >
          <View style={styles.settingsCardHeader}>
            <View style={styles.settingsIconContainer}>
              <Ionicons name="help-buoy-outline" size={22} color="#8B5CF6" />
            </View>
            <Text style={styles.settingsCardTitle}>Help & Support</Text>
            <Ionicons 
              name={activeSection === 'support' ? "chevron-up" : "chevron-down"} 
              size={22} 
              color="#9CA3AF" 
            />
          </View>
          
          {activeSection === 'support' && (
            <View style={styles.settingsCardContent}>
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingItemText}>Contact Support</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingItemText}>FAQ</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingItemText}>Terms of Service</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
                <Text style={styles.settingItemText}>Privacy Policy</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  profileOccupation: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsCardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsCardContent: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemText: {
    fontSize: 15,
    color: '#4B5563',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 