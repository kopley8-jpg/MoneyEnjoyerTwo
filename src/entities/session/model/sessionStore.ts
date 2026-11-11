import { User } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type Session = {
  firebaseUser: User | null;
  isAuthInitialized: boolean;
  setFirebaseUser: (user: User | null) => void;
  setIsAuthInitialized: (value: boolean) => void;
};

export const sessionStore = create<Session>()(
  immer(set => ({
    firebaseUser: null,
    isAuthInitialized: false,
    setFirebaseUser: firebaseUser => {
      set({ firebaseUser });
    },
    setIsAuthInitialized(value) {
      set({ isAuthInitialized: value });
    },
  })),
);
