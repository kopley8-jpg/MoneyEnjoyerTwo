import { create } from 'zustand';
import { PositionsDb } from './folder';

type PositionsStore = {
  data: PositionsDb;
  setReady: (data: PositionsDb) => void;
  reset: () => void;
};

export const usePositionsStore = create<PositionsStore>()(set => ({
  data: {
    folders: {},
    positions: {},
  },
  setReady(data) {
    set({ data });
  },
  reset() {
    set({
      data: {
        folders: {},
        positions: {},
      },
    });
  },
}));
