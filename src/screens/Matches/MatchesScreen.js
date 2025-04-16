import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Sample data for matches - in a real app this would come from a backend
const DEMO_MATCHES = [
  {
    id: '1',
    name: 'Emily',
    age: 26,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    matchedDate: '2 days ago',
    compatibility: 92,
    lastMessage: null,
    bio: 'Bookworm, tea drinker, and concert lover.',
  },
  {
    id: '2',
    name: 'James',
    age: 32,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    matchedDate: '1 week ago',
    compatibility: 85,
    lastMessage: null,
    bio: 'Photographer who loves to travel.',
  },
  {
    id: '3',
    name: 'Sophia',
    age: 27,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    matchedDate: '3 days ago',
    compatibility: 88,
    lastMessage: null,
    bio: 'Yoga instructor and foodie.',
  },
  {
    id: '4',
    name: 'Michael',
    age: 30,
    image: 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    matchedDate: '5 days ago',
    compatibility: 79,
    lastMessage: null,
    bio: 'Chef by day, musician by night.',
  },
];

export const MatchesScreen = ({ navigation }) => {
  // State to track waiting matches and active conversation
  const [matches, setMatches] = useState(DEMO_MATCHES);
  const [activeMatchId, setActiveMatchId] = useState(null);

  // Find the active match from the ID if there is one
  const activeMatch = matches.find(match => match.id === activeMatchId);

  // Start a conversation with a match
  const startConversation = (matchId) => {
    if (activeMatchId) {
      // Alert the user they already have an active conversation
      Alert.alert(
        "Active Conversation In Progress",
        "You can only chat with one person at a time. Would you like to end your current conversation?",
        [
          {
            text: "No, Keep Current Chat",
            style: "cancel"
          },
          { 
            text: "Yes, Switch Conversations", 
            onPress: () => {
              setActiveMatchId(matchId);
              navigation.navigate('Conversation', { matchId });
            }
          }
        ]
      );
    } else {
      // Start a new conversation
      setActiveMatchId(matchId);
      navigation.navigate('Conversation', { matchId });
    }
  };

  // End the active conversation
  const endConversation = () => {
    Alert.alert(
      "End Conversation",
      "Are you sure you want to end this conversation? You can start a new one with another match.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "End Conversation", 
          style: "destructive",
          onPress: () => {
            setActiveMatchId(null);
          }
        }
      ]
    );
  };

  // Render each match item
  const renderMatchItem = ({ item }) => {
    const isActive = item.id === activeMatchId;

    return (
      <View style={[
        styles.matchItem,
        isActive && styles.activeMatchItem
      ]}>
        <Image source={{ uri: item.image }} style={styles.matchImage} />
        
        <View style={styles.matchDetails}>
          <View style={styles.matchNameRow}>
            <Text style={styles.matchName}>{item.name}, {item.age}</Text>
            <Text style={styles.compatibilityScore}>{item.compatibility}%</Text>
          </View>
          
          <Text style={styles.matchDate}>Matched {item.matchedDate}</Text>
          <Text style={styles.matchBio} numberOfLines={2}>{item.bio}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.chatButton,
            isActive ? styles.endChatButton : (activeMatchId ? styles.disabledChatButton : styles.chatButton)
          ]}
          onPress={() => isActive ? endConversation() : startConversation(item.id)}
          disabled={!isActive && activeMatchId !== null}
        >
          <Text style={isActive ? styles.endChatButtonText : styles.chatButtonText}>
            {isActive ? 'End Chat' : 'Chat'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Matches</Text>
      </View>
      
      {activeMatchId && (
        <View style={styles.activeMatchBanner}>
          <Text style={styles.activeMatchBannerText}>
            You're currently chatting with {activeMatch?.name}
          </Text>
        </View>
      )}

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderMatchItem}
        contentContainerStyle={styles.matchesList}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>No matches yet</Text>
            <Text style={styles.emptyStateText}>Start swiping to find your meaningful connections!</Text>
          </View>
        }
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Quality over quantity - focus on one conversation at a time
        </Text>
      </View>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginTop: 40, // For status bar
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  activeMatchBanner: {
    backgroundColor: '#EDE9FE',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD6FE',
  },
  activeMatchBannerText: {
    color: '#5B21B6',
    fontWeight: '500',
  },
  matchesList: {
    padding: 12,
  },
  matchItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activeMatchItem: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  matchImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  matchDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  matchNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  compatibilityScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  matchDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  matchBio: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  chatButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },
  chatButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledChatButton: {
    backgroundColor: '#E5E7EB',
  },
  endChatButton: {
    backgroundColor: '#FEE2E2',
  },
  endChatButtonText: {
    color: '#DC2626',
  },
  emptyStateContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
}); 