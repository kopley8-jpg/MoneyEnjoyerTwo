import { CriticalErrors } from '../error/types';

export type LoadingState = {
  status: 'loading';
  message: string;
  progress: number;
};
