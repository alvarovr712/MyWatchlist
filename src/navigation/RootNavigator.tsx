import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../store/AuthStore";
import { AppNavigator } from "./AppNavigator";
import LoginScreen from "../screens/LoginScreen";

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
            {isLoggedIn ? <AppNavigator /> : <LoginScreen />}
        </NavigationContainer>
    )
};

export default RootNavigator;