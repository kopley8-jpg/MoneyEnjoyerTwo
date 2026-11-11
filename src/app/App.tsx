import { View } from 'react-native';
import {
  GoogleOneTapSignIn,
  GoogleSignInButton,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from 'react-native-nitro-google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigator } from './navigation/RootStackNavigator';
import { MD3DarkTheme, PaperProvider, ThemeProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { initAuthListener } from '@/entities/session/model/initAuthListener';
import { sessionStore } from '@/entities/session/model/sessionStore';
import { LoadingScreen } from '@/screens/Loading/LoadingScreen';

GoogleOneTapSignIn.configure({ webClientId: 'autoDetect' });

const theme = MD3DarkTheme;

const App = () => {
  useEffect(() => {
    const unsibscribe = initAuthListener();
    return unsibscribe;
  }, []);
  const isAuthInitialized = sessionStore(state => state.isAuthInitialized);
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        {!isAuthInitialized ? <LoadingScreen /> : <RootStackNavigator />}
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
