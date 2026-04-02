import React from 'react';
import { View, FlatList, useWindowDimensions, StyleSheet } from 'react-native';
import { useWatchlistStore } from '../store/WatchlistStore';
import { useAuthStore } from '../store/AuthStore';
import InstrumentCard from '../components/InstrumentCard';

function WatchlistScreen() {
  const instruments = useWatchlistStore((state) => state.instruments);
  const userWatchlist = useAuthStore((state) => state.watchlist);
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  const filtered = instruments.filter((i) => userWatchlist.includes(i.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <InstrumentCard instrument={item} isSmall={isSmall} width={width} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f7',
  },
});

export default WatchlistScreen;
