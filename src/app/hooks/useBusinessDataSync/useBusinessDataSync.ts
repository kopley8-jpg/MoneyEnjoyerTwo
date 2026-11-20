import { sessionStore } from '@/entities/session/model/sessionStore';
import { subscribeDb } from '@/shared/api/subscribeDb';
import { useEffect, useState } from 'react';
import { BusinessData, businessDataSchema } from './types';
import { usePartiesStore } from '@/entities/party';
import { usePositionsStore } from '@/entities/position/model/usePositionsStore';
import { CriticalErrors } from '@/shared/error/types';

export const useBusinessDataSync = () => {
  const uid = sessionStore(state => state.firebaseUser?.uid);
  const [status, setStatus] = useState<
    | { status: 'idle' | 'loading' | 'ready' }
    | { status: 'error'; error: CriticalErrors }
  >({ status: 'idle' });
  useEffect(() => {
    const { setReady: setPartiesReady, reset: resetParties } =
      usePartiesStore.getState();
    const { setReady: setPositionsReady, reset: resetPositions } =
      usePositionsStore.getState();
    if (!uid) return;
    setStatus({ status: 'loading' });

    const unsub = subscribeDb<BusinessData>(
      `users/${uid}/businessData`,
      businessDataSchema,
      data => {
        setPartiesReady(data.parties);
        setPositionsReady(data.positions);
        setStatus({ status: 'ready' });
      },
      error => {
        setStatus({
          status: 'error',
          error: { type: 'subscribeDbError', error },
        });
      },
    );
    return () => {
      unsub();
      resetParties();
      resetPositions();
    };
  }, [uid]);

  return status;
};
