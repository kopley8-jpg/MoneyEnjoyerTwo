import { getAuth, signOut } from '@react-native-firebase/auth';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export const MainScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={async () => {
          await signOut(getAuth());
        }}
      >
        sign-out
      </Button>
    </View>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
