import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

import { TextInput } from '../../components/Input';
import { DefaultButton, ProviderButton } from '../../components/Button';
import { useAuth } from '../../contexts/auth';

export default function SignInScreen() {
  const { signIn } = useAuth();

  const [seePassword, setSeePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View className='h-screen w-screen flex justify-center items-center px-8 bg-primaryBackground'>
      <StatusBar style='light' />
      <View className='w-full h-auto'>
        <Text className='text-center font-bold text-2xl text-primaryText'>
          Welcome to Batibot!
        </Text>
        <Text className='text-center text-secondaryText font-medium text-sm mb-5'>
          Log in to continue to Batibot
        </Text>
        <TextInput
          className='mb-3'
          placeholder='Email'
          value={email}
          setValue={setEmail}
        />
        <TextInput
          placeholder='Password'
          showIcon
          iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeePassword(val => !val)}
          value={password}
          setValue={setPassword}
        />
        <DefaultButton
          title='Log in'
          className='mt-3'
          onPress={() => signIn()}
        />
        <Text className='text-center text-secondaryText font-medium text-sm my-5'>
          Don't have an account?{' '}
          <Link className='text-primaryAccent' href='/sign-up'>
            Sign up
          </Link>
        </Text>
        <View className='w-full mt-2 mb-8 relative'>
          <View className='w-full h-[1px] bg-primaryText' />
          <View className='absolute bg-primaryBackground left-[45%] -top-[10px]'>
            <Text className='px-2 py-[2px] text-primaryText'>OR</Text>
          </View>
        </View>

        <ProviderButton provider='google' className='mb-3' />
        <ProviderButton provider='discord' />
      </View>
    </View>
  );
}
