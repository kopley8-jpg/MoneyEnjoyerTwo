import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, useTheme } from 'react-native-paper';
import { TransactionType } from './controls/TransactionType/TransactionType';
import { TransactionDraft } from '@/entities/transaction';
import { Change } from '@/shared/lib/form/types';
import { TransactionDate } from './controls/TransactionDate/TransactionDate';
import { PartyIsland } from './controls/PartyIsland/PartyIsland';

export type EditableTransactionModalProps = {
  visible: boolean;
  onDismiss: () => void;
  value: TransactionDraft;
  onChange: (change: Change<TransactionDraft>) => void;
};

export const EditableTransactionModal = (
  props: EditableTransactionModalProps,
) => {
  const { value, onChange } = props;
  const { styles, theme } = useStyles();
  return (
    <Portal>
      <Modal
        {...props}
        style={styles.backdrop}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <TransactionType value={value.type} onChange={onChange} />
          <Text style={styles.headerText}>от</Text>
          <TransactionDate value={value.date} onChange={onChange} />
        </View>
        <View style={styles.content}>
          <PartyIsland
            value={value.partyRef}
            transactionType={value.type}
            onChange={onChange}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const useStyles = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  return {
    styles: StyleSheet.create({
      backdrop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      container: {
        backgroundColor: colors.onSecondary,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'stretch',
      },
      header: {
        paddingHorizontal: 10,
        gap: 5,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: colors.onSecondaryContainer,
      },
      headerText: {
        ...fonts.titleMedium,
        color: colors.onSecondaryContainer,
      },
      content: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
        gap: 10,
      },
    }),
    theme,
  };
};
