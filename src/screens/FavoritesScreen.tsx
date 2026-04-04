import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, FlatList } from "react-native";
import { useAuthStore } from "../store/AuthStore";
import { useWatchlistStore } from "../store/WatchlistStore";
import InstrumentCard from "../components/InstrumentCard";
import { useTheme } from "../utils/useTheme";

const FavoritesScreen = () => {

  const favorites = useAuthStore((state) => state.favorites);
  const instruments = useWatchlistStore((state) => state.instruments);
  const removeFavorite = useAuthStore((state) => state.removeFavorite);

  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  const filtered = instruments.filter((f) => favorites.includes(f.id));

  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList

        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 130 }}
        renderItem={({ item }) => (
          <InstrumentCard
            instrument={item}
            isSmall={isSmall}
            width={width}
            showAddButton={false}
            favoriteButton={true}
            onAddFavorite={() => removeFavorite(item.id)}
          />
        )}

        ListEmptyComponent={
          <Text style={[styles.empyText, { color: colors.textSecondary }]}>
            You have no favorites yet.
          </Text>
        }
      />

    </View>
  )
}

export default FavoritesScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },

  empyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  }

})