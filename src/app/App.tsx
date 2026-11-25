import { GoogleOneTapSignIn } from 'react-native-nitro-google-signin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigator } from './navigation/RootStackNavigator';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { sessionStore } from '@/entities/session/model/sessionStore';
import { LoadingScreen } from '@/screens/Loading/LoadingScreen';
import { initAuthListener } from './providers/authStateListener';
import { registerTranslation, ru } from 'react-native-paper-dates';
import { setPersistenceEnabled } from '@react-native-firebase/database';
import { database } from '@/shared/api/database';
import { initRTDBConnectionListener } from './providers/initRTDBConnectionListener';
import { CriticalErrorScreen } from '@/screens/CriticalError/CriticalErrorScreen';

GoogleOneTapSignIn.configure({ webClientId: 'autoDetect' });
const theme = MD3DarkTheme;
registerTranslation('ru', ru);
setPersistenceEnabled(database, true);

const App = () => {
  initRTDBConnectionListener();
  initAuthListener();
  const { status } = sessionStore(state => state);
  if (status.status === 'idle' || status.status === 'loading') {
    return <LoadingScreen />;
  }
  if (status.status === 'error') {
    return <CriticalErrorScreen />;
  }
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        {!(status.status === 'ready') ? (
          <LoadingScreen />
        ) : (
          <RootStackNavigator />
        )}
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
