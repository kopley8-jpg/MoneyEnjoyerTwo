import { SignInWithGoogleButton } from '@/features/auth/sign-in-with-google/SignInWithGoogleButton';
import { StyleSheet, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

export const MainAuthScreen = () => {
  const { styles, theme } = useStyles();
  return (
    <View style={styles.screen}>
      <View style={styles.top} />
      <View style={styles.center}>
        <Icon source={'cash'} size={160} color={theme.colors.primary} />
      </View>
      <View style={styles.bottom} />
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
      },
      top: {
        flex: 1,
        backgroundColor: 'blue',
      },
      center: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
      },
      bottom: {
        flex: 1,
        backgroundColor: 'yellow',
      },
    }),
    theme,
  };
};
