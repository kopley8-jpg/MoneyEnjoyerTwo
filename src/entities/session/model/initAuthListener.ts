import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { sessionStore } from './sessionStore';
import { database } from '@/shared/api/database';
import { get, ref } from '@react-native-firebase/database';
import { createNewUser } from '@/features/auth/create-new-user/сreateNewUser';

export const initAuthListener = () => {
  return onAuthStateChanged(getAuth(), async user => {
    const { setFirebaseUser, setIsAuthInitialized } = sessionStore.getState();
    setIsAuthInitialized(true);
    if (!user) {
      setFirebaseUser(null);
      return;
    }
    const userExists = await isUserExists(user?.uid);
    if (!userExists) {
      createNewUser(user.uid, user.email);
    }
    setFirebaseUser(user);
  });
};

const isUserExists = async (uid: string): Promise<boolean> => {
  const userRef = ref(database, `users/${uid}`);
  return get(userRef).then(snap => snap.exists());
};
