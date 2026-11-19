import { GoogleOneTapSignIn } from 'react-native-nitro-google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigator } from './navigation/RootStackNavigator';
import { MD3DarkTheme, PaperProvider, ThemeProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { sessionStore } from '@/entities/session/model/sessionStore';
import { LoadingScreen } from '@/screens/Loading/LoadingScreen';
import { initAuthListener } from './providers/initAuthListener';
import { registerTranslation, ru } from 'react-native-paper-dates';

GoogleOneTapSignIn.configure({ webClientId: 'autoDetect' });

const theme = MD3DarkTheme;
registerTranslation('ru', ru);

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
