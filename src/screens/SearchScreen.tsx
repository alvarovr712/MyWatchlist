import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { useWatchlistStore } from "../store/WatchlistStore";
import { useAuthStore } from "../store/AuthStore";
import InstrumentCard from "../components/InstrumentCard";
import { useTheme } from "../utils/useTheme";

const SearchScreen = () => {

  const instruments = useWatchlistStore((state) => state.instruments);
  const userWatchlist = useAuthStore((state) => state.watchlist);
  const addToWatchlist = useAuthStore((state) => state.addToWatchlist);

  const [query, setQuery] = useState("");
  const { width } = useWindowDimensions();
  const isSmall = width < 360;
  const colors = useTheme();

  const filtered = instruments.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.textSecondary}
        placeholder="Search instruments by name or symbol..."
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        contextMenuHidden={true}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 130 }}
        renderItem={({ item }) => {
          const isAdded = userWatchlist.includes(item.id);

          return (
            <InstrumentCard
              instrument={item}
              isSmall={isSmall}
              width={width}
              showAddButton={!isAdded}
              onAdd={() => addToWatchlist(item.id)}
            />
          );
        }}
      />
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
  },
});
