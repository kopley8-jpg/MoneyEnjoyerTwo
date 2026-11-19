import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, useTheme } from 'react-native-paper';
import { TransactionType } from './controls/TransactionType/TransactionType';
import { TransactionDraft } from '@/entities/transaction';
import { Change } from '@/shared/lib/form/types';
import { TransactionDate } from './controls/TransactionDate/TransactionDate';

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
          <TransactionDate value={value.date} onChange={onChange} />
        </View>
        <View style={styles.content}></View>
      </Modal>
    </Portal>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      backdrop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      container: {
        backgroundColor: theme.colors.onSecondary,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      content: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        gap: 10,
      },
    }),
    theme,
  };
};
