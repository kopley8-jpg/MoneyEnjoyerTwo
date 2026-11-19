import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const HistoryScreen = () => {
  const styles = useStyles();

  return <View style={styles.container}></View>;
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
