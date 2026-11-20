import { MainScreen } from '@/screens/Main/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from 'react-native-paper';
import { CustomButtomTabBar } from './CustomTabBar/CustomTabBar';
import { HistoryScreen } from '@/screens/History/HistoryScreen';
import { CreateTransactionButton } from '@/features/create-transaction';
import { SessionPopUpMenu } from '@/widgets/SessionPopUpMenu/ui/SessionPopUpMenu';
import { useBusinessDataSync } from '@/app/hooks/useBusinessDataSync/useBusinessDataSync';
import { LoadingScreen } from '@/screens/Loading/LoadingScreen';
import { CriticalErrorScreen } from '@/screens/CriticalError/CriticalErrorScreen';

const BottomTabNavigator = createBottomTabNavigator();
export const HomeTabs = () => {
  const theme = useTheme();
  const status = useBusinessDataSync();

  if (status.status === 'idle' || status.status === 'loading') {
    return <LoadingScreen />;
  }

  if (status.status === 'error') {
    return <CriticalErrorScreen error={status.error} />;
  }

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerRight: () => (
          <>
            <CreateTransactionButton />
            <SessionPopUpMenu />
          </>
        ),
        headerShadowVisible: false,
        headerTintColor: theme.colors.primary,
        headerTitleStyle: theme.fonts.headlineMedium,
        tabBarIconStyle: { width: 26 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      }}
      tabBar={props => <CustomButtomTabBar {...props} />}
    >
      <BottomTabNavigator.Screen
        name="Главная"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source={'home'} size={size} color={color} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="История"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source={'cart'} size={size} color={color} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
