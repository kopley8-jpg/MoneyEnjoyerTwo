import { CriticalErrors } from '@/shared/error/types';
import { StyleSheet, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

export const CriticalErrorScreen = ({
  error,
}: {
  error: CriticalErrors | null;
}) => {
  const { styles, theme } = useStyles();

  return (
    <View style={styles.screen}>
      <Icon source={'alert'} size={135} color={theme.colors.error} />
    </View>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return {
    styles: StyleSheet.create({
      screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
    }),
    theme,
  };
};
