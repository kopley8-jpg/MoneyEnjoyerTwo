import {
  AuthInitError,
  AuthInitErrorCode,
} from '@/app/providers/authStateListener/authInitErrors';
import { LoadingState } from '@/shared/config';
import { User } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Session = {
  connected: boolean;
  firebaseUser: User | null;
  status:
    | { status: 'ready' | 'idle' | 'loading' }
    | { status: 'error'; code: AuthInitErrorCode };
  setFirebaseUser: (user: User | null) => void;
  setStatus: (status: Session['status']) => void;
  setConnected: (connected: boolean) => void;
};

export const sessionStore = create<Session>()(
  immer(set => ({
    connected: false,
    firebaseUser: null,
    status: { status: 'idle' },
    setFirebaseUser: firebaseUser => {
      set({ firebaseUser });
    },
    setStatus(status) {
      set({ status });
    },
    setConnected(connected) {
      set({ connected });
    },
  })),
);
