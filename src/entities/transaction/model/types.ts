import { CurrencyCode } from '@/shared/config/currencies';

export type Transaction = {
  id: string;
  type: 'expense' | 'income' | 'exchange';
  date: number;
  currency: CurrencyCode;
  partyRef: TransactionPartyRef;
  positions: TransactionPosition[];
  summ: number;
};

type TransactionPartyRef = {
  type: 'folder' | 'chain' | 'party';
  id: string;
};

type TransactionPosition = {
  id: string;
  type: 'folder' | 'position';
  positionId: string;
  quantity: number | null;
  summ: number;
};
