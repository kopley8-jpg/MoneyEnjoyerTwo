import { database } from '@/shared/api/database';
import {
  push,
  ref,
  serverTimestamp,
  set,
} from '@react-native-firebase/database';

export const createNewUser = async (uid: string, email: string | null) => {
  const userRef = ref(database, `users/${uid}`);
  await set(userRef, {
    profile: {
      name: null,
      email,
      createdAt: serverTimestamp(),
    },
    businessData: {},
  });
};
