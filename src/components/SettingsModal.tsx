import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal, Switch } from "react-native";
import { useThemeStore } from "../store/ThemeStore";
import { useTheme } from "../utils/useTheme";

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isVisible, onClose }: SettingsModalProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const colors = useTheme();

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={[styles.modal, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.button }}
              thumbColor={colors.card}
            />
          </View>

          <TouchableOpacity 
            style={[styles.closeBtn, { backgroundColor: colors.button }]} 
            onPress={onClose}
          >
            <Text style={[styles.closeBtnText, { color: colors.buttonText }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    padding: 24,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  closeBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
