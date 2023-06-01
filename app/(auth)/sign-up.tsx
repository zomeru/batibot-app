import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import Toast from 'react-native-toast-message';

import { TextInput } from '../../components/Input';
import { DefaultButton, ProviderButton } from '../../components/Button';
import { supabase } from '../../utils/supabase';

export default function SignUpScreen() {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

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
        <DefaultButton title='Sign up' className='mt-3' onPress={() => {}} />
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

        <ProviderButton provider='Google' className='mb-3' />
        <ProviderButton provider='Discord' className='mb-3' />
        <ProviderButton provider='Github' />
      </View>
    </View>
  );
}
