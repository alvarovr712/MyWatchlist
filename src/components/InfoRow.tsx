import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../utils/useTheme";

type InfoRowProps = {
  icon: string;
  label: string;
  value: string;
  isLast?: boolean;
};

export const InfoRow = ({ icon, label, value, isLast = false }: InfoRowProps) => {
  const colors = useTheme();

  return (
    <View style={[styles.row, !isLast && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
      <Icon name={icon} size={22} color={colors.button} style={styles.rowIcon} />
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  rowIcon: {
    marginRight: 15,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "600",
  },
});
