import type { Transaction } from './types';

export type TransactionDraft = {
  [K in keyof Omit<Transaction, 'id'>]: K extends 'positions'
    ? Transaction[K]
    : Transaction[K] | null;
};
export const createEmptyDraft = (): TransactionDraft => {
  //TODO добавить подгрузку последней транзакции для дефолтов

  return {
    type: null,
    currency: null,
    partyRef: null,
    positions: [],
    summ: null,
  };
};
