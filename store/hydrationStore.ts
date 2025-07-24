import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HydrationEntry {
  id: string;
  amount: number;
  timestamp: number;
  date: string; // YYYY-MM-DD format
}

export interface HydrationState {
  entries: HydrationEntry[];
  dailyGoal: number;
  language: 'en' | 'hi';
  
  // Actions
  addEntry: (amount: number) => void;
  setDailyGoal: (goal: number) => void;
  setLanguage: (language: 'en' | 'hi') => void;
  getTodayTotal: () => number;
  getDateTotal: (date: string) => number;
  getMonthlyData: () => { date: string; amount: number }[];
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
}

const STORAGE_KEY = 'hydration_data';

export const useHydrationStore = create<HydrationState>((set, get) => ({
  entries: [],
  dailyGoal: 2000, // 2 liters default
  language: 'en',

  addEntry: (amount: number) => {
    const now = new Date();
    const entry: HydrationEntry = {
      id: `${now.getTime()}-${Math.random()}`,
      amount,
      timestamp: now.getTime(),
      date: now.toISOString().split('T')[0],
    };

    set((state) => ({
      entries: [...state.entries, entry],
    }));

    // Auto-save after adding entry
    get().saveData();
  },

  setDailyGoal: (goal: number) => {
    set({ dailyGoal: goal });
    get().saveData();
  },

  setLanguage: (language: 'en' | 'hi') => {
    set({ language });
    get().saveData();
  },

  getTodayTotal: () => {
    const today = new Date().toISOString().split('T')[0];
    return get().getDateTotal(today);
  },

  getDateTotal: (date: string) => {
    const { entries } = get();
    return entries
      .filter((entry) => entry.date === date)
      .reduce((total, entry) => total + entry.amount, 0);
  },

  getMonthlyData: () => {
    const { entries } = get();
    const monthlyData: { [date: string]: number } = {};

    // Get last 30 days
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      monthlyData[dateStr] = 0;
    }

    // Fill with actual data
    entries.forEach((entry) => {
      if (monthlyData.hasOwnProperty(entry.date)) {
        monthlyData[entry.date] += entry.amount;
      }
    });

    return Object.entries(monthlyData).map(([date, amount]) => ({
      date,
      amount,
    }));
  },

  loadData: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        set({
          entries: parsed.entries || [],
          dailyGoal: parsed.dailyGoal || 2000,
          language: parsed.language || 'en',
        });
      }
    } catch (error) {
      console.error('Failed to load hydration data:', error);
    }
  },

  saveData: async () => {
    try {
      const { entries, dailyGoal, language } = get();
      const data = {
        entries,
        dailyGoal,
        language,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save hydration data:', error);
    }
  },
}));