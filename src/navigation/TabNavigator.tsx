import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";

import { CustomTab } from "../components/CustomTab";
import WatchlistScreen from "../screens/WatchlistScreen";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTab {...props} />}  
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="WatchlistTab"
        component={WatchlistScreen}
        options={{ title: "Watchlist" }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
    </Tab.Navigator>
  );
}
