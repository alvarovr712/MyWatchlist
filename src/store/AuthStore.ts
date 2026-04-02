import { create } from "zustand";
import type { User } from "../types/User";
import { loginUser, logoutUser, loadUserSession, saveUser } from "../services/AuthService";

interface AuthState {
  currentUser: User | null;
  favorites: string[];
  watchlist: string[];
  isLoggedIn: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;

  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  addToWatchlist: (id: string) => Promise<void>;
  removeFromWatchlist: (id: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  favorites: [],
  watchlist: [],
  isLoggedIn: false,

  // LOGIN
  login: async (email, password) => {
    const user = await loginUser(email, password);
    if (!user) return false;

    set({
      currentUser: user,
      favorites: user.favorites,
      watchlist: user.watchlist,
      isLoggedIn: true,
    });

    return true;
  },

  // LOGOUT
  logout: async () => {
    await logoutUser();

    set({
      currentUser: null,
      favorites: [],
      watchlist: [],
      isLoggedIn: false,
    });
  },

  // LOAD SESSION
  loadSession: async () => {
    const user = await loadUserSession();
    if (!user) return;

    set({
      currentUser: user,
      favorites: user.favorites,
      watchlist: user.watchlist,
      isLoggedIn: true,
    });
  },

  // FAVORITOS
  addFavorite: async (id) => {
    const { favorites, currentUser } = get();
    if (!currentUser) return;

    const updated = [...favorites, id];
    const updatedUser = { ...currentUser, favorites: updated };

    set({ favorites: updated, currentUser: updatedUser });

    await saveUser(updatedUser);
  },

  removeFavorite: async (id) => {
    const { favorites, currentUser } = get();
    if (!currentUser) return;

    const updated = favorites.filter((fav) => fav !== id);
    const updatedUser = { ...currentUser, favorites: updated };

    set({ favorites: updated, currentUser: updatedUser });

    await saveUser(updatedUser);
  },

  // WATCHLIST
  addToWatchlist: async (id) => {
    const { watchlist, currentUser } = get();
    if (!currentUser) return;

    const updated = [...watchlist, id];
    const updatedUser = { ...currentUser, watchlist: updated };

    set({ watchlist: updated, currentUser: updatedUser });

    await saveUser(updatedUser);
  },

  removeFromWatchlist: async (id) => {
    const { watchlist, currentUser } = get();
    if (!currentUser) return;

    const updated = watchlist.filter((item) => item !== id);
    const updatedUser = { ...currentUser, watchlist: updated };

    set({ watchlist: updated, currentUser: updatedUser });

    await saveUser(updatedUser);
  },
}));
