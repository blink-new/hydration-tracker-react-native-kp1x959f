import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHydrationStore } from '../store/hydrationStore';
import WaterBottle from './WaterBottle';

export default function HomeScreen() {
  const { 
    addEntry, 
    getTodayTotal, 
    dailyGoal, 
    loadData 
  } = useHydrationStore();
  
  const [currentAmount, setCurrentAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    loadData().then(() => {
      setCurrentAmount(getTodayTotal());
    });
  }, []);

  useEffect(() => {
    setCurrentAmount(getTodayTotal());
  }, [getTodayTotal]);

  const handleAddWater = (amount: number) => {
    addEntry(amount);
    setCurrentAmount(getTodayTotal());
    
    // Show motivational message
    const newTotal = getTodayTotal() + amount;
    const percentage = (newTotal / dailyGoal) * 100;
    
    if (percentage >= 100) {
      Alert.alert('🎉 Congratulations!', 'You\'ve reached your daily hydration goal!');
    } else if (percentage >= 75) {
      Alert.alert('💪 Great Progress!', 'You\'re almost there! Keep it up!');
    } else if (percentage >= 50) {
      Alert.alert('👍 Good Job!', 'You\'re halfway to your goal!');
    }
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0 && amount <= 2000) {
      handleAddWater(amount);
      setCustomAmount('');
      setShowCustomInput(false);
    } else {
      Alert.alert('Invalid Amount', 'Please enter a valid amount between 1-2000ml');
    }
  };

  const percentage = Math.min((currentAmount / dailyGoal) * 100, 100);
  const remaining = Math.max(0, dailyGoal - currentAmount);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Daily Hydration</Text>
        <Text style={styles.headerSubtitle}>Stay Healthy & Hydrated</Text>
      </LinearGradient>

      {/* Water Bottle */}
      <WaterBottle currentAmount={currentAmount} dailyGoal={dailyGoal} />

      {/* Quick Add Buttons */}
      <View style={styles.quickAddSection}>
        <Text style={styles.sectionTitle}>Quick Add</Text>
        
        <View style={styles.quickButtonsContainer}>
          {[250, 500, 750].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickButton}
              onPress={() => handleAddWater(amount)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.quickButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.quickButtonText}>{amount}ml</Text>
                <Text style={styles.quickButtonSubtext}>
                  {amount === 250 ? '🥤' : amount === 500 ? '🍶' : '🍺'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Amount Button */}
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setShowCustomInput(!showCustomInput)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#a8edea', '#fed6e3']}
            style={styles.customButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.customButtonText}>Custom Amount</Text>
            <Text style={styles.customButtonSubtext}>⚡</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Custom Input */}
        {showCustomInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Enter amount (ml)"
              value={customAmount}
              onChangeText={setCustomAmount}
              keyboardType="numeric"
              maxLength={4}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleCustomAdd}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Today's Summary */}
      <View style={styles.summarySection}>
        <LinearGradient
          colors={['#f093fb', '#f5576c']}
          style={styles.summaryCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{currentAmount}ml</Text>
              <Text style={styles.summaryLabel}>Consumed</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{remaining}ml</Text>
              <Text style={styles.summaryLabel}>Remaining</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{Math.round(percentage)}%</Text>
              <Text style={styles.summaryLabel}>Progress</Text>
            </View>
          </View>
        </LinearGradient>
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
  quickAddSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
    textAlign: 'center',
  },
  quickButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  quickButton: {
    flex: 1,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  quickButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  quickButtonSubtext: {
    fontSize: 20,
  },
  customButton: {
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  customButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginRight: 8,
  },
  customButtonSubtext: {
    fontSize: 18,
  },
  customInputContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  customInput: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 80,
    height: 50,
    backgroundColor: '#4facfe',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 15,
  },
});