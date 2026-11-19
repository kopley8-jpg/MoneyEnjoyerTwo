import { sessionStore } from '@/entities/session/model/sessionStore';
import { MainAuthScreen } from '@/screens/auth/MainAuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTabs } from './HomeTabs/HomeTabs';

const RootStack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  const { firebaseUser } = sessionStore(state => state);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {firebaseUser ? (
          <RootStack.Screen name="Home" component={HomeTabs} />
        ) : (
          <RootStack.Screen name="MainAuth" component={MainAuthScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
