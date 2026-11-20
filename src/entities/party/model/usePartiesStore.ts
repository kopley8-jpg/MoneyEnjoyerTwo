import { create } from 'zustand';
import { PartiesDb } from './folder';

type PartiesStore = {
  data: PartiesDb;
  setReady: (data: PartiesDb) => void;
  reset: () => void;
};

export const usePartiesStore = create<PartiesStore>()(set => ({
  data: {
    folders: {},
    chains: {},
    parties: {},
  },
  setReady(data) {
    set({ data });
  },
  reset() {
    set({
      data: {
        folders: {},
        chains: {},
        parties: {},
      },
    });
  },
}));
