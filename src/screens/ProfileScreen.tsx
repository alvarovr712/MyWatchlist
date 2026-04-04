import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../store/AuthStore";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../utils/useTheme";
import { InfoRow } from "../components/InfoRow";

const ProfileScreen = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  if (!currentUser) {
    return (
      <View style={styles.center}>
        <Icon name="person-circle-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Dates not found</Text>
      </View>
    );
  }

  const colors = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
           <View style={[styles.avatar, { backgroundColor: colors.button }]}>
             <Text style={[styles.avatarText, { color: colors.buttonText }]}>
              {currentUser.name[0]}
              {currentUser.surname[0]}
            </Text>
          </View>

          <Text style={[styles.userName, { color: colors.text }]}>
            {currentUser.name} {currentUser.surname}
          </Text>
           <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{currentUser.email}</Text>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={[styles.logoutBtnText, { color: "#fff" }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* INFO */}
        <View style={styles.section}>
           <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Personal dates</Text>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <InfoRow icon="call-outline" label="Phone" value={currentUser.phone} />
            <InfoRow icon="globe-outline" label="Country" value={currentUser.country} />
            <InfoRow  icon="calendar-outline" label="Fecha de registro" value={new Date(currentUser.createdAt).toLocaleDateString()}  isLast 
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    marginTop: 10,
  },

  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
  },

  userEmail: {
    fontSize: 14,
    marginBottom: 15,
  },

  logoutBtn: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 20,
  },

  logoutBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 5,
    textTransform: "uppercase",
  },

  card: {
    borderRadius: 15,
    paddingHorizontal: 15,
  },

 
});
