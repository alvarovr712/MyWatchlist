import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";

export type RootStackParamList = {
    Tabs: undefined;
    Detail: { id: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "Tabs"
                component = {TabNavigator}
                options={{ headerShown: false }}
            
            />
            <Stack.Screen
                name = "Detail"
                component = {DetailScreen}
                options = {{ 
                    title: "Instrument Detail",
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    )
}