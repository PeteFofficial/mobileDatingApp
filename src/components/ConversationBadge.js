import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Badge types with their properties
const BADGE_TYPES = {
  DEEP_DIVER: {
    icon: 'chatbubble-ellipses',
    color: '#6366F1',
    label: 'Deep Diver',
    description: 'Asked meaningful questions'
  },
  LAUGHTER: {
    icon: 'happy',
    color: '#F59E0B',
    label: 'Laughter Connection',
    description: 'Shared 5+ laughs'
  },
  QUICK_RESPONDER: {
    icon: 'flash',
    color: '#10B981',
    label: 'Quick Responder',
    description: 'Consistent timely replies'
  },
  SHARED_INTEREST: {
    icon: 'star',
    color: '#8B5CF6',
    label: 'Shared Interest',
    description: 'Discovered 3+ commonalities'
  },
  VULNERABILITY: {
    icon: 'heart',
    color: '#EC4899',
    label: 'Vulnerability Moment',
    description: 'Shared personal stories'
  }
};

export const ConversationBadge = ({ type, size = 'medium', showLabel = false, onPress }) => {
  const badgeInfo = BADGE_TYPES[type] || BADGE_TYPES.DEEP_DIVER;
  
  const getBadgeSize = () => {
    switch (size) {
      case 'small': return { iconSize: 16, containerSize: 32 };
      case 'large': return { iconSize: 32, containerSize: 64 };
      default: return { iconSize: 24, containerSize: 48 };
    }
  };
  
  const { iconSize, containerSize } = getBadgeSize();
  
  return (
    <View style={styles.badgeContainer}>
      <View 
        style={[
          styles.badge, 
          { 
            backgroundColor: badgeInfo.color,
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
          }
        ]}
      >
        <Ionicons name={badgeInfo.icon} size={iconSize} color="white" />
      </View>
      {showLabel && (
        <Text style={styles.badgeLabel}>{badgeInfo.label}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
    textAlign: 'center',
  }
}); 