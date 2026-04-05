import { View, Text, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/MainStackNavigator";
import { ChangeColor } from "../utils/ChangeColor";
import { useWatchlistStore } from "../store/WatchlistStore";
import { LineChart } from "react-native-gifted-charts";
import { useWindowDimensions } from "react-native";
import { useAuthStore } from "../store/AuthStore";
import { useEffect, useState } from "react";
import { useTheme } from "../utils/useTheme";

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;
  const colors = useTheme();
  const fetchHistory = useWatchlistStore((state) => state.fetchHistory);
  const instruments = useWatchlistStore((state) => state.instruments);
  
  const { width: screenWidth } = useWindowDimensions();
  const { favorites, addFavorite, removeFavorite } = useAuthStore();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAuthStore();
  
  const [range, setRange] = useState<'5m' | '1h' | '12h' | '1d'>('1d');
  const [loadingHistory, setLoadingHistory] = useState(true);

  const instrument = instruments.find((item) => item.id === id);
  const isFavorite = favorites.includes(id);
  const isInWatchlist = watchlist.includes(id);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        setLoadingHistory(true);
        await fetchHistory(id);
        setLoadingHistory(false);
      }
    };
    loadData();
  }, [id, fetchHistory]);

  if (!instrument) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", backgroundColor: colors.background }]}>
        <Text style={{ fontSize: 16, color: colors.textSecondary }}>
          Instrument not found
        </Text>
      </View>
    );
  }

  if (loadingHistory && instrument.history.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.text} />
        <Text style={{ color: colors.textSecondary, marginTop: 12 }}>Charge history...</Text>
      </View>
    );
  }

  const hasHistory = !loadingHistory && instrument.history.length > 0;

  // GRAPH CALCULATIONS
  const containerPadding = 40;
  const graphPadding = 32;
  const chartWidth = screenWidth - containerPadding - graphPadding;
  const yAxisLabelWidth = 35;

  const chartColor = ChangeColor(instrument.change);

  const getChartData = () => {
    switch (range) {
      case '5m':
        return instrument.history.slice(-6); 
      case '1h':
        return instrument.history.slice(-24); 
      case '12h':
        return instrument.history.slice(-144); 
      case '1d':
        return instrument.history; 
      default:
        return instrument.history;
    }
  };

  const chartData = (getChartData() ?? []).map((value) => ({ value }));

  // TOGGLE FAVORITE
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  // TOGGLE WATCHLIST
  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id);
    }
  };



  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
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
          <Text style={[styles.name, { color: colors.text }]}>{instrument.name}</Text>
        </View>
        <Text style={[styles.symbol, { color: colors.textSecondary }]}>{instrument.symbol}</Text>
      </View>

      {/* PRICE */}
      <View style={styles.priceBox}>
        <Text style={[styles.price, { color: colors.text }]}>${instrument.price.toFixed(2)}</Text>
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
              { backgroundColor: colors.card },
              range === r && { backgroundColor: colors.button }
            ]}
          >
            <Text
              style={[
                styles.rangeText,
                { color: colors.text },
                range === r && { color: colors.buttonText }
              ]}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.graphContainer, { backgroundColor: colors.card }]}>
        {hasHistory ? (
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
            yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
            isAnimated
            animationDuration={1200}
          />
        ) : (
          <View style={{ height: 180, justifyContent: "center", alignItems: "center" }}>
            <Icon name="stats-chart-outline" size={40} color={colors.textSecondary} />
            <Text style={{ textAlign: "center", color: colors.textSecondary, marginTop: 10 }}>
              {loadingHistory ? "Searching historical..." : "No graph data available"}
            </Text>
          </View>
        )}
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: isInWatchlist ? "#FF3B30" : colors.button }]} onPress={toggleWatchlist}
        >
          <Text style={[styles.actionText, { color: "#fff" }]}>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Text>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
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
  },
  rangeButtonActive: {
  },
  rangeText: {
    fontWeight: "600",
  },
  rangeTextActive: {
  },

});
