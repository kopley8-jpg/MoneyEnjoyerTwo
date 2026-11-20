import { SubscribeDbError } from '../api/subscribeDb';

export type CriticalErrors = {
  type: 'subscribeDbError';
  error: SubscribeDbError;
};
