import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { TextInput } from '~components/Input';
import { DefaultButton, ProviderButton } from '~components/Button';
import { supabase, oAuthLogin, handleSupabaseResendOTP } from '~utils/supabase';

export default function SignInScreen() {
  const router = useRouter();

  const [seePassword, setSeePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Email and password are required.',
      });
      return;
    }
    setLoading(true);
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errMsg = error.message.toLowerCase();

      if (errMsg === 'email not confirmed') {
        // If email is not confirmed, resend OTP
        await handleSupabaseResendOTP(email, setLoading);

        router.push({
          pathname: '/verify',
          params: {
            email: email.toLowerCase().trim(),
            message: `Please verify your email address to continue using Batibot.`,
          },
        });

        return;
      }

      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }

    setLoading(false);
  };

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
          onPress={handleLogin}
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
