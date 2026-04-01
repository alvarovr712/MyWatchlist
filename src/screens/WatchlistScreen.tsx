import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <Text>Watchlist Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WatchlistScreen;
