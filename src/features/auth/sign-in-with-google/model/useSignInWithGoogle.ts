import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { useState } from 'react';
import {
  GoogleOneTapSignIn,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from 'react-native-nitro-google-signin';

export const useSignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    signIn: async () => {
      try {
        setLoading(true);
        await GoogleOneTapSignIn.checkPlayServices();

        let response = await GoogleOneTapSignIn.signIn();

        if (isNoSavedCredentialFoundResponse(response)) {
          response = await GoogleOneTapSignIn.createAccount();
        }
        if (isNoSavedCredentialFoundResponse(response)) {
          response = await GoogleOneTapSignIn.presentExplicitSignIn();
        }
        if (!isSuccessResponse(response)) {
          return;
        }

        const credential = GoogleAuthProvider.credential(response.data.idToken);
        signInWithCredential(getAuth(), credential);
      } finally {
        setLoading(false);
      }
    },
  };
};
