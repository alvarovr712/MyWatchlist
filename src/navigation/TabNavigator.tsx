import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { CustomTab } from "../components/CustomTab";
import WatchlistScreen from "../screens/WatchlistScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { SettingsModal } from "../components/SettingsModal";
import { useTheme } from "../utils/useTheme";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const colors = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <CustomTab {...props} />}  
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTitleStyle: {
            fontWeight: "700",
            color: colors.text,
          },
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => setModalVisible(true)}
              style={{ marginRight: 20 }}
            >
              <Icon 
                name="settings-sharp" 
                size={22} 
                color={colors.button}
              />
            </TouchableOpacity>
          ),
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

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
      </Tab.Navigator>

      <SettingsModal 
        isVisible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </>
  );
}
