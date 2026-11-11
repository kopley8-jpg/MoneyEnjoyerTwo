import { Button } from 'react-native-paper';
import { useSignInWithGoogle } from './model/useSignInWithGoogle';

export const SignInWithGoogleButton = () => {
  const { loading, signIn } = useSignInWithGoogle();
  return (
    <Button icon="google" mode="contained" onPress={signIn} loading={loading}>
      Войти с Google
    </Button>
  );
};
