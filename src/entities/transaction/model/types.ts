import { zodCurrencyCodes } from '@/shared/config';
import z from 'zod';

const TransactionPositionSchema = z
  .object({
    summ: z.number(),
  })
  .and(
    z.discriminatedUnion('parentType', [
      z.object({
        parentType: z.literal('folder'),
        parentId: z.string(),
      }),
      z.object({
        parentType: z.literal('position'),
        parentId: z.string(),
        quantity: z.number().optional(),
      }),
    ]),
  );

const TransactionPositionListSchema = z.record(
  z.string(),
  TransactionPositionSchema,
);

const TransactionPartyRefSchema = z.object({
  type: z.union([z.literal('folder'), z.literal('chain'), z.literal('party')]),
  id: z.string(),
});

const TransactionSchema = z
  .object({
    date: z.number(),
    partyRef: TransactionPartyRefSchema,
  })
  .and(
    z.discriminatedUnion('type', [
      z.object({
        type: z.union([z.literal('expense'), z.literal('income')]),
        currency: zodCurrencyCodes,
        positions: TransactionPositionListSchema,
        summ: z.number(),
      }),
      z.object({
        type: z.literal('exchange'),
        from: z.object({ currency: zodCurrencyCodes, summ: z.number() }),
        to: z.object({ currency: zodCurrencyCodes, summ: z.number() }),
      }),
    ]),
  );

export const TransactionsDbSchema = z.preprocess(
  v => v ?? {},
  z.record(z.string(), TransactionSchema),
);
export type TransactionsDb = z.infer<typeof TransactionsDbSchema>;

export type TransactionPartyRef = z.infer<typeof TransactionPartyRefSchema>;
export type TransactionPosition = z.infer<typeof TransactionPositionSchema> & {
  id: string;
};
export type Transaction = z.infer<typeof TransactionSchema> & { id: string };
