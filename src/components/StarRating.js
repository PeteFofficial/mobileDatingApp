import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StarRating = ({ 
  rating = 0,
  maxRating = 4,
  size = 'medium',
  interactive = false,
  onRatingChange,
  showLabel = true
}) => {
  
  // Star labels for different ratings
  const ratingLabels = [
    'Basic connection',
    'Voice unlocked',
    'Video unlocked',
    'Meeting suggested'
  ];
  
  // Star size based on the size prop
  const getStarSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 24;
    }
  };
  
  const starSize = getStarSize();
  
  // Handle star press if interactive
  const handleStarPress = (selectedRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  // Generate the stars
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const filled = i <= rating;
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={!interactive}
          onPress={() => handleStarPress(i)}
          style={styles.starContainer}
        >
          <Ionicons
            name={filled ? 'star' : 'star-outline'}
            size={starSize}
            color={filled ? '#EAB308' : '#D1D5DB'}
          />
        </TouchableOpacity>
      );
    }
    
    return stars;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>
        {renderStars()}
      </View>
      
      {showLabel && rating > 0 && rating <= ratingLabels.length && (
        <Text style={styles.ratingLabel}>
          {ratingLabels[rating - 1]}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    padding: 4,
  },
  ratingLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  }
}); 