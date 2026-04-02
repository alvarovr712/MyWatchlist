import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, useWindowDimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Canvas, Circle, LinearGradient, vec } from "@shopify/react-native-skia";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

type TabRouteName = "WatchlistTab" | "Favorites" | "Search";

const icons: Record<TabRouteName, string> = {
  WatchlistTab: "bar-chart-sharp",
  Favorites: "star-sharp",
  Search: "search-sharp",
};

export function CustomTab({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const containerWidth = width > 500 ? 400 : width * 0.92;

  return (
    <View style={[styles.wrapper, { width }]}>
      <View style={[styles.container, { width: containerWidth }]}>

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;

          const routeName = route.name as TabRouteName;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity 
              key={route.key}
              onPress={onPress}
              style={styles.tab}
            >
              <View style={styles.iconCircle}>

                {isFocused && (
                  <View style={StyleSheet.absoluteFill}>
                    <Canvas style={{ flex: 1 }}>
                      <Circle cx={24} cy={24} r={24}>
                        <LinearGradient
                          start={vec(0, 0)}
                          end={vec(0, 48)}
                          colors={["#00E606", "#00A000"]}
                        />
                      </Circle>
                    </Canvas>
                  </View>
                )}

                <Icon
                  name={icons[routeName]}
                  size={22}
                  color={isFocused ? "#fff" : "#666"}
                />
              </View>

              <Text
                style={[
                  styles.labelText,
                  { color: isFocused ? "#00C805" : "#757575" }
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 92,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 46,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 2,
    backgroundColor: "transparent",
  },
  labelText: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
