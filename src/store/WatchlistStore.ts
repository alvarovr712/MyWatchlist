import { create } from 'zustand';
import type { Instrument } from '../types/Instrument';

interface WatchlistState {
  instruments: Instrument[];
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setInstruments: (data: Instrument[]) => void;
  updatePrices: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  instruments: [],
  favorites: [],

  addFavorite: (id) =>
    set((state) => ({
      favorites: [...state.favorites, id],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
    })),

  setInstruments: (data) => set({ instruments: data }),

  updatePrices: () => {
    const { instruments } = get();

    const updated = instruments.map((item) => {
      const newPrice = item.price + (Math.random() * 2 - 1);
      const newChange = ((newPrice - item.price) / item.price) * 100;

      return {
        ...item,
        price: Number(newPrice.toFixed(2)),
        change: Number(newChange.toFixed(2)),
        history: [...item.history.slice(-20), newPrice],
      };
    });

    set({ instruments: updated });
  },
}));
