import { EditableTransactionModal } from '@/widgets/EditableTransactionModal';
import { useState } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { createEmptyDraft, TransactionDraft } from '@/entities/transaction';
import { Change } from '@/shared/lib/form/types';

export const CreateTransactionButton = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [transaction, setTransaction] = useState<TransactionDraft>(
    createEmptyDraft({ type: 'expense', date: Date.now() }),
  );
  //TODO добавить подгрузку последней транзакции для дефолтов

  const onChange = (change: Change<TransactionDraft>) => {
    setTransaction(prev => ({ ...prev, [change.key]: change.value }));
  };

  return (
    <>
      <IconButton
        icon={'plus'}
        size={30}
        iconColor={theme.colors.onBackground}
        onPress={() => setVisible(true)}
      />
      <EditableTransactionModal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        value={transaction}
        onChange={onChange}
      />
    </>
  );
};
