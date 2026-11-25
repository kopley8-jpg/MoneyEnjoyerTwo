import { MainScreen } from '@/screens/Main/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import { CustomButtomTabBar } from './CustomTabBar/CustomTabBar';
import { HistoryScreen } from '@/screens/History/HistoryScreen';
import { SessionPopUpMenu } from '@/widgets/SessionPopUpMenu/ui/SessionPopUpMenu';
import { useBusinessDataSync } from '@/app/hooks/useBusinessDataSync/useBusinessDataSync';
import { LoadingScreen } from '@/screens/Loading/LoadingScreen';
import { CriticalErrorScreen } from '@/screens/CriticalError/CriticalErrorScreen';
import { useScreenOptions } from './useScreenOptions';
import { CreateTransactionButton } from '@/app/modals/CreateTransaction';

const BottomTabNavigator = createBottomTabNavigator();
export const HomeTabs = () => {
  const status = useBusinessDataSync();
  const screenOptions = useScreenOptions();

  if (status.status === 'idle' || status.status === 'loading') {
    return <LoadingScreen />;
  }

  if (status.status === 'error') {
    return <CriticalErrorScreen />;
  }

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        ...screenOptions,
        headerRight: () => (
          <>
            <CreateTransactionButton />
            <SessionPopUpMenu />
          </>
        ),
      }}
      tabBar={props => <CustomButtomTabBar {...props} />}
    >
      <BottomTabNavigator.Screen
        name="Главная"
        component={MainScreen}
        options={{
          tabBarIcon: props => <Icon source={'home'} {...props} />,
        }}
      />
      <BottomTabNavigator.Screen
        name="История"
        component={HistoryScreen}
        options={{
          tabBarIcon: props => <Icon source={'cart'} {...props} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
