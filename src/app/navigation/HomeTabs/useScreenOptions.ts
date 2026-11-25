import { useTheme } from 'react-native-paper';

export const useScreenOptions = () => {
  const theme = useTheme();

  return {
    sceneStyle: {
      backgroundColor: theme.colors.background,
    },
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerShadowVisible: false,
    headerTintColor: theme.colors.primary,
    headerTitleStyle: theme.fonts.headlineMedium,
    tabBarIconStyle: { width: 26 },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
  };
};
