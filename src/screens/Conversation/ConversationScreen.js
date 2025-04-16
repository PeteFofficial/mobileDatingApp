import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Sample data for a conversation
const DEMO_USERS = {
  '1': {
    id: '1',
    name: 'Emily',
    age: 26,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    bio: 'Bookworm, tea drinker, and concert lover.',
  },
  '2': {
    id: '2',
    name: 'James',
    age: 32,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    bio: 'Photographer who loves to travel.',
  },
  '3': {
    id: '3',
    name: 'Sophia',
    age: 27,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    bio: 'Yoga instructor and foodie.',
  },
  '4': {
    id: '4',
    name: 'Michael',
    age: 30,
    image: 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    bio: 'Chef by day, musician by night.',
  },
};

// Demo messages for a conversation
const DEMO_MESSAGES = {
  '1': [
    {
      id: '1',
      text: "Hi there! I noticed you like hiking too. What's your favorite trail?",
      sender: '1', // Emily
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: '2',
      text: "Hey Emily! I love hiking the Pacific Crest Trail sections near me. Have you ever been?",
      sender: 'me',
      timestamp: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
    },
    {
      id: '3',
      text: "I haven't, but it's definitely on my bucket list! I usually go to Mount Rainier when I can. The views are breathtaking!",
      sender: '1', // Emily
      timestamp: new Date(Date.now() - 79200000).toISOString(), // 22 hours ago
    },
    {
      id: '4',
      text: "Mount Rainier is gorgeous! We should plan a hike sometime. Are you free next weekend?",
      sender: 'me',
      timestamp: new Date(Date.now() - 75600000).toISOString(), // 21 hours ago
    },
    {
      id: '5',
      text: "That sounds great! I'm free on Saturday afternoon. Would that work for you?",
      sender: '1', // Emily
      timestamp: new Date(Date.now() - 72000000).toISOString(), // 20 hours ago
    },
  ],
  '2': [],
  '3': [],
  '4': [],
};

export const ConversationScreen = ({ route, navigation }) => {
  const { matchId } = route.params || { matchId: '1' }; // Default to first match for demo
  const match = DEMO_USERS[matchId];
  
  const [messages, setMessages] = useState(DEMO_MESSAGES[matchId] || []);
  const [inputText, setInputText] = useState('');
  
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Send a new message
  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: String(Date.now()),
      text: inputText.trim(),
      sender: 'me',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  // Format timestamp to a readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render message item
  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';

    return (
      <View style={[
        styles.messageContainer,
        isMe ? styles.myMessageContainer : styles.theirMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          isMe ? styles.myMessageBubble : styles.theirMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isMe ? styles.myMessageText : styles.theirMessageText
          ]}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
      </View>
    );
  };

  // Return to matches screen
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.profileInfo}>
          <Image source={{ uri: match.image }} style={styles.profileImage} />
          <View>
            <Text style={styles.profileName}>{match.name}, {match.age}</Text>
            <Text style={styles.profileBio} numberOfLines={1}>{match.bio}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>i</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.reminderBanner}>
        <Text style={styles.reminderText}>
          Remember: This is your only active conversation!
        </Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        ListEmptyComponent={
          <View style={styles.emptyChat}>
            <Text style={styles.emptyChatTitle}>Start the conversation!</Text>
            <Text style={styles.emptyChatText}>
              Say something interesting to get the conversation flowing.
            </Text>
          </View>
        }
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            inputText.trim() === '' && styles.disabledSendButton
          ]}
          onPress={sendMessage}
          disabled={inputText.trim() === ''}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginTop: 40, // For status bar
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileBio: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  reminderBanner: {
    backgroundColor: '#EDE9FE',
    padding: 8,
    alignItems: 'center',
  },
  reminderText: {
    color: '#5B21B6',
    fontSize: 12,
    fontWeight: '500',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#8B5CF6',
    borderBottomRightRadius: 4,
  },
  theirMessageBubble: {
    backgroundColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#E5E7EB',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyChat: {
    padding: 40,
    alignItems: 'center',
  },
  emptyChatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyChatText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
}); 