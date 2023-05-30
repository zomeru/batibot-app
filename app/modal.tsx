import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';

export default function ModalScreen() {
  return (
    <View className='w-screen h-screen flex justify-center items-center bg-primaryBackground'>
      <Text className='text-primaryText'>MODAL</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
