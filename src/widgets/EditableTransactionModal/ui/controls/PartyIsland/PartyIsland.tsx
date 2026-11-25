import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon, Text, useTheme } from 'react-native-paper';
import { PartyIslandProps } from './model/types';
import { usePartyIslandConfig } from './model/usePartyIslandConfig';
import { useState } from 'react';
import { PartiesBrowser } from './ui/PartiesBrowser/PartiesBrowser';

export const PartyIsland = (props: PartyIslandProps) => {
  const { styles, theme } = useStyles();

  const config = usePartyIslandConfig(props);
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
      <Icon
        source={config.icon}
        size={24}
        color={theme.colors.onSecondaryContainer}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{config.text}</Text>
        {config.textSecondary && (
          <Text style={styles.textSecondary}>{config.textSecondary}</Text>
        )}
      </View>
      <PartiesBrowser visible={visible} onDismiss={() => setVisible(false)} />
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.secondaryContainer,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 6,
        padding: 10,
      },
      textContainer: {
        flexDirection: 'column',
      },
      text: {
        ...theme.fonts.titleMedium,
        color: theme.colors.onSecondaryContainer,
      },
      textSecondary: {
        ...theme.fonts.bodySmall,
        color: theme.colors.onSurfaceVariant,
      },
    }),
    theme,
  };
};
