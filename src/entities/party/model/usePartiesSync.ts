import { PartiesDb, PartiesDBSchema } from './folder';
import { useEffect } from 'react';
import { subscribeDb } from '@/shared/api/subscribeDb';
import { usePartiesStore } from './usePartiesStore';
import { dbToApp } from './transform';

export const usePartiesSync = (uid: string | null) => {
  useEffect(() => {
    if (!uid) {
      return;
    }
    const { setLoading, setReady, setError, reset } =
      usePartiesStore.getState();
    setLoading();
    const unsub = subscribeDb<PartiesDb>(
      `users/${uid}/businessData/parties`,
      PartiesDBSchema,
      data => setReady(dbToApp(data)),
      error => setError(error),
    );
    return () => {
      unsub();
      reset();
    };
  }, [uid]);
};
