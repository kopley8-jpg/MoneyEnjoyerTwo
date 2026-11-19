import { onValue, ref } from '@react-native-firebase/database';
import { database } from './database';
import z from 'zod';

export type SubscribeDbError =
  | {
      cause: 'validation';
      error: z.ZodError;
    }
  | {
      cause: 'firebase';
      error: Error;
    };

export const subscribeDb = <T>(
  path: string,
  schema: z.ZodType<T>,
  onData: (data: T) => void,
  onError: (error: SubscribeDbError) => void,
) => {
  return onValue(
    ref(database, path),
    snapshot => {
      const result = schema.safeParse(snapshot.val());
      if (!result.success) {
        onError({ cause: 'validation', error: result.error });
        return;
      }
      onData(result.data);
    },
    error => {
      onError({ cause: 'firebase', error });
    },
  );
};
