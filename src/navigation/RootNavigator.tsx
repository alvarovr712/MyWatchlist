import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../store/AuthStore";
import LoginScreen from "../screens/LoginScreen";
import { MainStackNavigator } from "./MainStackNavigator";

const RootNavigator = () => {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const loadSession = useAuthStore((state) => state.loadSession);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () =>{
            await loadSession();
            setLoading(false);
        };

        init();
    }, []);

    if (loading) return null;

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainStackNavigator /> : <LoginScreen />}
        </NavigationContainer>
    )
};

export default RootNavigator;