import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// Conversation stages with their corresponding colors
const STAGES = {
  TEXT: {
    name: 'Text Chat',
    color: '#A78BFA', // Light purple
    targetHours: 24,
  },
  VOICE: {
    name: 'Voice Call',
    color: '#8B5CF6', // Medium purple
    targetHours: 72,
  },
  VIDEO: {
    name: 'Video Call',
    color: '#7C3AED', // Dark purple
    targetHours: 96,
  },
  MEETING: {
    name: 'Meeting',
    color: '#6D28D9', // Deeper purple
    targetHours: 168, // 7 days
  }
};

export const ConversationProgressBar = ({ 
  stage, 
  startTime, 
  hoursElapsed, 
  earnedBadges, 
  totalRequiredBadges 
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const badgeProgressAnim = useRef(new Animated.Value(0)).current;
  
  const currentStageInfo = STAGES[stage] || STAGES.TEXT;
  const stageIndex = Object.keys(STAGES).indexOf(stage);
  
  // Calculate progress percentages
  // Time progress is based on current stage's target hours
  const calculateTimeProgress = () => {
    // For each stage, we have a target number of hours
    const targetHours = currentStageInfo.targetHours;
    // Calculate what percentage of the target hours has elapsed
    const progress = Math.min(hoursElapsed / targetHours, 1);
    return progress;
  };
  
  // Badge progress is simply the ratio of earned to required badges
  const calculateBadgeProgress = () => {
    return Math.min(earnedBadges / totalRequiredBadges, 1);
  };
  
  useEffect(() => {
    // Animate the time progress bar
    Animated.timing(progressAnim, {
      toValue: calculateTimeProgress(),
      duration: 300,
      useNativeDriver: false
    }).start();
    
    // Animate the badge progress bar
    Animated.timing(badgeProgressAnim, {
      toValue: calculateBadgeProgress(),
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [hoursElapsed, earnedBadges, stage]);
  
  // Format the time remaining for display
  const formatTimeStatus = () => {
    const targetHours = currentStageInfo.targetHours;
    
    if (hoursElapsed >= targetHours) {
      return "Ready for next stage!";
    }
    
    const hoursRemaining = targetHours - hoursElapsed;
    
    if (hoursRemaining < 1) {
      return "Less than 1 hour left";
    }
    
    return `${Math.floor(hoursRemaining)} hours until next stage`;
  };
  
  // Determine what stage comes next for UI hint
  const getNextStageName = () => {
    const stages = Object.keys(STAGES);
    const nextIndex = stageIndex + 1;
    
    if (nextIndex < stages.length) {
      return STAGES[stages[nextIndex]].name;
    }
    
    return null;
  };
  
  const nextStage = getNextStageName();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stageName}>{currentStageInfo.name}</Text>
        <Text style={styles.timeRemaining}>{formatTimeStatus()}</Text>
      </View>
      
      <View style={styles.progressOuter}>
        <Animated.View 
          style={[
            styles.progressInner,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: currentStageInfo.color
            }
          ]}
        />
      </View>
      
      <View style={styles.stageMarkers}>
        {Object.keys(STAGES).map((key, index) => {
          const isActive = index <= stageIndex;
          const isPast = index < stageIndex;
          
          return (
            <View key={key} style={styles.stageMarkerContainer}>
              <View 
                style={[
                  styles.stageMarker,
                  isActive && { backgroundColor: STAGES[key].color },
                  isPast && styles.pastStageMarker
                ]}
              />
              <Text style={[
                styles.stageMarkerText,
                isActive && { color: STAGES[key].color }
              ]}>
                {STAGES[key].name}
              </Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.badgesHeader}>
        <Text style={styles.badgesTitle}>Badge Progress</Text>
        <Text style={styles.badgesCount}>{earnedBadges}/{totalRequiredBadges}</Text>
      </View>
      
      <View style={styles.progressOuter}>
        <Animated.View 
          style={[
            styles.progressInner,
            {
              width: badgeProgressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: '#059669' // Green for badge progress
            }
          ]}
        />
      </View>
      
      {nextStage && (
        <Text style={styles.nextStageHint}>
          Earn more badges to unlock {nextStage}!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  timeRemaining: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressOuter: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressInner: {
    height: '100%',
    borderRadius: 3,
  },
  stageMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stageMarkerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stageMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
    marginBottom: 4,
  },
  pastStageMarker: {
    backgroundColor: '#9CA3AF', // Darker gray for past stages
  },
  stageMarkerText: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  badgesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  badgesCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  nextStageHint: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
}); 