import { IconButton, useTheme } from 'react-native-paper';
import { BrowserProps } from './types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const Browser = <Item extends any>({
  data,
  rootId,
}: BrowserProps<Item>) => {
  const [currentId, setCurrentId] = useState(rootId);
  const { styles, theme } = useStyles();
  const path = buildFoldersPath(data, rootId, currentId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={'close'}
          size={24}
          iconColor={theme.colors.onSecondaryContainer}
        />
        <View style={styles.headerRightContainer}>
          <IconButton
            style={{ margin: 0 }}
            icon={'magnify'}
            size={24}
            iconColor={theme.colors.onSecondaryContainer}
          />
          <IconButton
            style={{ margin: 0 }}
            icon={'dots-vertical'}
            size={24}
            iconColor={theme.colors.onSecondaryContainer}
          />
        </View>
      </View>
    </View>
  );
};

const buildFoldersPath = (
  data: Record<string, { parentId: string; name: string }>,
  rootId: string,
  id: string,
): { id: string; name: string }[] => {
  const { parentId, name } = data[id]!;
  if (parentId === rootId) return [{ id, name }];
  return [...buildFoldersPath(data, rootId, parentId), { id, name }];
};

const useStyles = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  return {
    styles: StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        minWidth: 225,
        minHeight: 230,
        paddingTop: 6,
        paddingBottom: 12,
        gap: 6,
        borderRadius: 15,
        backgroundColor: colors.onSecondary,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7,
      },
      headerRightContainer: {
        flexDirection: 'row',
      },
    }),
    theme,
  };
};
