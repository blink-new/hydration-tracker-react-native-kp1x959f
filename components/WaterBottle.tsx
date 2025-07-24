import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface WaterBottleProps {
  currentAmount: number;
  dailyGoal: number;
}

export default function WaterBottle({ currentAmount, dailyGoal }: WaterBottleProps) {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const percentage = Math.min((currentAmount / dailyGoal) * 100, 100);
  const maxHeight = 280; // Maximum height of water in bottle
  const targetHeight = (percentage / 100) * maxHeight;

  useEffect(() => {
    Animated.spring(animatedHeight, {
      toValue: targetHeight,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();
  }, [targetHeight]);

  return (
    <View style={styles.container}>
      {/* Bottle Container */}
      <View style={styles.bottleContainer}>
        {/* Bottle Cap */}
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          style={styles.bottleCap}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Bottle Body */}
        <View style={styles.bottleBody}>
          {/* Measurement Lines */}
          {[25, 50, 75, 100].map((percent) => (
            <View key={percent} style={[styles.measurementLine, { bottom: (percent / 100) * maxHeight + 20 }]}>
              <View style={styles.measurementTick} />
              <Text style={styles.measurementLabel}>{percent}%</Text>
            </View>
          ))}
          
          {/* Water Fill */}
          <Animated.View style={[styles.waterContainer, { height: animatedHeight }]}>
            <LinearGradient
              colors={['#00D4FF', '#0099CC', '#006699']}
              style={styles.water}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
            />
            
            {/* Water Surface Effect */}
            <View style={styles.waterSurface}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'transparent']}
                style={styles.waterSurfaceGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </View>
          </Animated.View>
          
          {/* Bottle Outline */}
          <View style={styles.bottleOutline} />
        </View>
      </View>
      
      {/* Amount Display */}
      <View style={styles.amountDisplay}>
        <Text style={styles.currentAmount}>{currentAmount}ml</Text>
        <Text style={styles.goalText}>/ {dailyGoal}ml</Text>
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  bottleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottleCap: {
    width: 60,
    height: 25,
    borderRadius: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottleBody: {
    width: 120,
    height: 320,
    borderWidth: 3,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  measurementLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  measurementTick: {
    width: 20,
    height: 1,
    backgroundColor: '#718096',
    marginLeft: 5,
  },
  measurementLabel: {
    fontSize: 10,
    color: '#718096',
    fontWeight: '600',
    marginLeft: 5,
  },
  waterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  water: {
    flex: 1,
    borderRadius: 12,
  },
  waterSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  waterSurfaceGradient: {
    flex: 1,
  },
  bottleOutline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  amountDisplay: {
    alignItems: 'center',
  },
  currentAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00D4FF',
  },
  goalText: {
    fontSize: 16,
    color: '#718096',
    marginTop: 5,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00D4FF',
    marginTop: 8,
  },
});