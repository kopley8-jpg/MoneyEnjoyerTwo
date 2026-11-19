import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { database } from '@/shared/api/database';
import { get, ref } from '@react-native-firebase/database';
import { createNewUser } from '@/features/auth/create-new-user/createNewUser';
import { sessionStore } from '@/entities/session/model/sessionStore';

export const initAuthListener = () => {
  return onAuthStateChanged(getAuth(), async user => {
    const { setFirebaseUser, setIsAuthInitialized } = sessionStore.getState();
    if (!user) {
      setFirebaseUser(null);
      setIsAuthInitialized(true);
      return;
    }
    const userExists = await isUserExists(user?.uid);
    if (!userExists) {
      createNewUser(user.uid, user.email);
    }
    setFirebaseUser(user);
    setIsAuthInitialized(true);
  });
};

const isUserExists = async (uid: string): Promise<boolean> => {
  const userRef = ref(database, `users/${uid}`);
  return get(userRef).then(snap => snap.exists());
};
