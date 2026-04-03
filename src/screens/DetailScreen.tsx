import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/MainStackNavigator";
import { ChangeColor } from "../utils/ChangeColor";
import { useWatchlistStore } from "../store/WatchlistStore";
import { LineChart } from "react-native-gifted-charts";
import { useWindowDimensions } from "react-native";
import { useAuthStore } from "../store/AuthStore";
import { useState } from "react";

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;

  {/*SEARCH INSTRUMENT BY ID*/ }
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

  {/*GRAPH*/ }

  const { width: screenWidth } = useWindowDimensions();
  const containerPadding = 40;
  const graphPadding = 32;
  const chartWidth = screenWidth - containerPadding - graphPadding;
  const yAxisLabelWidth = 35;



  const chartColor = ChangeColor(instrument.change);

  const { favorites, addFavorite, removeFavorite } = useAuthStore();
  const isFavorite = favorites.includes(id);

  const [range, setRange] = useState<'5m' | '1h' | '12h' | '1d'>('1d');

  const getChartData = () => {

    switch (range) {

      case '5m':
        return instrument.history.slice(-10);
      case '1h':
        return instrument.history.slice(-40);
      case '12h':
        return instrument.history.slice(-60);
      case '1d':
        return instrument.history.slice(-80);
    }
  }

  const chartData = getChartData().map((value) => ({ value }));

  {/*TOOGLE FAVORITE*/ }

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);

    } else {
      addFavorite(id);
    }
  };

  {/*BUTTON ADD OR REMOVE WATCHLIST*/ }
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAuthStore();
  const isInWatchlist = watchlist.includes(id);

  const toggleWatchlist = () => {

    if (isInWatchlist) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id);
    }
  };



  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={toggleFavorite}
            activeOpacity={0.7}
            style={styles.favoriteToggle}
          >
            <Icon name={isFavorite ? "star" : "star-outline"} size={26} color="#FFB000" />
          </TouchableOpacity>
          <Text style={styles.name}>{instrument.name}</Text>
        </View>
        <Text style={styles.symbol}>{instrument.symbol}</Text>
      </View>

      {/* PRICE */}
      <View style={styles.priceBox}>
        <Text style={styles.price}>${instrument.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: chartColor }]}>
          {instrument.change >= 0 ? "+" : ""}
          {instrument.change.toFixed(2)}%
        </Text>
      </View>
      {/* RANGE SELECTOR */}
      <View style={styles.rangeSelector}>
        {(['5m', '1h', '12h', '1d'] as const).map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRange(r)}
            style={[
              styles.rangeButton,
              range === r && styles.rangeButtonActive
            ]}
          >
            <Text
              style={[
                styles.rangeText,
                range === r && styles.rangeTextActive
              ]}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.graphContainer}>
        {chartData.length > 1 ? (

        <LineChart
          data={chartData}
          areaChart
          curved
          height={180}
          width={chartWidth - yAxisLabelWidth}
          yAxisLabelWidth={yAxisLabelWidth}
          initialSpacing={0}
          endSpacing={0}
          spacing={
            chartData.length > 1
              ? (chartWidth - yAxisLabelWidth) / (chartData.length - 1)
              : 1
          }
          color={chartColor}
          thickness={3}
          startFillColor={chartColor}
          endFillColor="white"
          startOpacity={0.4}
          endOpacity={0.1}
          hideDataPoints
          noOfSections={10}
          yAxisColor="#f0f0f0"
          xAxisColor="#f0f0f0"
          yAxisTextStyle={{ color: "#999", fontSize: 10 }}
          isAnimated
          animationDuration={1200}
        />
        ) : (
          <Text style={{textAlign: "center", color:"#999",padding:20}}>Not enough data for this range</Text>
        )}
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, isInWatchlist &&{backgroundColor: "red"}]} onPress={toggleWatchlist}>
          <Text style={styles.actionText}>{isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f7",
  },
  header: {
    marginBottom: 10,
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteToggle: {
    marginRight: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  symbol: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  priceBox: {
    marginTop: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  change: {
    fontSize: 18,
    marginTop: 4,
    textAlign: "center",
  },
  graphContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    overflow: "hidden",
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
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  rangeSelector: {
    flexDirection: "row",
    marginTop: 40,
    gap: 10,
  },
  rangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  rangeButtonActive: {
    backgroundColor: "#00C805",
  },
  rangeText: {
    color: "#333",
    fontWeight: "600",
  },
  rangeTextActive: {
    color: "#fff",
  },

});
