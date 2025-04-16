import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const STAGES = {
  TEXT: { label: 'Text Chat', color: '#818CF8' },
  VOICE: { label: 'Voice Call', color: '#A78BFA' },
  VIDEO: { label: 'Video Call', color: '#C084FC' },
  MEETING: { label: 'Meeting', color: '#E879F9' }
};

const TOTAL_HOURS = 72; // 3-day window

export const ConversationProgressBar = ({ 
  stage = 'TEXT', 
  startTime, 
  hoursRemaining = TOTAL_HOURS,
  earnedBadges = 0,
  totalRequiredBadges = 8
}) => {
  const [progressAnim] = useState(new Animated.Value(0));
  
  // Calculate progress percentages
  const timeProgress = ((TOTAL_HOURS - hoursRemaining) / TOTAL_HOURS) * 100;
  const badgeProgress = (earnedBadges / totalRequiredBadges) * 100;
  
  const stageInfo = STAGES[stage] || STAGES.TEXT;
  
  useEffect(() => {
    // Animate the progress bar
    Animated.timing(progressAnim, {
      toValue: timeProgress,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [timeProgress]);
  
  // Format hours remaining for display
  const formatTimeRemaining = () => {
    if (hoursRemaining < 1) {
      return 'Less than 1 hour remaining';
    }
    if (hoursRemaining === 1) {
      return '1 hour remaining';
    }
    return `${Math.floor(hoursRemaining)} hours remaining`;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.stageText}>
          Stage: <Text style={[styles.stageValue, { color: stageInfo.color }]}>{stageInfo.label}</Text>
        </Text>
        <Text style={styles.timeText}>{formatTimeRemaining()}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: stageInfo.color
            }
          ]} 
        />
      </View>
      
      <View style={styles.badgeProgress}>
        <Text style={styles.badgeText}>
          Badges: {earnedBadges}/{totalRequiredBadges}
        </Text>
        <View style={styles.badgeProgressContainer}>
          <View 
            style={[
              styles.badgeProgressBar, 
              { 
                width: `${badgeProgress}%`,
                backgroundColor: stageInfo.color
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageText: {
    fontSize: 14,
    color: '#4B5563',
  },
  stageValue: {
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  badgeProgress: {
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  badgeProgressContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  badgeProgressBar: {
    height: '100%',
    borderRadius: 2,
  }
}); 