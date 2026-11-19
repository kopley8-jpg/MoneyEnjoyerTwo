import { signOut } from '@/features/auth/sign-out';
import { useState } from 'react';
import { Icon, IconButton, Menu, useTheme } from 'react-native-paper';

export const SessionPopUpMenu = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <Menu
      visible={visible}
      anchor={
        <IconButton
          icon={'account-circle'}
          size={30}
          iconColor={theme.colors.onBackground}
          onTouchEnd={() => setVisible(true)}
        />
      }
      onDismiss={() => setVisible(false)}
    >
      <Menu.Item
        leadingIcon={'account-cash'}
        onPress={() => {}}
        title="Аккаунт"
      />
      <Menu.Item leadingIcon={'cog'} onPress={() => {}} title="Настройки" />
      <Menu.Item
        leadingIcon={({ size }) => (
          <Icon source={'location-exit'} size={size} color="#ff1111" />
        )}
        rippleColor={'red'}
        onPress={async () => {
          await signOut();
        }}
        titleStyle={{ color: '#ff1111' }}
        title="Выход"
      />
    </Menu>
  );
};
