import { create } from 'zustand';
import { TransactionsDb } from './types';

type TransactionsStore = {
  transactions: TransactionsDb;
  setReady: (data: TransactionsDb) => void;
  reset: () => void;
};

export const usePositionsStore = create<TransactionsStore>()(set => ({
  transactions: {},
  setReady(transactions) {
    set({ transactions });
  },
  reset() {
    set({
      transactions: {},
    });
  },
}));
