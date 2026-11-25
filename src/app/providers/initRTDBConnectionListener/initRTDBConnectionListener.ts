import { sessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/database';
import { onValue, ref } from '@react-native-firebase/database';
import { useEffect } from 'react';

export const initRTDBConnectionListener = () => {
  const connectionRef = ref(database, '.info/connected');
  const { setConnected } = sessionStore.getState();
  useEffect(() => {
    const unsub = onValue(connectionRef, snap => {
      console.log('[FirebaseConnection]', snap.val());
      setConnected(snap.val() === true);
    });
    return unsub;
  }, []);
};
