import type { Instrument } from "../types/Instrument";
import { Alert } from "react-native";

const API_KEY = "CG-PJi9rcxJnf1Rbvsg8eXzbYSz";
const BASE_URL = "https://api.coingecko.com/api/v3";

export const InstrumentService = {
  getAll: async (): Promise<Instrument[]> => {
    const res = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`, {
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    }
    );

    if (!res.ok) {
      console.log("HTTP ERROR:", res.status, res.statusText);
      throw new Error("Failed to fetch instruments");
    }

    const data = await res.json();

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      price: item.current_price ?? 0,
      change: item.price_change_percentage_24h ?? 0,
      history: [],
    }));
  },

  getHistory: async (id: string): Promise<number[]> => {
    const url = `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=1&x_cg_demo_api_key=${API_KEY}`;
    
    try {
      const res = await fetch(url, {
        headers: {
          "x-cg-demo-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        console.warn(`[getHistory] Error fetching history for ${id}: ${res.status}`);
        return [];
      }

      const data = await res.json();
      
      if (!data || !data.prices || data.prices.length === 0) {
        return [];
      }

      return data.prices.map((p: any) => p[1]);
    } catch (err) {
      console.error(`[getHistory] Network error for ${id}:`, err);
      return [];
    }
  },

};
