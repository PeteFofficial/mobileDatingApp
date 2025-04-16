import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Sample profile data - in a real app, this would come from a backend
const DEMO_PROFILES = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: 'Coffee lover, hiking enthusiast, and software developer. Looking for someone who loves the outdoors!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    distance: '5 miles away',
    compatibility: 87,
  },
  {
    id: '2',
    name: 'James',
    age: 32,
    bio: 'Photographer who loves to travel. Let's grab coffee and talk about our adventures.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    distance: '8 miles away',
    compatibility: 92,
  },
  {
    id: '3',
    name: 'Emily',
    age: 26,
    bio: 'Bookworm, tea drinker, and concert lover. Looking for someone to share deep conversations.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    distance: '3 miles away',
    compatibility: 78,
  },
  {
    id: '4',
    name: 'Michael',
    age: 30,
    bio: 'Chef by day, musician by night. Let me cook you dinner while we listen to vinyl records.',
    image: 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    distance: '12 miles away',
    compatibility: 85,
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 120;

export const DiscoveryScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState(DEMO_PROFILES);
  const position = new Animated.ValueXY();

  // Handle what happens when a card is swiped
  const onSwipeComplete = (direction, profileId) => {
    const action = direction === 'right' ? 'liked' : 'passed';
    console.log(`You ${action} profile ${profileId}`);
    
    // Remove the swiped profile from the deck
    setProfiles(prevProfiles => prevProfiles.filter(p => p.id !== profileId));
  };

  // Set up the pan responder for dragging/swiping
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    }
  });

  // Force swipe animation in a direction
  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      if (profiles.length > 0) {
        onSwipeComplete(direction, profiles[0].id);
      }
      position.setValue({ x: 0, y: 0 });
    });
  };

  // Reset card position if not swiped far enough
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  // Calculate rotation based on swipe distance
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  // Style for the current card being swiped
  const cardStyle = {
    transform: [{ rotate }, ...position.getTranslateTransform()],
    zIndex: 1,
  };

  // Render each profile card
  const renderCards = () => {
    if (profiles.length === 0) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreCardsText}>No more profiles to show!</Text>
          <Text style={styles.noMoreCardsSubtext}>Check back later for new matches</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setProfiles(DEMO_PROFILES)} // Reset for demo
          >
            <Text style={styles.buttonText}>Refresh Profiles</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return profiles.map((profile, index) => {
      if (index === 0) {
        return (
          <Animated.View 
            key={profile.id} 
            style={[styles.card, cardStyle]} 
            {...panResponder.panHandlers}
          >
            <ProfileCard profile={profile} />
          </Animated.View>
        );
      }
      
      // Style for cards behind the current one
      return (
        <Animated.View 
          key={profile.id} 
          style={[styles.card, { top: 10 * (index), zIndex: -index }]}
        >
          <ProfileCard profile={profile} />
        </Animated.View>
      );
    }).reverse(); // Reverse to get correct stacking order
  };

  // Component for the buttons below the card
  const renderActions = () => {
    if (profiles.length === 0) return null;
    
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]}
          onPress={() => forceSwipe('left')}
        >
          <Text style={styles.passButtonText}>Pass</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => forceSwipe('right')}
        >
          <Text style={styles.likeButtonText}>Like</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Discover</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Text style={styles.filtersText}>Filters</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        {renderCards()}
      </View>
      
      {renderActions()}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Remember: you can only chat with one match at a time!
        </Text>
      </View>
    </View>
  );
};

// Component for an individual profile card
const ProfileCard = ({ profile }) => (
  <View style={styles.cardContent}>
    <Image source={{ uri: profile.image }} style={styles.image} />
    
    <View style={styles.profileInfo}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{profile.name}, {profile.age}</Text>
        <View style={styles.compatibilityBadge}>
          <Text style={styles.compatibilityText}>{profile.compatibility}%</Text>
        </View>
      </View>
      
      <Text style={styles.distance}>{profile.distance}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filtersText: {
    fontSize: 16,
    color: '#8B5CF6',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  profileInfo: {
    padding: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  compatibilityBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  compatibilityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  bio: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 10,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  passButton: {
    backgroundColor: '#F3F4F6',
  },
  passButtonText: {
    color: '#4B5563',
    fontWeight: '600',
    fontSize: 16,
  },
  likeButton: {
    backgroundColor: '#8B5CF6',
  },
  likeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
  noMoreCards: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  noMoreCardsSubtext: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 