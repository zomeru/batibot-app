import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className='h-screen w-screen flex justify-center items-center px-10 bg-primaryBackground'>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text className='text-primaryText'>HOME</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text className='text-primaryText'>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
