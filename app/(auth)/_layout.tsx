import { Stack } from 'expo-router/stack';

export default function AuthLayoutNavigator() {
  return (
    <Stack initialRouteName='sign-in'>
      <Stack.Screen
        name='sign-in'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='sign-up'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
