import { TransactionDraft } from '@/entities/transaction';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Menu, Text, useTheme } from 'react-native-paper';

export const TransactionType = ({
  value,
  onChange,
}: {
  value: TransactionDraft['type'];
  onChange: (change: {
    key: 'type';
    value: NonNullable<TransactionDraft['type']>;
  }) => void;
}) => {
  const [visible, setVisible] = useState(false);

  const onPick = (value: NonNullable<TransactionDraft['type']>) => {
    onChange({ key: 'type', value });
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TransactionTypeButton value={value} onPress={() => setVisible(true)} />
      }
    >
      <Menu.Item
        title={'Доход'}
        onPress={() => {
          onPick('income');
          setVisible(false);
        }}
      />
      <Menu.Item
        title={'Расход'}
        onPress={() => {
          onPick('expense');
          setVisible(false);
        }}
      />
      <Menu.Item
        title={'Обмен валют'}
        onPress={() => {
          onPick('exchange');
          setVisible(false);
        }}
      />
    </Menu>
  );
};

export const TransactionTypeButton = ({
  value,
  onPress,
}: {
  value: TransactionDraft['type'];
  onPress: () => void;
}) => {
  const { styles, theme } = useStyles();
  const { icon, text } = getButtonConfig(value);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon source={icon} size={24} color={theme.colors.onSecondaryContainer} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const getButtonConfig = (type: TransactionDraft['type']) =>
  type
    ? type === 'expense'
      ? { icon: 'cash-minus', text: 'Расход' }
      : { icon: 'cash-plus', text: 'Доход' }
    : { icon: 'cash', text: 'Тип' };

const useStyles = () => {
  const theme = useTheme();

  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.secondaryContainer,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        gap: 7,
        borderRadius: 4,
      },
      text: {
        ...theme.fonts.titleMedium,
        color: theme.colors.onSecondaryContainer,
      },
    }),
    theme,
  };
};
