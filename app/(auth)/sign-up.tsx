import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { TextInput } from 'components/Input';
import { DefaultButton, ProviderButton } from 'components/Button';
import { oAuthLogin, supabase } from 'utils/supabase';
import { validateEmail } from 'utils/other';

export default function SignUpScreen() {
  const router = useRouter();

  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const lowerCaseEmail = email.toLowerCase().trim();

    if (!lowerCaseEmail || !password || !confirmPassword) {
      Toast.show({
        type: 'warning',
        text1: 'All fields are required.',
      });
      return;
    }

    if (!validateEmail(lowerCaseEmail)) {
      Toast.show({
        type: 'warning',
        text1: 'Invalid email.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'warning',
        text1: 'Passwords do not match.',
      });
      return;
    }
    setLoading(true);

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      setLoading(false);
      return;
    }

    if (data) {
      const { data: user } = await supabase
        .from('users')
        .select('email')
        .eq('email', lowerCaseEmail)
        .single();

      if (user) {
        Toast.show({
          type: 'error',
          text1: 'Email already exists.',
        });
      } else {
        await supabase.from('users').insert([
          {
            email: lowerCaseEmail,
            uuid: data.user?.id,
          },
        ]);

        router.push({
          pathname: '/verify',
          params: {
            email: data.user?.email,
          },
        });
      }
    }
    setLoading(false);
  };

  return (
    <View className='flex items-center justify-center flex-1 w-screen h-screen px-8 bg-primaryBackground'>
      <StatusBar style='light' />
      <View className='w-full h-auto'>
        <Text className='text-2xl font-bold text-center text-primaryText'>
          Create an Account
        </Text>
        <Text className='mb-5 text-sm font-medium text-center text-secondaryText'>
          Register to continue to Batibot
        </Text>
        <TextInput
          className='mb-3'
          placeholder='Email'
          value={email}
          setValue={setEmail}
        />
        <TextInput
          placeholder='Password'
          className='mb-3'
          showIcon
          iconName={seePassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeePassword(val => !val)}
          value={password}
          setValue={setPassword}
        />
        <TextInput
          placeholder='Confirm Password'
          showIcon
          iconName={seeConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
          onIconPress={() => setSeeConfirmPassword(val => !val)}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <DefaultButton
          loading={loading}
          disabled={loading}
          title='Sign up'
          className='mt-3'
          onPress={handleSignUp}
        />
        <Text className='my-5 text-sm font-medium text-center text-secondaryText'>
          Already have an account?{' '}
          <Link className='text-primaryAccent' href='/sign-in'>
            Sign in
          </Link>
        </Text>
        <View className='relative w-full mt-2 mb-8'>
          <View className='w-full h-[1px] bg-primaryText' />
          <View className='absolute bg-primaryBackground left-[45%] -top-[10px]'>
            <Text className='px-2 py-[2px] text-primaryText'>OR</Text>
          </View>
        </View>

        <ProviderButton
          provider='Google'
          className='mb-3'
          onPress={async () => oAuthLogin('google')}
        />
        <ProviderButton
          provider='Discord'
          className='mb-3'
          onPress={async () => oAuthLogin('discord')}
        />
        <ProviderButton
          provider='Github'
          onPress={async () => oAuthLogin('github')}
        />
      </View>
    </View>
  );
}
