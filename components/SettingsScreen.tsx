import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHydrationStore } from '../store/hydrationStore';

export default function SettingsScreen() {
  const { dailyGoal, setDailyGoal, loadData } = useHydrationStore();
  const [goalInput, setGoalInput] = useState(dailyGoal.toString());
  const [showGoalInput, setShowGoalInput] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setGoalInput(dailyGoal.toString());
  }, [dailyGoal]);

  const handleUpdateGoal = () => {
    const newGoal = parseInt(goalInput);
    if (newGoal && newGoal >= 500 && newGoal <= 5000) {
      setDailyGoal(newGoal);
      setShowGoalInput(false);
      Alert.alert('Success!', `Daily goal updated to ${newGoal}ml`);
    } else {
      Alert.alert('Invalid Goal', 'Please enter a goal between 500-5000ml');
    }
  };

  const presetGoals = [1500, 2000, 2500, 3000];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize Your Experience</Text>
      </LinearGradient>

      {/* Current Goal Display */}
      <View style={styles.currentGoalSection}>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          style={styles.currentGoalCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.currentGoalTitle}>Current Daily Goal</Text>
          <Text style={styles.currentGoalValue}>{dailyGoal}ml</Text>
          <Text style={styles.currentGoalSubtext}>
            {dailyGoal >= 2000 ? '🏆 Excellent hydration goal!' : 
             dailyGoal >= 1500 ? '👍 Good hydration goal!' : 
             '💧 Consider increasing your goal'}
          </Text>
        </LinearGradient>
      </View>

      {/* Preset Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Goal Presets</Text>
        <Text style={styles.sectionSubtitle}>Tap to set your daily hydration goal</Text>
        
        <View style={styles.presetGoalsContainer}>
          {presetGoals.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={styles.presetGoalButton}
              onPress={() => {
                setDailyGoal(goal);
                Alert.alert('Goal Updated!', `Daily goal set to ${goal}ml`);
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={goal === dailyGoal ? ['#43e97b', '#38f9d7'] : ['#a8edea', '#fed6e3']}
                style={styles.presetGoalGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={[
                  styles.presetGoalText,
                  { color: goal === dailyGoal ? '#fff' : '#2D3748' }
                ]}>
                  {goal}ml
                </Text>
                <Text style={styles.presetGoalSubtext}>
                  {goal === 1500 ? '🥤 Light' :
                   goal === 2000 ? '💧 Standard' :
                   goal === 2500 ? '🏃 Active' : '💪 Athlete'}
                </Text>
                {goal === dailyGoal && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>✓</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Goal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Goal</Text>
        <Text style={styles.sectionSubtitle}>Set your own personalized daily goal</Text>
        
        <TouchableOpacity
          style={styles.customGoalButton}
          onPress={() => setShowGoalInput(!showGoalInput)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#fa709a', '#fee140']}
            style={styles.customGoalGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.customGoalText}>Set Custom Goal</Text>
            <Text style={styles.customGoalSubtext}>⚡</Text>
          </LinearGradient>
        </TouchableOpacity>

        {showGoalInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.goalInput}
              placeholder="Enter goal (500-5000ml)"
              value={goalInput}
              onChangeText={setGoalInput}
              keyboardType="numeric"
              maxLength={4}
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateGoal}
              activeOpacity={0.8}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Hydration Tips */}
      <View style={styles.section}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.tipsCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.tipsTitle}>💡 Hydration Tips</Text>
          
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Start your day with a glass of water</Text>
            <Text style={styles.tipItem}>• Drink water before, during, and after exercise</Text>
            <Text style={styles.tipItem}>• Keep a water bottle with you throughout the day</Text>
            <Text style={styles.tipItem}>• Set reminders to drink water regularly</Text>
            <Text style={styles.tipItem}>• Eat water-rich foods like fruits and vegetables</Text>
          </View>
        </LinearGradient>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfoCard}>
          <Text style={styles.appInfoTitle}>Hydration Tracker</Text>
          <Text style={styles.appInfoVersion}>Version 1.0</Text>
          <Text style={styles.appInfoDescription}>
            Stay healthy and hydrated with beautiful tracking and insights.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  currentGoalSection: {
    padding: 20,
  },
  currentGoalCard: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  currentGoalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  currentGoalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  currentGoalSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 15,
  },
  presetGoalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  presetGoalButton: {
    width: '47%',
    height: 80,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  presetGoalGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  presetGoalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  presetGoalSubtext: {
    fontSize: 12,
  },
  currentBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  customGoalButton: {
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  customGoalGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customGoalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  customGoalSubtext: {
    fontSize: 18,
  },
  customInputContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  goalInput: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  updateButton: {
    width: 80,
    height: 50,
    backgroundColor: '#4facfe',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsCard: {
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  appInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  appInfoVersion: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 10,
  },
  appInfoDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});