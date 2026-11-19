import { getAuth, signOut as signOutFB } from '@react-native-firebase/auth';

export const signOut = () => signOutFB(getAuth());
