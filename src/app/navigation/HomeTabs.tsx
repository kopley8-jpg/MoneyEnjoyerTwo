import { MainScreen } from '@/screens/Main/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTabNavigator = createBottomTabNavigator();
export const HomeTabs = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen name="main" component={MainScreen} />
    </BottomTabNavigator.Navigator>
  );
};
