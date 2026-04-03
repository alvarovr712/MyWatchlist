import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../store/AuthStore";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  if (!currentUser) {
    return (
      <View style={styles.center}>
        <Icon name="person-circle-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>No has iniciado sesión</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser.name[0]}
              {currentUser.surname[0]}
            </Text>
          </View>

          <Text style={styles.userName}>
            {currentUser.name} {currentUser.surname}
          </Text>
          <Text style={styles.userEmail}>{currentUser.email}</Text>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* INFO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos personales</Text>

          <View style={styles.card}>
            <InfoRow icon="call-outline" label="Teléfono" value={currentUser.phone} />
            <InfoRow icon="globe-outline" label="País" value={currentUser.country} />
            <InfoRow 
              icon="calendar-outline" 
              label="Fecha de registro" 
              value={new Date(currentUser.createdAt).toLocaleDateString()} 
              isLast 
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};



type InfoRowProps = {
  icon: string;
  label: string;
  value: string;
  isLast?: boolean;
};

const InfoRow = ({ icon, label, value, isLast = false }: InfoRowProps) => (
  <View style={[styles.row, !isLast && styles.rowSeparator]}>
    <Icon name={icon} size={22} color="#00C805" style={styles.rowIcon} />
    <View style={styles.rowContent}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
);

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },

  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#00C805",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },

  userEmail: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },

  logoutBtn: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 20,
  },

  logoutBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginBottom: 10,
    marginLeft: 5,
    textTransform: "uppercase",
  },

  card: {
    backgroundColor: "#f9f9fb",
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  rowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#edeef2",
  },

  rowIcon: {
    marginRight: 15,
  },

  rowContent: {
    flex: 1,
  },

  rowLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },

  rowValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },
});
