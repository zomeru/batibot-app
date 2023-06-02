import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

import { TextInput } from '~components/Input';
import { DefaultButton, ProviderButton } from '~components/Button';

import { useAuthenticate } from '~hooks/useAuthenticate';
import { oAuthLogin } from '~utils/supabase';

export default function SignInScreen() {
  const [seePassword, setSeePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleSignIn } = useAuthenticate();

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-8 bg-primaryBackground'>
      <StatusBar style='light' />
      <View className='w-full h-auto'>
        <Text className='text-2xl font-bold text-center text-primaryText'>
          Welcome to Batibot!
        </Text>
        <Text className='mb-5 text-sm font-medium text-center text-secondaryText'>
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
          loading={loading}
          disabled={loading}
          title='Log in'
          className='mt-3'
          onPress={async () =>
            await handleSignIn({
              email,
              password,
              setLoading,
            })
          }
        />
        <Text className='my-5 text-sm font-medium text-center text-secondaryText'>
          Don't have an account?{' '}
          <Link className='text-primaryAccent' href='/sign-up'>
            Sign up
          </Link>
        </Text>
        <View className='relative w-full mt-2 mb-8'>
          <View className='w-full h-[1px] bg-tertiaryText' />
          <View className='absolute bg-primaryBackground left-[45%] -top-[10px]'>
            <Text className='px-2 py-[2px] text-tertiaryText'>OR</Text>
          </View>
        </View>

        <ProviderButton
          provider='Google'
          className='mb-3'
          onPress={async () => oAuthLogin('google')}
        />
        <ProviderButton
          onPress={async () => oAuthLogin('discord')}
          provider='Discord'
          className='mb-3'
        />
        <ProviderButton
          onPress={async () => oAuthLogin('github')}
          provider='Github'
        />
      </View>
    </View>
  );
}
