import { CriticalErrors } from '@/shared/error/types';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

export const CriticalErrorScreen = ({}: {}) => {
  const { styles, theme } = useStyles();

  return (
    <View style={styles.screen}>
      <Icon source={'alert'} size={135} color={theme.colors.error} />
      <Text style={styles.text}>
        Приложение не может продолжать свою работу
      </Text>
    </View>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return {
    styles: StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: theme.colors.onBackground,
        ...theme.fonts.bodySmall,
      },
    }),
    theme,
  };
};
