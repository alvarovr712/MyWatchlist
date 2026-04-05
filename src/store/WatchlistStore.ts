import { create } from 'zustand';
import type { Instrument } from '../types/Instrument';
import { InstrumentService } from '../services/InstrumentService';

interface WatchlistState {
  instruments: Instrument[];
  setInstruments: (data: Instrument[]) => void;
  updatePrices: () => void;
  fetchInstruments: () => Promise<void>;
  fetchHistory: (id: string) => Promise<void>;
  loading: boolean,
  error: string | null,
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  instruments: [],
  loading: false,
  error: null,


  setInstruments: (data) => set({ instruments: data }),

  fetchInstruments: async () => {
    set({ loading: true, error: null });

    try {
      const data = await InstrumentService.getAll();
      const currentInstruments = get().instruments;

      
      const merged = data.map((newItem) => {
        const existing = currentInstruments.find((i) => i.id === newItem.id);
        return {
          ...newItem,
          history: existing && existing.history.length > 0 ? existing.history : newItem.history,
        };
      });

      set({ instruments: merged, loading: false });
    } catch {
      set({
        error: "The instruments couldn't be loaded",
        loading: false
      });
    }
  },

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

  fetchHistory: async (id: string) => {

    try {

      const history = await InstrumentService.getHistory(id);

      set((state) => ({
        instruments: state.instruments.map((i) => i.id === id ? { ...i, history } : i)
      }));

    } catch (err) {
      console.log('Error fetching history', err);
      set((state) => ({
        instruments: state.instruments.map((i) => i.id === id ? { ...i, history: state.instruments.find(inst => inst.id === id)?.history || [] } : i)
      }));
    }

  }
}));
