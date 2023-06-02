import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { DefaultButton } from '~components/Button';
import { supabase } from '~utils/supabase';
import JumpingDots from '~components/JumpingDots';
import Toast from 'react-native-toast-message';
export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleDeleteMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .eq('user', 'zomerzxc.19@gmail.com');
  };

  const handleDeleteConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .delete()
      .eq('user', 'zomerzxc.19@gmail.com');
  };

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <StatusBar style='light' />
      <Text className='text-primaryText'>SETTINGS</Text>

      <DefaultButton
        title='Delete messages'
        onPress={() => {
          Toast.show({
            type: 'home-success',
            text1: 'asdasdasdasd',
          });
        }}
      />

      <DefaultButton
        title='Delete conversations'
        onPress={handleDeleteConversations}
      />
      <JumpingDots />
    </View>
  );
}
