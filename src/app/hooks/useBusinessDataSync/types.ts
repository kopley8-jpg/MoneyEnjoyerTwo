import { PartiesDBSchema } from '@/entities/party/model/folder';
import { PositionsDbSchema } from '@/entities/position/model/folder';
import { TransactionsDbSchema, Transaction } from '@/entities/transaction';
import {
  TransactionPartyRef,
  TransactionPosition,
} from '@/entities/transaction/model/types';
import { DataValidationIssue } from '@/shared/data-validation/types';
import z from 'zod';

export const businessDataSchema = z
  .preprocess(
    v => v ?? {},
    z.object({
      parties: PartiesDBSchema,
      positions: PositionsDbSchema,
      transactions: TransactionsDbSchema,
    }),
  )
  .superRefine((data, ctx) => {
    findTransactionsIssues(data).forEach(issue => {
      ctx.addIssue({ ...issue, code: 'custom' });
    });
  });

export type BusinessData = z.infer<typeof businessDataSchema>;

const findTransactionsIssues = (data: {
  parties: BusinessData['parties'];
  positions: BusinessData['positions'];
  transactions: BusinessData['transactions'];
}): DataValidationIssue[] => {
  const issues: DataValidationIssue[] = [];

  const hasParty = (partyRef: TransactionPartyRef) => {
    switch (partyRef.type) {
      case 'folder':
        return partyRef.id in data.parties.folders;
      case 'chain':
        return partyRef.id in data.parties.chains;
      case 'party':
        return partyRef.id in data.parties.parties;
    }
  };

  const hasPosition = (position: Omit<TransactionPosition, 'id'>) =>
    position.parentType === 'folder'
      ? position.parentId in data.positions.folders
      : position.parentId in data.positions.positions;

  Object.entries(data.transactions).forEach(([transactionId, value]) => {
    if (!hasParty(value.partyRef)) {
      issues.push({
        path: ['transactions', transactionId, 'partyRef'],
        message: `${value.partyRef.type} ${value.partyRef.id} doesn't exists`,
      });
    }
    if (value.type !== 'exchange') {
      Object.entries(value.positions).forEach(([positionId, value]) => {
        if (!hasPosition(value)) {
          issues.push({
            path: ['transactions', transactionId, 'positions', positionId],
            message: `${value.parentType}: ${value.parentId} doesn't exists`,
          });
        }
      });
    }
  });

  return issues;
};
