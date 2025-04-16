import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { EthnicityFilter } from '../../components/EthnicityFilter';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const { width } = Dimensions.get('window');

// Common interests for discovery
const INTERESTS = [
  'Hiking',
  'Travel',
  'Music',
  'Cooking',
  'Reading',
  'Fitness',
  'Art',
  'Photography',
  'Movies',
  'Dancing',
  'Yoga',
  'Gaming',
  'Fashion',
  'Technology',
  'Sports',
  'Outdoors'
];

export const FiltersScreen = ({ navigation, route }) => {
  const initialFilters = route.params?.currentFilters || {
    ageRange: [18, 35],
    distance: 25,
    verified: true,
    interests: [],
    ethnicities: [],
    relationshipGoals: [],
    genderPreference: 'female',
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleSaveFilters = () => {
    navigation.navigate('DiscoveryScreen', { updatedFilters: filters });
  };

  const toggleInterest = (interest) => {
    if (filters.interests.includes(interest)) {
      setFilters({ 
        ...filters, 
        interests: filters.interests.filter(i => i !== interest) 
      });
    } else {
      setFilters({
        ...filters,
        interests: [...filters.interests, interest]
      });
    }
  };

  const handleEthnicityChange = (selectedEthnicities) => {
    setFilters({
      ...filters,
      ethnicities: selectedEthnicities
    });
  };

  const handleRelationshipGoalChange = (goal) => {
    setFilters({
      ...filters,
      relationshipGoals: [goal]
    });
  };

  const handleGenderPreferenceChange = (gender) => {
    setFilters({
      ...filters,
      genderPreference: gender
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discovery Filters</Text>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleSaveFilters}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender Preference</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity 
              style={[
                styles.genderOption, 
                filters.genderPreference === 'female' && styles.selectedGenderOption
              ]}
              onPress={() => handleGenderPreferenceChange('female')}
            >
              <Text style={[
                styles.genderOptionText,
                filters.genderPreference === 'female' && styles.selectedGenderOptionText
              ]}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.genderOption, 
                filters.genderPreference === 'male' && styles.selectedGenderOption
              ]}
              onPress={() => handleGenderPreferenceChange('male')}
            >
              <Text style={[
                styles.genderOptionText,
                filters.genderPreference === 'male' && styles.selectedGenderOptionText
              ]}>Male</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Range</Text>
          <View style={styles.ageRangeContainer}>
            <Text style={styles.ageRangeText}>
              {filters.ageRange[0]} - {filters.ageRange[1]} years
            </Text>
            <MultiSlider
              values={[filters.ageRange[0], filters.ageRange[1]]}
              min={18}
              max={65}
              step={1}
              allowOverlap={false}
              snapped
              sliderLength={width - 80}
              selectedStyle={styles.selectedSlider}
              unselectedStyle={styles.unselectedSlider}
              markerStyle={styles.sliderMarker}
              onValuesChange={(values) => setFilters({ ...filters, ageRange: values })}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maximum Distance</Text>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{filters.distance} miles</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={filters.distance}
              onValueChange={(value) => setFilters({ ...filters, distance: value })}
              minimumTrackTintColor="#8B5CF6"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#8B5CF6"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Verified Profiles Only</Text>
            <Switch
              trackColor={{ false: "#E5E7EB", true: "#C4B5FD" }}
              thumbColor={filters.verified ? "#8B5CF6" : "#F9FAFB"}
              onValueChange={(value) => setFilters({ ...filters, verified: value })}
              value={filters.verified}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Relationship Goals</Text>
          <View style={styles.relationshipGoals}>
            <TouchableOpacity 
              style={[
                styles.relationshipGoal, 
                filters.relationshipGoals.includes('Casual') && styles.selectedRelationshipGoal
              ]}
              onPress={() => handleRelationshipGoalChange('Casual')}
            >
              <Text style={[
                styles.relationshipGoalText,
                filters.relationshipGoals.includes('Casual') && styles.selectedRelationshipGoalText
              ]}>Casual Dating</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.relationshipGoal, 
                filters.relationshipGoals.includes('Serious') && styles.selectedRelationshipGoal
              ]}
              onPress={() => handleRelationshipGoalChange('Serious')}
            >
              <Text style={[
                styles.relationshipGoalText,
                filters.relationshipGoals.includes('Serious') && styles.selectedRelationshipGoalText
              ]}>Serious Relationship</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ethnicity</Text>
          <EthnicityFilter
            selectedEthnicities={filters.ethnicities}
            onSelectionChange={handleEthnicityChange}
            multiSelect={true}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {INTERESTS.map((interest) => (
              <TouchableOpacity 
                key={interest}
                style={[
                  styles.interestBadge,
                  filters.interests.includes(interest) && styles.selectedInterestBadge
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text 
                  style={[
                    styles.interestText,
                    filters.interests.includes(interest) && styles.selectedInterestText
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  applyButton: {
    padding: 8,
  },
  applyButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageRangeText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedGenderOption: {
    borderColor: '#8B5CF6',
    backgroundColor: '#EDE9FE',
  },
  genderOptionText: {
    fontSize: 16,
    color: '#4B5563',
  },
  selectedGenderOptionText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  relationshipGoals: {
    marginTop: 12,
  },
  relationshipGoal: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  selectedRelationshipGoal: {
    borderColor: '#8B5CF6',
    backgroundColor: '#EDE9FE',
  },
  relationshipGoalText: {
    fontSize: 16,
    color: '#4B5563',
  },
  selectedRelationshipGoalText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedInterestBadge: {
    backgroundColor: '#EDE9FE',
  },
  interestText: {
    color: '#4B5563',
  },
  selectedInterestText: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
}); 