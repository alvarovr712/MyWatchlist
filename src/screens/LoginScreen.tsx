import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../store/AuthStore";
import Icon from "react-native-vector-icons/Ionicons";

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
  };

  return (
    <View style={styles.container}>

     
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Access your account</Text>

      
      <View style={styles.card}>

        
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {error !== "" && <Text style={styles.error}>{error}</Text>}
      </View>

      
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f2f2f7",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  inputIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },

  button: {
    backgroundColor: "#00C805",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
