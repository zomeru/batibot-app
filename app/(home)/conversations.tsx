import { Link, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { DefaultButton } from '~components/Button';

export default function ConversationsScreen() {
  const navigation = useNavigation();

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <StatusBar style='light' />
      <Text className='text-primaryText'>Conversation</Text>

      <DefaultButton
        title='Drawer'
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      />

      <Link
        className='mt-10 text-primaryAccent'
        href={{
          pathname: '/[conversation]',
          params: { conversation: 'abc-123' },
        }}
      >
        Go to dynamic conversation
      </Link>
    </View>
  );
}
