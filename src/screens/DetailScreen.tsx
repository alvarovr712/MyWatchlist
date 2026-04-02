import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/MainStackNavigator";
import { ChangeColor } from "../utils/ChangeColor";
import { useWatchlistStore } from "../store/WatchlistStore";





type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;

  const instruments = useWatchlistStore((state) => state.instruments);
  const instrument = instruments.find((item) => item.id === id);

  if (!instrument) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Instrument not found
        </Text>
      </View>
    )
  }

  const chartData = instrument.history.map((value, index) => ({
    x: index,
    y: value,
  }));

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{instrument.name}</Text>
        <Text style={styles.symbol}>{instrument.symbol}</Text>
      </View>

      {/* PRICE */}
      <View style={styles.priceBox}>
        <Text style={styles.price}>${instrument.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: ChangeColor(instrument.change) },]}
        >
          {instrument.change >= 0 ? "+" : ""}
          {instrument.change.toFixed(2)}%
        </Text>
      </View>

      
      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <Text style={styles.actionText}>Añadir a Watchlist</Text>
        </View>

        <View style={styles.actionButton}>
          <Text style={styles.actionText}>Añadir a Favoritos</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
  },
  symbol: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
  priceBox: {
    marginTop: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
  },
  change: {
    fontSize: 18,
    marginTop: 4,
  },
  graphContainer: {
  marginTop: 30,
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 10,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
},
  actions: {
    marginTop: 30,
  },
  actionButton: {
    backgroundColor: "#00C805",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
