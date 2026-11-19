import {
  Chain,
  Folder,
  PartiesData,
  Party,
} from '@/entities/party/model/folder';
import { TransactionDraft } from '@/entities/transaction';

type ResolvedParty =
  | { type: 'folder'; item: Folder }
  | { type: 'chain'; item: Chain }
  | { type: 'party'; item: Party };

export const resolvePartyRef = (
  ref: NonNullable<TransactionDraft['partyRef']>,
  data: PartiesData,
): ResolvedParty | null => {
  switch (ref.type) {
    case 'folder': {
      const item = data.foldersById[ref.id];
      return item ? { type: 'folder', item } : null;
    }
    case 'chain': {
      const item = data.chainsById[ref.id];
      return item ? { type: 'chain', item } : null;
    }
    case 'party': {
      const item = data.partiesById[ref.id];
      return item ? { type: 'party', item } : null;
    }
  }
};
