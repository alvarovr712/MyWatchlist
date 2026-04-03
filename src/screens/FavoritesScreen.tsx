import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: "#f2f2f7",
  },
  text: { fontSize: 20 }
});
