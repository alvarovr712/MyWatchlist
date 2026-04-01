import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { WatchlistNavigator } from "./WatchlistNavigator";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";

import { CustomTab } from "../components/CustomTab";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTab {...props} />}   // 👈 AQUÍ USAMOS TU MENÚ PERSONALIZADO
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="WatchlistTab"
        component={WatchlistNavigator}
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
