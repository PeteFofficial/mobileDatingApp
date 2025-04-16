import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// List of ethnicity options
const ETHNICITY_OPTIONS = [
  'Asian',
  'Black',
  'Hispanic/Latino',
  'Middle Eastern',
  'Native American',
  'Pacific Islander',
  'White/Caucasian',
  'Multiracial',
  'Other',
  'Prefer not to say'
];

export const EthnicityFilter = ({ 
  selectedEthnicities = [], 
  onSelectionChange,
  multiSelect = true,
  title = 'Ethnicity' 
}) => {
  
  const handleToggle = (ethnicity) => {
    if (!onSelectionChange) return;
    
    let newSelection = [...selectedEthnicities];
    
    if (selectedEthnicities.includes(ethnicity)) {
      // Remove from selection
      newSelection = newSelection.filter(item => item !== ethnicity);
    } else {
      // Add to selection (handle single vs multi-select)
      if (multiSelect) {
        newSelection.push(ethnicity);
      } else {
        newSelection = [ethnicity];
      }
    }
    
    onSelectionChange(newSelection);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {ETHNICITY_OPTIONS.map((ethnicity) => {
          const isSelected = selectedEthnicities.includes(ethnicity);
          
          return (
            <TouchableOpacity
              key={ethnicity}
              style={[
                styles.optionChip,
                isSelected && styles.selectedChip
              ]}
              onPress={() => handleToggle(ethnicity)}
            >
              <Text 
                style={[
                  styles.optionText,
                  isSelected && styles.selectedText
                ]}
              >
                {ethnicity}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      <Text style={styles.helperText}>
        {multiSelect ? 'Select all that apply' : 'Select one option'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingVertical: 5,
  },
  optionChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#EDE9FE',
  },
  optionText: {
    color: '#4B5563',
    fontSize: 14,
  },
  selectedText: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  helperText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  }
}); 