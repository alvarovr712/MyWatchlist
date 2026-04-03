import React, { useState } from 'react';
import { View, FlatList, useWindowDimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useWatchlistStore } from '../store/WatchlistStore';
import { useAuthStore } from '../store/AuthStore';
import InstrumentCard from '../components/InstrumentCard';

function WatchlistScreen() {
  const instruments = useWatchlistStore((state) => state.instruments);
  const userWatchlist = useAuthStore((state) => state.watchlist);
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  const filtered = instruments.filter((i) => userWatchlist.includes(i.id));

  {/*SORT INSTRUMENTS*/ }

  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name');

  const sorted = [...filtered].sort((a, b) => {

    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return b.price - a.price;
      case 'change':
        return b.change - a.change;
      default:
        return 0;
    }
  });


  return (
    <View style={styles.container}>


      {/* SORT BUTTONS */}
    <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => setSortBy('name')} style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}>
          <Text style={[styles.sortText, sortBy === 'name' && styles.sortTextActive]}>
            Name
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy('price')} style={[styles.sortButton, sortBy === 'price' && styles.sortButtonActive]}>
          <Text style={[styles.sortText, sortBy === 'price' && styles.sortTextActive]}>
            Price
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy('change')} style={[ styles.sortButton, sortBy === 'change' && styles.sortButtonActive]}>
          <Text style={[styles.sortText, sortBy === 'change' && styles.sortTextActive]}>
            % Change
          </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f7",
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 4,
    gap:10,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },

  sortButtonActive: {
    backgroundColor: "#00C805",
  },

  sortText: {
    fontWeight: "600",
    color: "#333",
  },

  sortTextActive: {
    color: "#fff",
  },

});

export default WatchlistScreen;



