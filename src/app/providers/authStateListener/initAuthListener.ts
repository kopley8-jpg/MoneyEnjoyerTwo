import { getAuth, onAuthStateChanged, User } from '@react-native-firebase/auth';
import { database } from '@/shared/api/database';
import {
  DataSnapshot,
  get,
  onValue,
  ref,
} from '@react-native-firebase/database';
import { createNewUser } from '@/features/auth/create-new-user/createNewUser';
import { sessionStore } from '@/entities/session/model/sessionStore';
import { AuthInitError, AuthInitErrorCode } from './authInitErrors';
import { useEffect } from 'react';
import { once } from '@react-native-firebase/app/dist/module/common';

export const initAuthListener = () => {
  useEffect(() => {
    const unsub = AuthListener();
    return unsub;
  }, []);
};

export const AuthListener = () => {
  const { setFirebaseUser, setStatus } = sessionStore.getState();
  return onAuthStateChanged(
    getAuth(),
    async user => {
      console.log('[AuthInit] State changed');
      console.log(user);
      setStatus({
        status: 'loading',
      });
      if (!user) {
        setFirebaseUser(null);
        setStatus({ status: 'ready' });
        return;
      }
      try {
        console.log('[AuthInit] Checking user in RTDB');
        const userExists = await runAuthInitStep(
          'CHECK_USER_EXISTENCE',
          'Failed to check user',
          () => isUserExists(user?.uid),
        );
        if (!userExists) {
          console.log('[AuthInit] user not found in RTDB creating it');
          runAuthInitStep('CREATE_USER', 'Failed to create user', () =>
            createNewUser(user.uid, user.email),
          );
        }
        setFirebaseUser(user);
        setStatus({ status: 'ready' });
        console.log('[AuthInit] auth successful');
      } catch (error) {
        if (error instanceof AuthInitError) {
          console.error('[AuthInit]', error);
          setStatus({ status: 'error', code: error.code });
        } else {
          console.error('[AuthInit] unknown error', error);
          setStatus({ status: 'error', code: 'UNKNOWN' });
        }
      }
    },
    error => {
      console.error('[AuthInit] Listener error:', error);
      setStatus({
        status: 'error',
        code: 'AUTH_LISTENER',
      });
    },
  );
};

const isUserExists = (uid: string) =>
  getWithTimeout(`users/${uid}`).then(snap => snap.exists());

const getWithTimeout = (path: string) =>
  new Promise<DataSnapshot>((resolve, reject) => {
    const timer = setTimeout(() => {
      unsub();
      reject('Client is offline');
    }, 3000);
    const unsub = onValue(
      ref(database, path),
      snap => {
        clearTimeout(timer);
        unsub();
        resolve(snap);
      },
      err => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });

const runAuthInitStep = async <T>(
  code: AuthInitErrorCode,
  label: string,
  action: () => Promise<T>,
): Promise<T> => {
  try {
    return await action();
  } catch (error) {
    console.error(`[AuthInit] ${label}:`, error);
    throw new AuthInitError(code);
  }
};
