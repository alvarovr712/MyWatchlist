import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useWatchlistStore } from '../store/WatchlistStore';
import { useAuthStore } from '../store/AuthStore';

function WatchlistScreen() {
  const instruments = useWatchlistStore((state) => state.instruments);
  const userWatchlist = useAuthStore((state) => state.watchlist);
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  //Filter in instruments by user's watchlist
  const filtered = instruments.filter((i) => userWatchlist.includes(i.id));

  return (
    <View style={styles.container}>
      

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.card, isSmall && { padding: 14 }]}>
            <View style={{ maxWidth: width * 0.55 }}>
              <Text style={[styles.name, isSmall && { fontSize: 15 }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.symbol, isSmall && { fontSize: 13 }]} numberOfLines={1}>
                {item.symbol}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={[styles.price, isSmall && { fontSize: 15 }]} numberOfLines={1}>
                ${item.price.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.change,
                  { color: item.change >= 0 ? 'green' : 'red' },
                  isSmall && { fontSize: 13 },
                ]}
                numberOfLines={1}
              >
                {item.change >= 0 ? '+' : ''}
                {item.change.toFixed(2)}%
              </Text>
            </View>
          </View>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  change: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default WatchlistScreen;
