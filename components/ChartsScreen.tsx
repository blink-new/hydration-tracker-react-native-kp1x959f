import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHydrationStore } from '../store/hydrationStore';

const { width: screenWidth } = Dimensions.get('window');
const chartWidth = screenWidth - 40;
const chartHeight = 200;

export default function ChartsScreen() {
  const { getMonthlyData, dailyGoal, loadData } = useHydrationStore();
  const [monthlyData, setMonthlyData] = useState<{ date: string; amount: number }[]>([]);

  useEffect(() => {
    loadData().then(() => {
      setMonthlyData(getMonthlyData());
    });
  }, []);

  const maxAmount = Math.max(...monthlyData.map(d => d.amount), dailyGoal);
  const avgAmount = monthlyData.reduce((sum, d) => sum + d.amount, 0) / monthlyData.length;
  const bestDay = Math.max(...monthlyData.map(d => d.amount));
  const goalsMet = monthlyData.filter(d => d.amount >= dailyGoal).length;

  // Prepare chart data
  const chartData = monthlyData.slice(-14); // Last 14 days for better visibility
  const barWidth = (chartWidth - 60) / chartData.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Progress Charts</Text>
        <Text style={styles.headerSubtitle}>Track Your Hydration Journey</Text>
      </LinearGradient>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>{Math.round(avgAmount)}ml</Text>
            <Text style={styles.statLabel}>Daily Average</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#43e97b', '#38f9d7']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>{bestDay}ml</Text>
            <Text style={styles.statLabel}>Best Day</Text>
          </LinearGradient>
        </View>

        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#fa709a', '#fee140']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>{goalsMet}</Text>
            <Text style={styles.statLabel}>Goals Met</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#a8edea', '#fed6e3']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statValue}>{dailyGoal}ml</Text>
            <Text style={styles.statLabel}>Daily Goal</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Bar Chart */}
      <View style={styles.chartSection}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.chartContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.chartTitle}>Last 14 Days</Text>
          
          <View style={styles.chart}>
            {/* Goal Line */}
            <View 
              style={[
                styles.goalLine, 
                { bottom: (dailyGoal / maxAmount) * chartHeight + 40 }
              ]} 
            >
              <View style={styles.goalLineDash} />
              <Text style={styles.goalLineText}>Goal</Text>
            </View>

            {/* Bars */}
            <View style={styles.barsContainer}>
              {chartData.map((data, index) => {
                const barHeight = (data.amount / maxAmount) * chartHeight;
                const date = new Date(data.date);
                const dayLabel = date.getDate().toString();
                
                return (
                  <View key={data.date} style={styles.barContainer}>
                    <View style={[styles.barBackground, { width: barWidth - 4, height: chartHeight }]}>
                      <LinearGradient
                        colors={data.amount >= dailyGoal ? ['#10B981', '#34D399'] : ['#3B82F6', '#60A5FA']}
                        style={[styles.bar, { height: barHeight }]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                      />
                    </View>
                    <Text style={styles.barLabel}>{dayLabel}</Text>
                  </View>
                );
              })}
            </View>

            {/* Y-axis labels */}
            <View style={styles.yAxisLabels}>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <Text 
                  key={ratio} 
                  style={[
                    styles.yAxisLabel, 
                    { bottom: ratio * chartHeight + 35 }
                  ]}
                >
                  {Math.round(ratio * maxAmount)}
                </Text>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Line Chart */}
      <View style={styles.chartSection}>
        <LinearGradient
          colors={['#f093fb', '#f5576c']}
          style={styles.chartContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.chartTitle}>30-Day Trend</Text>
          
          <View style={styles.lineChart}>
            {/* Grid Lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => (
              <View 
                key={ratio}
                style={[
                  styles.gridLine, 
                  { bottom: ratio * chartHeight + 40 }
                ]} 
              />
            ))}

            {/* Line Path */}
            <View style={styles.lineContainer}>
              {monthlyData.map((data, index) => {
                if (index === 0) return null;
                
                const prevData = monthlyData[index - 1];
                const x1 = ((index - 1) / (monthlyData.length - 1)) * (chartWidth - 60);
                const y1 = chartHeight - (prevData.amount / maxAmount) * chartHeight;
                const x2 = (index / (monthlyData.length - 1)) * (chartWidth - 60);
                const y2 = chartHeight - (data.amount / maxAmount) * chartHeight;
                
                return (
                  <View
                    key={data.date}
                    style={[
                      styles.lineSegment,
                      {
                        left: x1 + 30,
                        top: y1 + 40,
                        width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
                        transform: [
                          { rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad` }
                        ]
                      }
                    ]}
                  />
                );
              })}
            </View>

            {/* Data Points */}
            {monthlyData.map((data, index) => {
              if (index % 3 !== 0) return null; // Show every 3rd point
              
              const x = (index / (monthlyData.length - 1)) * (chartWidth - 60);
              const y = chartHeight - (data.amount / maxAmount) * chartHeight;
              
              return (
                <View
                  key={data.date}
                  style={[
                    styles.dataPoint,
                    { left: x + 25, top: y + 35 }
                  ]}
                />
              );
            })}

            {/* X-axis labels */}
            <View style={styles.xAxisLabels}>
              {monthlyData.map((data, index) => {
                if (index % 5 !== 0) return null; // Show every 5th day
                
                const date = new Date(data.date);
                const dayLabel = `${date.getMonth() + 1}/${date.getDate()}`;
                const x = (index / (monthlyData.length - 1)) * (chartWidth - 60);
                
                return (
                  <Text 
                    key={data.date}
                    style={[
                      styles.xAxisLabel, 
                      { left: x + 15 }
                    ]}
                  >
                    {dayLabel}
                  </Text>
                );
              })}
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
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 15,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  chartContainer: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  chart: {
    height: chartHeight + 60,
    position: 'relative',
  },
  goalLine: {
    position: 'absolute',
    left: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  goalLineDash: {
    flex: 1,
    height: 2,
    backgroundColor: '#F59E0B',
    opacity: 0.8,
  },
  goalLineText: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: 'center',
  },
  barBackground: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    borderRadius: 4,
    minHeight: 2,
  },
  barLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  yAxisLabels: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  yAxisLabel: {
    position: 'absolute',
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  lineChart: {
    height: chartHeight + 60,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 30,
    right: 30,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  lineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lineSegment: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  xAxisLabels: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  xAxisLabel: {
    position: 'absolute',
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
});