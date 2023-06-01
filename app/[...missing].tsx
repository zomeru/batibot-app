import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='flex items-center justify-center flex-1'>
        <Text>This screen doesn't exist.</Text>

        <Link href='/(home)' className=''>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
