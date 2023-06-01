import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { DefaultButton } from '../../components/Button';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <StatusBar style='light' />
      <Text className='text-primaryText'>SETTINGS</Text>

      <DefaultButton
        title='Drawer'
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      />
    </View>
  );
}
