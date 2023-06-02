import { useNavigation, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { DefaultButton } from '~components/Button';

export default function ConversationScreen() {
  const navigation = useNavigation();
  const searchParams = useLocalSearchParams();

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <StatusBar style='light' />
      <Text className='text-primaryText'>Dynamic Conversation</Text>

      <DefaultButton
        title='Drawer'
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      />
    </View>
  );
}
