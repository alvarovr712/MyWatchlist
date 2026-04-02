import AsyncStorage from "@react-native-async-storage/async-storage";
import { Users } from "../data/User";
import type { User } from "../types/User";


export const validateUser = (email: string, password: string): User | undefined => {
  return Users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );
};


export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const user = validateUser(email, password);
  if (!user) return null;

  await AsyncStorage.setItem("currentUser", JSON.stringify(user));
  await AsyncStorage.setItem("isLoggedIn", "true");

  return user;
};


export const logoutUser = async () => {
  await AsyncStorage.removeItem("currentUser");
  await AsyncStorage.removeItem("isLoggedIn");
};


export const loadUserSession = async (): Promise<User | null> => {
  const logged = await AsyncStorage.getItem("isLoggedIn");
  const savedUser = await AsyncStorage.getItem("currentUser");

  if (logged === "true" && savedUser) {
    return JSON.parse(savedUser);
  }

  return null;
};


export const saveUser = async (user: User) => {
  await AsyncStorage.setItem("currentUser", JSON.stringify(user));
};
