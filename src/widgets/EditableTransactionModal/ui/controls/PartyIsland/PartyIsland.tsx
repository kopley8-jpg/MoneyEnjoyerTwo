import { TransactionDraft } from '@/entities/transaction';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon, Text, useTheme } from 'react-native-paper';
import { PartiesData } from '@/entities/party/model/folder';
import { PartyIslandProps } from './model/types';
import { usePartyIslandConfig } from './model/usePartyIslandConfig';

export const PartyIsland = (props: PartyIslandProps) => {
  const { styles, theme } = useStyles();

  const config = usePartyIslandConfig(props);

  return (
    <TouchableOpacity style={styles.container}>
      {config ? (
        <>
          <Icon
            source={config.icon}
            size={24}
            color={theme.colors.onSecondaryContainer}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textContainer}>{config.text}</Text>
            {config.textSecondary && (
              <Text style={styles.textSecondary}>{config.textSecondary}</Text>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator
          animating={true}
          color={theme.colors.onSecondaryContainer}
        />
      )}
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
      },
      textContainer: {
        flexDirection: 'column',
      },
      text: {
        ...theme.fonts.labelLarge,
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
