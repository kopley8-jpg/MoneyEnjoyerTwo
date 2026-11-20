import { PartiesDBSchema } from '@/entities/party/model/folder';
import { PositionsDbSchema } from '@/entities/position/model/folder';
import z from 'zod';

export const businessDataSchema = z.preprocess(
  v => v ?? {},
  z.object({
    parties: PartiesDBSchema,
    positions: PositionsDbSchema,
  }),
);

export type BusinessData = z.infer<typeof businessDataSchema>;
