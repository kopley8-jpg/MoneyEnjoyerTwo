import { TransactionDraft } from '@/entities/transaction';

export type PartyIslandProps = {
  value: TransactionDraft['partyRef'];
  transactionType: TransactionDraft['type'];
  onChange: (change: {
    key: 'partyRef';
    value: TransactionDraft['partyRef'];
  }) => void;
};
