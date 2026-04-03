import { create } from 'zustand';
import type { Instrument } from '../types/Instrument';

interface WatchlistState {
  instruments: Instrument[];
  setInstruments: (data: Instrument[]) => void;
  updatePrices: () => void;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  instruments: [],
  favorites: [],

  
  setInstruments: (data) => set({ instruments: data }),

  updatePrices: () => {
    const { instruments } = get();

    const updated = instruments.map((item) => {
      const volatility = item.price * 0.05;
      const newPrice = item.price + (Math.random() * volatility * 2 - volatility);
      const newChange = ((newPrice - item.price) / item.price) * 100;

      return {
        ...item,
        price: Number(newPrice.toFixed(2)),
        change: Number(newChange.toFixed(2)),
        history: [...item.history.slice(-80), newPrice],
      };
    });

    set({ instruments: updated });
  },
}));
