import { Chain, PartiesData, Party } from '@/entities/party/model/folder';
import { TransactionDraft } from '@/entities/transaction';
import { Folder } from '@/shared/tree/model/types';

type ResolvedParty =
  | { type: 'folder'; item: Folder }
  | { type: 'chain'; item: { chain: Chain; folder: Folder } }
  | {
      type: 'chain-party';
      item: { folder: Folder; chain: Chain; party: Party };
    }
  | { type: 'folder-party'; item: { folder: Folder; party: Party } };

export const resolvePartyRef = (
  ref: NonNullable<TransactionDraft['partyRef']>,
  data: PartiesData,
): ResolvedParty | null => {
  switch (ref.type) {
    case 'folder': {
      const item = data.folders[ref.id];
      return item ? { type: 'folder', item: { ...item, id: ref.id } } : null;
    }
    case 'chain': {
      const chain = data.chains[ref.id];
      const folder = chain ? data.folders[chain.folderId] : null;
      return chain && folder
        ? {
            type: 'chain',
            item: {
              chain: { ...chain, id: ref.id },
              folder: { ...folder, id: chain.folderId },
            },
          }
        : null;
    }
    case 'party': {
      const party = data.parties[ref.id];
      if (!party) return null;
      if (party.parentType === 'chain') {
        const chain = data.chains[party.parentId];
        const folder = chain ? data.folders[chain.folderId] : null;
        return chain && folder
          ? {
              type: 'chain-party',
              item: {
                party: { ...party, id: ref.id },
                chain: { ...chain, id: party.parentId },
                folder: { ...folder, id: chain.folderId },
              },
            }
          : null;
      } else {
        const folder = data.folders[party.parentId];
        return folder
          ? {
              type: 'folder-party',
              item: {
                party: { ...party, id: ref.id },
                folder: { ...folder, id: party.parentId },
              },
            }
          : null;
      }
    }
  }
};
