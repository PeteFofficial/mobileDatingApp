import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Different stage action types with their properties
const ACTION_TYPES = {
  VOICE_CALL: {
    icon: 'call',
    label: 'Voice Call',
    color: '#A78BFA',
    backgroundColor: '#EDE9FE',
  },
  VIDEO_CALL: {
    icon: 'videocam',
    label: 'Video Call',
    color: '#C084FC',
    backgroundColor: '#F3E8FF',
  },
  SUGGEST_MEETING: {
    icon: 'calendar',
    label: 'Suggest Meeting',
    color: '#E879F9',
    backgroundColor: '#FAE8FF',
  },
};

export const StageActionButton = ({ 
  type, 
  enabled = true, 
  pulsing = false, 
  onPress,
  style,
}) => {
  const actionInfo = ACTION_TYPES[type] || ACTION_TYPES.VOICE_CALL;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Set up pulsing animation if enabled
  useEffect(() => {
    if (pulsing && enabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
    
    return () => pulseAnim.stopAnimation();
  }, [pulsing, enabled]);
  
  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: actionInfo.backgroundColor,
            opacity: enabled ? 1 : 0.5,
          },
        ]}
        disabled={!enabled}
        onPress={onPress}
      >
        <Ionicons 
          name={actionInfo.icon} 
          size={24} 
          color={actionInfo.color} 
        />
        <Text 
          style={[
            styles.label,
            { color: actionInfo.color }
          ]}
        >
          {actionInfo.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
}); 