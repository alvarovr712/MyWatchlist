import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../store/AuthStore";


const LoginScreen = () => {

    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginUser = async () => {
        const ok = await login(email, password);

        if (!ok) {
            setError("Invalid email or password");
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = "none"
            />
            <TextInput
            style ={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value = {password}
            onChangeText = {setPassword}
            />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={loginUser}>
                <Text style={styles.buttonText}>Log In</Text>

            </TouchableOpacity>


        </View>
    )
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#111",
    },
    title: {
        fontSize: 28,
        color: "white",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#222",
        color: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});
