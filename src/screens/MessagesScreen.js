import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const MessagesScreen = ({ navigation }) => {
  // Sample conversation data
  const conversations = [
    {
      id: '1',
      name: 'Sarah',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      lastMessage: 'I\'d love to go hiking this weekend if you\'re free!',
      timestamp: '10:30 AM',
      unread: true,
    },
    {
      id: '2',
      name: 'James',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      lastMessage: 'That coffee shop sounds great. When are you free?',
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: '3',
      name: 'Emily',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      lastMessage: 'I just finished that book you recommended!',
      timestamp: '2 days ago',
      unread: false,
    }
  ];

  const renderConversation = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Conversation', { match: item })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.timestamp}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text 
            style={[
              styles.conversationMessage, 
              item.unread && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && <View style={styles.unreadBadge} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      
      <View style={styles.reminderBanner}>
        <Text style={styles.reminderText}>
          Remember: You can only have one active conversation at a time!
        </Text>
      </View>
      
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.conversationList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No messages yet</Text>
          <Text style={styles.emptyStateMessage}>
            When you match with someone, you'll be able to message them here.
          </Text>
        </View>
      )}
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
  reminderBanner: {
    backgroundColor: '#EDE9FE',
    padding: 10,
    alignItems: 'center',
  },
  reminderText: {
    color: '#5B21B6',
    fontSize: 14,
    fontWeight: '500',
  },
  conversationList: {
    padding: 10,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  conversationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationMessage: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
  unreadMessage: {
    color: '#1F2937',
    fontWeight: '500',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
}); 