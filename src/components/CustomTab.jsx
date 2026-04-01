import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function CustomTab({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let iconName = "help";

        if (route.name === "WatchlistTab") iconName = "chart-bar";
        if (route.name === "Favorites") iconName = "magnify";
        if (route.name === "Search") iconName = "account";

        const onPress = () => navigation.navigate(route.name);

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab}>
            <Icon
              name={iconName}
              size={30}
              color={isFocused ? "#ffffff" : "#CFF7DF"}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? "#ffffff" : "#CFF7DF" },
              ]}
            >
              {label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    backgroundColor: "#1FAF5A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 12,
    borderTopWidth: 0,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "600",
  },
});
