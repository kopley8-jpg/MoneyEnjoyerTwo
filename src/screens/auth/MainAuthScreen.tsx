import { SignInWithGoogleButton } from '@/features/auth/sign-in-with-google/SignInWithGoogleButton';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

export const MainAuthScreen = () => {
  const { styles, theme } = useStyles();

  return (
    <View style={styles.screen}>
      <View style={styles.logo}>
        <Icon source={'cash'} size={135} color={theme.colors.primary} />
        <Text style={styles.text}>Money Enjoyer</Text>
      </View>
      <SignInWithGoogleButton />
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
      },
      logo: {
        alignItems: 'center',
      },
      text: {
        ...theme.fonts.titleLarge,
        color: theme.colors.primary,
      },
    }),
    theme,
  };
};
