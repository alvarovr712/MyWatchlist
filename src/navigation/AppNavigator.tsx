import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WatchlistScreen from "../screens/WatchlistScreen";
import DetailScreen from "../screens/DetailScreen";

export type RootStackParamList = {
    Watchlist: undefined;
    Detail: {id:string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = "Watchlist"
                    component = {WatchlistScreen}
                    options = {{title: 'My Watchlist'}}
                    />
                <Stack.Screen
                    name = "Detail"
                    component={DetailScreen}
                    options = {{title: 'Instrument Detail'}}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    )
}