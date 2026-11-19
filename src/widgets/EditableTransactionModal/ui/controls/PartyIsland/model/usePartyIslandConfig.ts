import { usePartiesStore } from '@/entities/party/model/usePartiesStore';
import { PartyIslandProps } from './types';
import { resolvePartyRef } from './resolvePartyRef';
import { TransactionDraft } from '@/entities/transaction';
import { ROOT_ID } from '@/shared/tree/model/types';

export const usePartyIslandConfig = (props: PartyIslandProps) => {
  const { value, transactionType } = props;
  const data = usePartiesStore(state => state.data);
  const party = value ? resolvePartyRef(value, data) : null;

  if (!value) {
    return {
      icon: 'account-plus',
      text: transactionType
        ? 'Добавить ' + transactionTypeToText[transactionType]
        : 'Добавить сторону',
      textSecondary: null,
    };
  }

  if (!party) {
    return null;
  }

  switch (party.type) {
    case 'folder':
      return { icon: 'folder', text: party.item.name, textSecondary: null };
    case 'chain':
      const { folderId, name } = party.item;
      const folder = folderId === ROOT_ID ? 'root' : data.foldersById[folderId];
      return folder
        ? {
            icon: 'account-multiple',
            text: name,
            textSecondary: folder === 'root' ? null : folder.name,
          }
        : null;
    case 'party':
      switch (party.item.parentType) {
        case 'chain': {
          const chain = data.chainsById[party.item.parentId];
          const folder = chain
            ? chain.folderId === ROOT_ID
              ? 'root'
              : data.foldersById[chain.folderId]
            : null;
          return chain && folder
            ? {
                icon: 'account',
                text: chain.name + ' ' + party.item.name,
                textSecondary: folder === 'root' ? null : folder.name,
              }
            : null;
        }
        case 'folder':
          const folder =
            party.item.parentId === ROOT_ID
              ? 'root'
              : data.foldersById[party.item.parentId];
          return folder
            ? {
                icon: 'account',
                text: party.item.name,
                textSecondary: folder === 'root' ? null : folder.name,
              }
            : null;
      }
  }
};

const transactionTypeToText: Record<
  NonNullable<TransactionDraft['type']>,
  string
> = {
  income: 'отправителя',
  expense: 'получателя',
  exchange: 'сторону',
};
