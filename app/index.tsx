import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Navigation } from '../components/Navigation';

export default function Home() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});