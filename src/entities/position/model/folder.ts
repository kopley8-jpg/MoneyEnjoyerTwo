import { measurements } from '@/shared/measurements/measurements';
import { TreeNodesDBSchema } from '@/shared/tree/model/types';
import z from 'zod';

const ItemMeasurement = z.object({
  type: z.literal('software'),
  measurements: z.union(measurements.item.map(m => z.literal(m))),
});

const serviceMeasurement = z.object({
  type: z.literal('software'),
  measurements: z.union(measurements.service.map(m => z.literal(m))),
});

const customMeasurement = z.object({
  type: z.literal('custom'),
  id: z.string(),
});

export const positionSchema = z
  .object({
    folderId: z.string(),
    name: z.string(),
  })
  .and(
    z.discriminatedUnion('kind', [
      z.object({
        kind: z.literal('item'),
        measurement: z.discriminatedUnion('type', [
          ItemMeasurement,
          customMeasurement,
        ]),
      }),
      z.object({
        kind: z.literal('service'),
        measurement: z.discriminatedUnion('type', [
          serviceMeasurement,
          customMeasurement,
        ]),
      }),
      z.object({
        kind: z.literal('money-flow'),
      }),
    ]),
  );

const PositionCollectionSchema = z.record(z.string(), positionSchema);

export const PositionsDbSchema = z.preprocess(
  v => v ?? {},
  z.object({
    folders: TreeNodesDBSchema.default({}),
    positions: PositionCollectionSchema.default({}),
  }),
);

export type PositionsDb = z.infer<typeof PositionsDbSchema>;
export type Position = z.infer<typeof positionSchema> & { id: string };
