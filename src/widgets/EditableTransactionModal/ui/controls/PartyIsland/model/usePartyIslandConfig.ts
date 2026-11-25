import { usePartiesStore } from '@/entities/party/model/usePartiesStore';
import { PartyIslandProps } from './types';
import { resolvePartyRef } from './resolvePartyRef';
import { ROOT_ID } from '@/shared/tree/model/types';

export const usePartyIslandConfig = (props: PartyIslandProps) => {
  const { value, transactionType } = props;
  const data = usePartiesStore(state => state.data);
  const party = value ? resolvePartyRef(value, data) : null;

  if (!value || !party) {
    return {
      icon: 'account-plus',
      text: transactionType
        ? 'Добавить ' +
          {
            income: 'отправителя',
            expense: 'получателя',
            exchange: 'сторону',
          }[transactionType]
        : 'Добавить сторону',
      textSecondary: null,
    };
  }

  const resFolder = party.type === 'folder' ? party.item : party.item.folder;
  const folderName = resFolder.id === ROOT_ID ? 'Не указан' : resFolder.name;

  switch (party.type) {
    case 'folder':
      return {
        icon: 'folder',
        text: party.item.name,
        textSecondary: null,
      };
    case 'chain': {
      return {
        icon: 'account-multiple',
        text: party.item.chain.name,
        textSecondary: folderName,
      };
    }
    case 'folder-party':
      return {
        icon: 'account',
        text: party.item.party.name,
        textSecondary: folderName,
      };
    case 'chain-party':
      return {
        icon: 'account',
        text: party.item.chain.name + ' ' + party.item.party.name,
        textSecondary: folderName,
      };
  }
};
