import { create } from 'zustand';
import { Chain, Folder, PartiesData, PartiesDb, Party } from './folder';
import { SubscribeDbError } from '@/shared/api/subscribeDb';

type PartiesStore = {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: SubscribeDbError | null;
  data: PartiesData;
  setLoading: () => void;
  setReady: (data: PartiesData) => void;
  setError: (e: SubscribeDbError) => void;
  reset: () => void;
};

export const usePartiesStore = create<PartiesStore>()(set => ({
  status: 'idle',
  error: null,
  data: {
    folders: [],
    chains: [],
    parties: [],
    foldersById: {},
    chainsById: {},
    partiesById: {},
  },
  setLoading: () => {
    set({ status: 'loading' });
  },
  setReady(data) {
    set({ status: 'ready', error: null, data });
  },
  setError(error) {
    set({ status: 'error', error });
  },
  reset() {
    set({
      status: 'idle',
      error: null,
      data: {
        folders: [],
        chains: [],
        parties: [],
        foldersById: {},
        chainsById: {},
        partiesById: {},
      },
    });
  },
}));
