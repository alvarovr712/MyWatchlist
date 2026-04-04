import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../store/AuthStore";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../utils/useTheme";
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const colors = useTheme();

  const loginUser = async () => {
    const ok = await login(email, password);

    if (!ok) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: 'Please check your credentials and try again.',
      })
      return;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>



      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Access your account</Text>


      <View style={[styles.card, { backgroundColor: colors.card }]}>


        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.input }]}>
          <Icon name="mail-outline" size={20} color={colors.textSecondary} />

          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>


        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.input }]}>
          <Icon name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {error !== "" && <Text style={styles.error}>{error}</Text>}
      </View>


      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={loginUser}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Log In</Text>
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
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
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
