import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/supabase';
import { DefaultButton } from '../../components/Button';

export default function VerifyEmailScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-10 bg-primaryBackground'>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <StatusBar style='light' />
      <Text className='text-primaryText'>Verify Email</Text>
    </View>
  );
}
