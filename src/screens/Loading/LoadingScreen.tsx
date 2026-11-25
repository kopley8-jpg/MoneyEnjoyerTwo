import { LoadingState } from '@/shared/config';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const LoadingScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>Загрузка...</Text>
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
