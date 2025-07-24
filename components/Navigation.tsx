import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './HomeScreen';
import ChartsScreen from './ChartsScreen';
import SettingsScreen from './SettingsScreen';

export function Navigation() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'charts', label: 'Charts', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'charts':
        return <ChartsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      <View style={styles.navigationContainer}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.tabContent,
                activeTab === tab.id && styles.activeTabContent
              ]}>
                <Text style={[
                  styles.tabIcon,
                  activeTab === tab.id && styles.activeTabIcon
                ]}>
                  {tab.icon}
                </Text>
                <Text style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.activeTabLabel
                ]}>
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  content: {
    flex: 1,
  },
  navigationContainer: {
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    transform: [{ scale: 1.1 }],
  },
  tabContent: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 15,
    minWidth: 60,
  },
  activeTabContent: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeTabIcon: {
    fontSize: 22,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  activeTabLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});