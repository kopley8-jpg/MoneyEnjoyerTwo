import { TransformDbCollection } from '@/shared/lib/RTDBTransform/DbCollectionToArray';
import {
  findFolderTreeIssues,
  TreeIssue,
} from '@/shared/tree/model/findFolderTreeIssues';
import { ROOT_ID, TreeNode, TreeNodeDBSchema } from '@/shared/tree/model/types';
import { parent } from '@react-native-firebase/app/dist/module/internal/web/firebaseFirestorePipelines';
import { useState } from 'react';
import z, { object } from 'zod';

export type Folder = TreeNode;

const PartySchema = z.object({
  parentType: z.union([z.literal('folder'), z.literal('chain')]),
  parentId: z.string(),
  name: z.string(),
});

const ChainSchema = z.object({
  folderId: z.string(),
  name: z.string(),
});

export const PartiesDBSchema = z.preprocess(
  v => v ?? {},
  z
    .object({
      folders: TreeNodeDBSchema.default({}),
      chains: z.record(z.string(), ChainSchema).default({}),
      parties: z.record(z.string(), PartySchema).default({}),
    })
    .superRefine((data, ctx) => {
      const hasFolder = (id: string) => id === ROOT_ID || id in data.folders;
      const hasChain = (id: string) => id in data.chains;

      const treeIssues = findFolderTreeIssues(data.folders);
      treeIssues.map(issue => ctx.addIssue({ ...issue, code: 'custom' }));

      Object.entries(data.parties).forEach(([id, party]) => {
        if (
          (party.parentType === 'folder' && !hasFolder(party.parentId)) ||
          (party.parentType === 'chain' && !hasChain(party.parentId))
        ) {
          ctx.addIssue({
            code: 'custom',
            path: ['parties', id, 'parentId'],
            message: `${party.parentType} ${party.parentId} doesn't exist`,
          });
        }
      });

      Object.entries(data.chains).forEach(([id, chain]) => {
        if (!hasFolder(chain.folderId)) {
          ctx.addIssue({
            code: 'custom',
            path: ['chains', id, 'folderId'],
            message: `Folder ${chain.folderId} doesn't exist`,
          });
        }
      });
    }),
);

export type PartiesDb = z.infer<typeof PartiesDBSchema>;

export type Party = z.infer<typeof PartySchema> & { id: string };

export type Chain = z.infer<typeof ChainSchema> & { id: string };

export type PartiesData = {
  folders: Folder[];
  chains: Chain[];
  parties: Party[]; // для списков
  foldersById: Record<string, Folder>;
  chainsById: Record<string, Chain>;
  partiesById: Record<string, Party>; // для поиска по id
};
