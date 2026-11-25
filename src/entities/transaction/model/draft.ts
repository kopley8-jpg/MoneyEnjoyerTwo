import type { Transaction } from './types';

export type TransactionDraft = {
  [K in keyof Omit<Transaction, 'id'>]: K extends 'positions'
    ? Transaction[K]
    : Transaction[K] | null;
};
export const createEmptyDraft = (
  preset?: Partial<TransactionDraft>,
): TransactionDraft => {
  const draft: TransactionDraft = {
    type: null,
    date: null,
    partyRef: null,
  };

  return { ...draft, ...preset };
};
