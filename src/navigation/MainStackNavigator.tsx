import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { SettingsModal } from "../components/SettingsModal";
import { useTheme } from "../utils/useTheme";

export type RootStackParamList = {
    Tabs: undefined;
    Detail: { id: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
    const colors = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tabs"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{
                        title: "Instrument Detail",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: colors.card,
                        },
                        headerTitleStyle: {
                            color: colors.text,
                        },
                        headerTintColor: colors.button,
                        headerRight: () => (
                            <TouchableOpacity 
                                onPress={() => setModalVisible(true)}
                                style={{ marginRight: 10 }}
                            >
                                <Icon 
                                    name="settings-sharp" 
                                    size={22} 
                                    color={colors.button}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack.Navigator>

            <SettingsModal 
                isVisible={modalVisible} 
                onClose={() => setModalVisible(false)} 
            />
        </>
    )
}
