import React, { useState } from 'react';
import { View, FlatList, useWindowDimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useWatchlistStore } from '../store/WatchlistStore';
import { useAuthStore } from '../store/AuthStore';
import InstrumentCard from '../components/InstrumentCard';
import { useTheme } from '../utils/useTheme';

const WatchlistScreen = () => {
  const instruments = useWatchlistStore((state) => state.instruments);
  const userWatchlist = useAuthStore((state) => state.watchlist);
  const { width } = useWindowDimensions();
  const isSmall = width < 360;
  const colors = useTheme();

  const filtered = instruments.filter((i) => userWatchlist.includes(i.id));

  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name');

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return b.price - a.price;
      case 'change': return b.change - a.change;
      default: return 0;
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => setSortBy('name')} style={[styles.sortButton, { backgroundColor: sortBy === 'name' ? colors.button : colors.input }]}>
          <Text style={[styles.sortText, { color: sortBy === 'name' ? colors.buttonText : colors.text }]}>Name</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy('price')} style={[styles.sortButton, { backgroundColor: sortBy === 'price' ? colors.button : colors.input }]}>
          <Text style={[styles.sortText, { color: sortBy === 'price' ? colors.buttonText : colors.text }]}>Price</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy('change')} style={[styles.sortButton, { backgroundColor: sortBy === 'change' ? colors.button : colors.input }]}>
          <Text style={[styles.sortText, { color: sortBy === 'change' ? colors.buttonText : colors.text }]}>% Change</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 130 }}
        renderItem={({ item }) => (
          <InstrumentCard instrument={item} isSmall={isSmall} width={width} showAddButton={false} />
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 4,
    gap: 10
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 }
  },
  sortText: { fontWeight: "600" },
});

export default WatchlistScreen;
