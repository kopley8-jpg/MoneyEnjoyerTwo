import { TransactionDraft } from '@/entities/transaction';
import { formatDayMonth } from '@/shared/lib/formatDayMonth';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

export const TransactionDate = ({
  value,
  onChange,
}: {
  value: TransactionDraft['date'];
  onChange: (change: { key: 'date'; value: TransactionDraft['date'] }) => void;
}) => {
  const { styles, theme } = useStyles();
  const [visible, setVisible] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
      <Icon
        source={'calendar-outline'}
        size={24}
        color={theme.colors.onSecondaryContainer}
      />
      <Text style={styles.text}>{value ? formatDayMonth(value) : 'Дата'}</Text>
      <DatePickerModal
        locale="ru"
        mode="single"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={value ? new Date(value) : undefined}
        onConfirm={d => {
          d.date
            ? onChange({ key: 'date', value: d.date.getTime() })
            : undefined;
          setVisible(false);
        }}
      />
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.secondaryContainer,
        flexDirection: 'row',
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
