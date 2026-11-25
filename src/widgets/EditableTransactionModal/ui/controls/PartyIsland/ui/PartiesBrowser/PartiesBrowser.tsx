import { Chain, Party, usePartiesStore } from '@/entities/party';
import { Folder } from '@/shared/tree/model/types';
import { Browser } from '@/shared/ui/Browser';
import { Modal, Portal } from 'react-native-paper';

export const PartiesBrowser = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const { parties, chains, folders } = usePartiesStore(state => state.data);
  const toBrowserItems = {
    ...mapRecord(withType(parties, 'party'), ([key, value]) => [
      `party:` + key,
      {
        parentId: value.parentType + value.parentId,
        name: value.name,
        item: { ...value, id: key },
      },
    ]),
    ...mapRecord(withType(chains, 'chain'), ([key, value]) => [
      `chain:` + key,
      {
        parentId: 'folder' + value.folderId,
        name: value.name,
        item: { ...value, id: key },
      },
    ]),
    ...mapRecord(withType(folders, 'folder'), ([key, value]) => [
      `folder:` + key,
      {
        parentId: 'folder' + value.parentId,
        name: value.name,
        item: { ...value, id: key },
      },
    ]),
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={{ alignItems: 'center' }}
      >
        <Browser<Folder | Chain | Party>
          data={toBrowserItems}
          rootId="folder:root"
        />
      </Modal>
    </Portal>
  );
};

const withType = <T extends object, Type extends string>(
  data: Record<string, T>,
  type: Type,
): Record<string, T & { type: Type }> => {
  return mapRecord<T, T & { type: Type }>(data, ([key, value]) => [
    key,
    { ...value, type },
  ]);
};

const mapRecord = <Input extends any, Output>(
  data: Record<string, Input>,
  onIterate: (entry: [string, Input], index: number) => [string, Output],
) => {
  return Object.fromEntries(
    Object.entries(data).map((entry, index) => onIterate(entry, index)),
  );
};
